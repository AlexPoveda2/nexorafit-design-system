#!/usr/bin/env node
// Lleva los tokens a nexora-fit: compara o reemplaza el bloque de tokens de src/app/globals.css con
// targets/nexora-fit/globals.tokens.css (generado desde tokens.json por scripts/tokens.mjs).
//
//   npm run sync -- <ruta a nexora-fit>            comprueba (no escribe); sale con 1 si difiere
//   npm run sync -- <ruta a nexora-fit> --write    reemplaza el bloque en globals.css
//
// El bloque va entre los marcadores <nexorafit-design-system:tokens>. Antes de la primera adopción
// globals.css no los tiene: el bloque es lo que va desde "/* 1. Paleta de marca" hasta el cierre de
// "@theme inline { … }", y --write lo reemplaza agregando los marcadores (docs/ADOPCION.md).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { BEGIN, END, ROOT, renderNexoraFit, readTokens } from './tokens.mjs';

const args = process.argv.slice(2);
const write = args.includes('--write');
const target = args.find((a) => !a.startsWith('--'));
if (!target) {
  console.error('uso: npm run sync -- <ruta a nexora-fit> [--write]');
  process.exit(2);
}
const file = join(resolve(target), 'src/app/globals.css');
if (!existsSync(file)) { console.error(`no existe ${file}`); process.exit(2); }

const generated = renderNexoraFit(readTokens());
const committed = readFileSync(join(ROOT, 'targets/nexora-fit/globals.tokens.css'), 'utf8');
if (generated !== committed) {
  console.error('targets/nexora-fit/globals.tokens.css no coincide con tokens.json: corre `npm run tokens` primero');
  process.exit(1);
}

const css = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const lines = css.split('\n');
let from = lines.indexOf(BEGIN), to = -1, marked = from >= 0;
if (marked) {
  to = lines.indexOf(END, from);
} else {
  from = lines.findIndex((l) => l.startsWith('/* 1. Paleta de marca'));
  const inline = lines.findIndex((l, i) => i > from && l.startsWith('@theme inline {'));
  if (from >= 0 && inline >= 0) to = lines.findIndex((l, i) => i > inline && l === '}');
}
if (from < 0 || to < 0) {
  console.error(`${file}: no se encontró el bloque de tokens (marcadores o "/* 1. Paleta de marca" … "@theme inline { … }")`);
  process.exit(1);
}

const current = lines.slice(from, to + 1).join('\n') + '\n';
const body = (s) => s.split('\n').filter((l) => l !== BEGIN && l !== END).join('\n');
const sameValues = body(current) === body(generated);
const identical = current === generated;

if (!write) {
  if (identical) console.log(`✓ ${file}: el bloque de tokens coincide con tokens.json`);
  else if (sameValues) console.log(`✓ ${file}: mismos tokens; faltan los marcadores (se agregan con --write en la primera adopción)`);
  else {
    console.log(`✗ ${file}: el bloque de tokens difiere de tokens.json. Diferencias (- nexora-fit, + tokens.json):`);
    const a = body(current).split('\n'), b = body(generated).split('\n');
    for (const l of a) if (!b.includes(l)) console.log(`  - ${l}`);
    for (const l of b) if (!a.includes(l)) console.log(`  + ${l}`);
  }
  process.exit(sameValues ? 0 : 1);
}

const next = [...lines.slice(0, from), ...generated.replace(/\n$/, '').split('\n'), ...lines.slice(to + 1)].join('\n');
writeFileSync(file, next);
console.log(identical ? `= ${file}: sin cambios` : `✓ ${file}: bloque de tokens ${marked ? 'actualizado' : 'reemplazado y marcado'}${sameValues ? ' (mismos valores)' : ''}`);
