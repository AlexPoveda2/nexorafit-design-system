#!/usr/bin/env node
// Puerta de calidad del design system (local: `npm run verify`; CI: .github/workflows/ci-pr.yaml).
// Node puro, sin dependencias. Corre todos los pasos aunque uno falle y al final resume:
//   lint     sintaxis de los scripts y del JavaScript del visor; JSON válido
//   tokens   forma de tokens.json, contraste mínimo y archivos generados al día (npm run tokens)
//   catálogo visor ↔ páginas ↔ specs ↔ README ↔ COMPONENTES: cada componente tiene spec y vista previa
//   enlaces  enlaces relativos de Markdown (con anclas) y del visor; el visor no pide nada a internet
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative, extname } from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
import { ROOT, GENERATED, readTokens, resolveColor, contrast } from './tokens.mjs';

const read = (p) => readFileSync(join(ROOT, p), 'utf8').replace(/\r\n/g, '\n');
const list = (p) => readdirSync(join(ROOT, p));
const isDir = (p) => statSync(join(ROOT, p)).isDirectory();
const SKIP = new Set(['.git', 'node_modules']);
function walk(dir = '') {
  return list(dir || '.').flatMap((f) => {
    if (SKIP.has(f)) return [];
    const p = dir ? `${dir}/${f}` : f;
    return isDir(p) ? walk(p) : [p];
  });
}
const files = walk();
const scriptsIn = (html) => [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
function arrayFrom(html, name) {
  const start = html.indexOf(`var ${name}=[`);
  if (start < 0) throw new Error(`visor/index.html: no se encontró \`var ${name}=[\``);
  const from = start + `var ${name}=`.length;
  let depth = 0, i = from;
  for (; i < html.length; i++) { if (html[i] === '[') depth++; else if (html[i] === ']' && --depth === 0) break; }
  return vm.runInNewContext('(' + html.slice(from, i + 1) + ')');
}

// ── lint ─────────────────────────────────────────────────────────────────
function lint() {
  const errors = [];
  for (const f of files.filter((x) => /\.(m?js)$/.test(x))) {
    const r = spawnSync(process.execPath, ['--check', join(ROOT, f)], { encoding: 'utf8' });
    if (r.status !== 0) errors.push(`${f}: ${(r.stderr.split('\n').find((l) => /Error/.test(l)) || r.stderr).trim()}`);
  }
  for (const f of files.filter((x) => x.endsWith('.html'))) {
    scriptsIn(read(f)).forEach((code, i) => { try { new vm.Script(code, { filename: f }); } catch (e) { errors.push(`${f} <script #${i + 1}>: ${e.message}`); } });
  }
  for (const f of files.filter((x) => x.endsWith('.json'))) { try { JSON.parse(read(f)); } catch (e) { errors.push(`${f}: ${e.message}`); } }
  return errors;
}

// ── tokens ───────────────────────────────────────────────────────────────
function tokens() {
  const errors = [];
  let json;
  try { json = readTokens(); } catch (e) { return [`tokens.json: ${e.message}`]; }
  const err = (m) => errors.push(`tokens.json: ${m}`);
  const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/, HEX = /^#[0-9a-f]{6}$/, SOURCES = ['nexora', 'tailwind'];
  for (const k of ['name', 'version', 'palette', 'color', 'type', 'radius', 'spacing', 'breakpoints', 'shadow', 'motion', 'size', 'zIndex']) {
    if (json[k] === undefined) err(`falta la clave "${k}"`);
  }
  if (errors.length) return errors;
  // Secciones de tokens con nombre, valor y uso; nombres únicos.
  for (const k of ['palette', 'color', 'radius', 'spacing', 'breakpoints', 'shadow', 'motion', 'size', 'zIndex']) {
    const sec = json[k];
    if (!SOURCES.includes(sec.source)) err(`${k}.source debe ser ${SOURCES.join(' o ')}`);
    if (!Array.isArray(sec.tokens) || !sec.tokens.length) { err(`${k}.tokens debe ser una lista no vacía`); continue; }
    const seen = new Set();
    for (const t of sec.tokens) {
      const id = `${k}.${t.name}`;
      if (typeof t.name !== 'string' || !KEBAB.test(t.name)) err(`${id}: nombre inválido (kebab-case)`);
      if (seen.has(t.name)) err(`${id}: nombre repetido`);
      seen.add(t.name);
      if (t.value === undefined || t.value === '') err(`${id}: sin valor`);
      if (typeof t.usage !== 'string' || !t.usage.trim()) err(`${id}: sin "usage"`);
      if (t.source !== undefined && !SOURCES.includes(t.source)) err(`${id}: source inválido`);
    }
  }
  for (const t of json.palette.tokens) if (!HEX.test(t.value)) err(`palette.${t.name}: "${t.value}" no es un hex de 6 dígitos en minúsculas`);
  // Color semántico: dos temas y referencias que existen.
  const themes = (json.color.themes || []).map((t) => t.id).join(',');
  if (themes !== 'light,dark') err(`color.themes debe ser [light, dark] (es [${themes}])`);
  if (json.color.default !== 'light') err('color.default debe ser "light" (el tema de :root)');
  const palette = new Set(json.palette.tokens.map((t) => t.name));
  for (const t of json.color.tokens) {
    if (!t.group) err(`color.${t.name}: sin "group"`);
    for (const th of ['light', 'dark']) {
      const v = t.value?.[th], ref = /^\{([\w-]+)\}$/.exec(v ?? '');
      if (ref ? !palette.has(ref[1]) : !HEX.test(v ?? '')) err(`color.${t.name}.${th}: "${v}" no es {paleta} ni hex`);
    }
  }
  const semantic = new Set(json.color.tokens.map((t) => t.name));
  for (const req of ['background', 'foreground', 'primary', 'primary-foreground', 'border', 'input', 'ring', 'cta', 'cta-foreground', 'price', 'danger']) {
    if (!semantic.has(req)) err(`color: falta el token semántico "${req}"`);
  }
  // Contraste mínimo de las combinaciones declaradas.
  for (const c of json.color.contrast || []) {
    try {
      const th = c.theme || 'light', r = contrast(resolveColor(json, c.fg, th), resolveColor(json, c.bg, th));
      if (r + 1e-9 < c.min) err(`contraste ${c.fg} sobre ${c.bg} (${th}): ${r.toFixed(2)}:1 < ${c.min}:1`);
    } catch (e) { err(`contraste ${c.fg} / ${c.bg}: ${e.message}`); }
  }
  // Tipografía.
  const fams = json.type.families || [];
  const famNames = new Set(fams.map((f) => f.name));
  for (const req of ['display', 'sans', 'mono']) if (!famNames.has(req)) err(`type.families: falta "${req}"`);
  for (const f of fams) {
    if (!f.stack) err(`type.families.${f.name}: sin "stack"`);
    if (f.nextFont && !/^--font-[a-z-]+$/.test(f.nextFont)) err(`type.families.${f.name}: nextFont "${f.nextFont}" inválido`);
  }
  for (const f of json.type.fonts || []) {
    if (!existsSync(join(ROOT, f.file))) { err(`fuente ${f.file} no existe`); continue; }
    if (readFileSync(join(ROOT, f.file)).subarray(0, 4).toString('latin1') !== 'wOF2') err(`${f.file} no es woff2`);
    if (!f.license || !existsSync(join(ROOT, f.license))) err(`fuente ${f.file}: falta la licencia (${f.license})`);
  }
  const scaleSeen = new Set();
  for (const t of json.type.scale || []) {
    if (scaleSeen.has(t.name)) err(`type.scale.${t.name}: repetido`);
    scaleSeen.add(t.name);
    for (const k of ['size', 'lineHeight', 'usage', 'range']) if (!t[k]) err(`type.scale.${t.name}: sin "${k}"`);
    if (!famNames.has(t.family)) err(`type.scale.${t.name}: familia "${t.family}" desconocida`);
    if (!SOURCES.includes(t.source)) err(`type.scale.${t.name}: source inválido`);
  }
  if (!json.radius.base) err('radius.base vacío');
  // Archivos generados.
  for (const [file, render] of Object.entries(GENERATED)) {
    if (!existsSync(join(ROOT, file))) errors.push(`${file} no existe: corre \`npm run tokens\``);
    else if (read(file) !== render(json)) errors.push(`${file} no coincide con tokens.json: corre \`npm run tokens\``);
  }
  return errors;
}

// ── catálogo ─────────────────────────────────────────────────────────────
function catalogo() {
  const errors = [];
  const index = read('visor/index.html');
  const catalog = arrayFrom(index, 'catalog'), drafts = arrayFrom(index, 'drafts');
  const expected = new Map();
  for (const s of catalog) for (const g of s.groups) for (const item of g.items) {
    if (expected.has(item)) errors.push(`catálogo: "${item}" aparece dos veces`);
    expected.set(item, { section: s.section, group: `${s.section} · ${g.title}` });
  }
  const pages = list('visor/c').filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5));
  for (const p of pages) if (!expected.has(p)) errors.push(`visor/c/${p}.html no está en el catálogo de visor/index.html`);
  const components = [...expected].filter(([, v]) => v.section === 'Componentes').map(([k]) => k);
  const fundamentos = [...expected].filter(([, v]) => v.section === 'Fundamentos').map(([k]) => k);
  const icons = new Set([...read('visor/componentes.js').matchAll(/^\s+'([a-z0-9-]+)': '</gm)].map((m) => m[1]));
  const fundamentoKeys = new Set([...read('visor/fundamentos.js').matchAll(/^ {4}([a-z]+): function/gm)].map((m) => m[1]));
  for (const [name, { group }] of expected) {
    const f = `visor/c/${name}.html`;
    if (!existsSync(join(ROOT, f))) { errors.push(`catálogo: "${name}" no tiene ${f}`); continue; }
    const html = read(f);
    const meta = (html.match(/<meta name="nx-group" content="([^"]+)">/) || [])[1];
    if (meta !== group) errors.push(`${f}: nx-group "${meta}" ≠ catálogo "${group}"`);
    for (const dep of ['../tokens.css', '../componentes.css', '../componentes.js']) if (!html.includes(`"${dep}"`)) errors.push(`${f}: no carga ${dep}`);
    for (const m of html.matchAll(/data-icon="([^"]+)"/g)) if (!icons.has(m[1])) errors.push(`${f}: ícono "${m[1]}" no está en visor/componentes.js`);
    const key = (html.match(/data-fundamento="([^"]+)"/) || [])[1];
    if (key && !fundamentoKeys.has(key)) errors.push(`${f}: data-fundamento "${key}" no existe en visor/fundamentos.js`);
    if (fundamentos.includes(name) && !key) errors.push(`${f}: página de fundamentos sin data-fundamento`);
  }
  // Specs: una por componente del visor, y nada más.
  const folders = list('components').filter((d) => isDir(`components/${d}`));
  for (const c of components) if (!folders.includes(c)) errors.push(`"${c}" está en el visor pero no tiene components/${c}/README.md`);
  for (const d of folders) {
    if (!components.includes(d)) errors.push(`components/${d}/ no está en la sección Componentes del visor`);
    const f = `components/${d}/README.md`;
    if (!existsSync(join(ROOT, f))) { errors.push(`components/${d}/ no tiene README.md`); continue; }
    const md = read(f);
    if (md.split('\n')[0] !== `# ${d}`) errors.push(`${f}: la primera línea debe ser "# ${d}"`);
    const estado = /^- \*\*Estado:\*\* (Draft|Build|Shipped)\b(.*)$/m.exec(md);
    if (!estado) errors.push(`${f}: falta "- **Estado:** Draft|Build|Shipped"`);
    else {
      if (estado[1] !== 'Draft' && !/`nexora-fit\/src\/[^`]+\.tsx`/.test(estado[2])) errors.push(`${f}: un componente ${estado[1]} indica su archivo en nexora-fit`);
      if (!estado[2].includes(`(../../visor/c/${d}.html)`)) errors.push(`${f}: la línea de estado enlaza la vista previa ../../visor/c/${d}.html`);
      if ((estado[1] === 'Draft') !== drafts.includes(d)) errors.push(`${f}: estado ${estado[1]} no coincide con la lista drafts de visor/index.html`);
    }
    if (!/^- \*\*No:\*\*/m.test(md)) errors.push(`${f}: falta la regla "- **No:**"`);
  }
  for (const d of drafts) if (!components.includes(d)) errors.push(`drafts: "${d}" no está en el catálogo`);
  // Índices de README.md y docs/COMPONENTES.md, y el conteo.
  const readme = read('README.md'), comp = read('docs/COMPONENTES.md');
  for (const d of folders) {
    if (!readme.includes(`(components/${d}/README.md)`)) errors.push(`README.md: falta ${d} en el índice`);
    if (!comp.includes(`(../components/${d}/README.md)`)) errors.push(`docs/COMPONENTES.md: falta ${d}`);
  }
  for (const m of readme.matchAll(/\*\*(\d+) especificaciones de componentes\*\*/g)) {
    if (Number(m[1]) !== folders.length) errors.push(`README.md dice ${m[1]} especificaciones; hay ${folders.length}`);
  }
  return errors;
}

// ── enlaces ──────────────────────────────────────────────────────────────
const slug = (h) => h.trim().toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
const anchorsCache = new Map();
function anchors(file) {
  if (!anchorsCache.has(file)) {
    const seen = new Map(), out = new Set();
    let fence = false;
    for (const line of read(file).split('\n')) {
      if (/^```/.test(line)) fence = !fence;
      const m = !fence && /^#{1,6}\s+(.*)$/.exec(line);
      if (!m) continue;
      const base = slug(m[1].replace(/`/g, '')), n = seen.get(base) || 0;
      seen.set(base, n + 1);
      out.add(n ? `${base}-${n}` : base);
    }
    anchorsCache.set(file, out);
  }
  return anchorsCache.get(file);
}
function enlaces() {
  const errors = [];
  for (const f of files.filter((x) => x.endsWith('.md'))) {
    const text = read(f).replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
    for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const raw = m[1];
      if (/^[a-z]+:/i.test(raw)) continue;
      const [path, hash] = raw.split('#');
      const target = path ? relative(ROOT, join(ROOT, dirname(f), decodeURI(path))) : f;
      if (path && !existsSync(join(ROOT, target))) { errors.push(`${f}: enlace roto ${raw}`); continue; }
      if (hash && target.endsWith('.md') && !anchors(target).has(decodeURIComponent(hash))) errors.push(`${f}: ancla rota ${raw}`);
    }
  }
  // Visor: archivos locales que existen y ningún recurso de internet (debe abrir sin conexión).
  for (const f of files.filter((x) => x.startsWith('visor/') && ['.html', '.css', '.js'].includes(extname(x)))) {
    const text = read(f);
    for (const m of text.matchAll(/(?:src|href)=["']([^"']+)["']|url\(["']?([^"')]+)["']?\)|@import\s+["']([^"']+)["']/g)) {
      const raw = m[1] || m[2] || m[3];
      if (/^(data:|#|javascript:)/.test(raw) || raw.includes('"+') || raw.includes("'+")) continue;
      if (/^([a-z]+:)?\/\//i.test(raw)) { errors.push(`${f}: recurso externo ${raw} (el visor debe funcionar sin internet)`); continue; }
      const path = raw.split(/[?#]/)[0];
      if (path && !existsSync(join(ROOT, dirname(f), path))) errors.push(`${f}: archivo local inexistente ${raw}`);
    }
  }
  return errors;
}

const GREEN = '\x1b[32m', RED = '\x1b[31m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';
const results = [];
for (const [name, run] of [['lint', lint], ['tokens', tokens], ['catálogo', catalogo], ['enlaces', enlaces]]) {
  console.log(`\n${BOLD}▶ ${name}${RESET}`);
  const t = Date.now();
  let errors;
  try { errors = run(); } catch (e) { errors = [`${name} falló: ${e.message}`]; }
  errors.forEach((e) => console.log(`  ${RED}✗${RESET} ${e}`));
  if (!errors.length) console.log(`  ${GREEN}✓${RESET} ok`);
  results.push({ name, ok: !errors.length, ms: Date.now() - t });
}
console.log(`\n${BOLD}── resumen ──${RESET}`);
for (const r of results) console.log(`${r.ok ? GREEN + '✓' : RED + '✗'}${RESET} ${r.name.padEnd(9)} ${r.ok ? GREEN + 'ok' : RED + 'falló'}${RESET} ${DIM}(${(r.ms / 1000).toFixed(1)} s)${RESET}`);
const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `\n${RED}${BOLD}${failed.length} de ${results.length} pasos fallaron: ${failed.map((r) => r.name).join(', ')}${RESET}\n` : `\n${GREEN}${BOLD}Los ${results.length} pasos pasaron.${RESET}\n`);
process.exit(failed.length ? 1 : 0);
