#!/usr/bin/env node
// Genera, desde tokens.json (la única fuente), estos archivos. No se editan a mano:
//   tokens.css                              variables CSS de referencia (todos los tokens) + @font-face
//   targets/nexora-fit/globals.tokens.css   el bloque @theme / :root / .dark / @theme inline de nexora-fit
//   visor/tokens.css                        tokens.css con las fuentes embebidas (el visor abre desde disco)
//   visor/tokens.js                         window.NX_TOKENS para las páginas de fundamentos del visor
// Uso: `npm run tokens`. `npm run verify` falla si alguno no coincide con tokens.json.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const BEGIN = '/* <nexorafit-design-system:tokens> Generado desde tokens.json de nexorafit-design-system (scripts/tokens.mjs). No editar aquí: se cambia allá y se sincroniza (docs/ADOPCION.md). */';
export const END = '/* </nexorafit-design-system:tokens> */';

export const GENERATED = {
  'tokens.css': (json) => renderTokensCss(json, (f) => `url("${f.file}")`),
  'targets/nexora-fit/globals.tokens.css': (json) => renderNexoraFit(json),
  'visor/tokens.css': (json) => renderTokensCss(json, (f) =>
    `url("data:font/woff2;base64,${readFileSync(join(ROOT, f.file)).toString('base64')}")`),
  'visor/tokens.js': (json) => renderTokensJs(json),
};

const own = (section, t) => (t.source ?? section.source) === 'nexora';

// "{negro}" -> var(--color-negro) en CSS; un hex se queda igual.
const cssValue = (v) => String(v).replace(/^\{([\w-]+)\}$/, 'var(--color-$1)');

// Resuelve un valor de color a hex: "{negro}" (paleta), "foreground" (semántico, según tema) o "#hex".
export function resolveColor(json, value, theme = 'light') {
  const v = String(value);
  if (v.startsWith('#')) return v.toLowerCase();
  const ref = /^\{([\w-]+)\}$/.exec(v);
  if (ref) {
    const p = json.palette.tokens.find((t) => t.name === ref[1]);
    if (!p) throw new Error(`referencia a la paleta desconocida: ${v}`);
    return p.value.toLowerCase();
  }
  const s = json.color.tokens.find((t) => t.name === v);
  if (!s) throw new Error(`token de color desconocido: ${v}`);
  return resolveColor(json, s.value[theme], theme);
}

// Contraste WCAG 2.x entre dos colores hex.
export function contrast(a, b) {
  const lum = (hex) => {
    const n = hex.replace('#', '');
    const [r, g, bl] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// Bloque exacto de src/app/globals.css de nexora-fit (Tailwind v4). Solo emite los tokens con
// source "nexora"; los valores por defecto de Tailwind ya existen allá.
export function renderNexoraFit(json) {
  const fam = json.type.families;
  const scale = json.type.scale.filter((t) => (t.source ?? 'nexora') === 'nexora');
  const L = [BEGIN, '/* 1. Paleta de marca: solo la usan los tokens semánticos y casos puntuales documentados */', '@theme {'];
  for (const t of json.palette.tokens) L.push(`  --color-${t.name}: ${t.value};`);
  const statics = fam.filter((f) => !f.nextFont);
  if (statics.length) { L.push(''); for (const f of statics) L.push(`  --font-${f.name}: ${f.stack};`); }
  if (scale.length) L.push('');
  for (const t of scale) L.push(`  --text-${t.name}: ${t.size};`, `  --text-${t.name}--line-height: ${t.lineHeight};`);
  L.push('}', '', '/* 2. Tokens semánticos: tema claro */', ':root {', `  --radius: ${json.radius.base};`);
  for (const t of json.color.tokens) L.push(`  --${t.name}: ${cssValue(t.value.light)};`);
  L.push('}', '', '/* 3. Tema oscuro: se activa con class="dark" en <section>, en el layout del alumno o en la barra */', '.dark {');
  for (const t of json.color.tokens) if (t.value.dark !== t.value.light) L.push(`  --${t.name}: ${cssValue(t.value.dark)};`);
  L.push('}', '', '/* 4. Utilidades de Tailwind a partir de los tokens (bg-cta, text-price, text-muted-foreground…) */', '@theme inline {');
  for (const f of fam.filter((x) => x.nextFont)) L.push(`  --font-${f.name}: var(${f.nextFont});`);
  L.push('');
  for (const t of json.color.tokens) L.push(`  --color-${t.name}: var(--${t.name});`);
  L.push('');
  for (const t of json.radius.tokens.filter((x) => own(json.radius, x))) L.push(`  --radius-${t.name}: ${t.value};`);
  L.push('}', END);
  return L.join('\n') + '\n';
}

// Variables CSS de referencia: todos los tokens (también los de Tailwind) para usarlos sin Tailwind,
// como hace el visor. El tema oscuro usa la misma clase que nexora-fit: .dark.
export function renderTokensCss(json, fontSrc) {
  const c = (s) => (s ? ` /* ${s.replace(/\*\//g, '*\\/')} */` : '');
  const L = [
    '/* Nexora Fit · tokens generados desde tokens.json (scripts/tokens.mjs). No editar: `npm run tokens`. */',
    '/* El tema claro va en :root; class="dark" en cualquier contenedor activa el oscuro, igual que en nexora-fit. */',
  ];
  for (const f of json.type.fonts) {
    L.push('@font-face {', `  font-family: "${f.family}";`, `  src: ${fontSrc(f)} format("woff2");`,
      `  font-weight: ${f.weight};`, `  font-style: ${f.style};`, '  font-display: swap;', '}');
  }
  L.push(':root {', '  /* Paleta de marca */');
  for (const t of json.palette.tokens) L.push(`  --color-${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Tipografía */');
  for (const f of json.type.families) L.push(`  --font-${f.name}: ${f.stack};`);
  for (const t of json.type.scale) L.push(`  --text-${t.name}: ${t.size};${c(t.range)}`, `  --text-${t.name}--line-height: ${t.lineHeight};`);
  L.push('  /* Radios */', `  --radius: ${json.radius.base};`);
  for (const t of json.radius.tokens) L.push(`  --radius-${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Espaciado (escala de Tailwind, múltiplos de 4 px) */', `  --spacing: ${json.spacing.unit};`);
  for (const t of json.spacing.tokens) L.push(`  --space-${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Breakpoints */');
  for (const t of json.breakpoints.tokens) L.push(`  --breakpoint-${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Sombras */');
  for (const t of json.shadow.tokens) L.push(`  --shadow-${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Movimiento */');
  for (const t of json.motion.tokens) L.push(`  --${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Tamaños */');
  for (const t of json.size.tokens) L.push(`  --size-${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Capas */');
  for (const t of json.zIndex.tokens) L.push(`  --z-${t.name}: ${t.value};${c(t.usage)}`);
  L.push('  /* Tokens semánticos: tema claro */');
  for (const t of json.color.tokens) L.push(`  --${t.name}: ${cssValue(t.value.light)};${c(t.usage)}`);
  L.push('}', '.dark {');
  for (const t of json.color.tokens) if (t.value.dark !== t.value.light) L.push(`  --${t.name}: ${cssValue(t.value.dark)};`);
  L.push('}');
  return L.join('\n') + '\n';
}

export function renderTokensJs(json) {
  return '// Generado desde tokens.json (scripts/tokens.mjs). No editar: `npm run tokens`.\n' +
    `window.NX_TOKENS = ${JSON.stringify(json, null, 2)};\n`;
}

export const readTokens = () => JSON.parse(readFileSync(join(ROOT, 'tokens.json'), 'utf8'));

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const json = readTokens();
  for (const [file, render] of Object.entries(GENERATED)) {
    mkdirSync(dirname(join(ROOT, file)), { recursive: true });
    writeFileSync(join(ROOT, file), render(json));
    console.log(`${file} generado desde tokens.json`);
  }
}
