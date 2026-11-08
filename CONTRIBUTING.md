# Cómo contribuir

Este repositorio mantiene los tokens y las specs de Nexora Fit. Trabaja en ramas cortas contra `main`, con cambios enfocados, y explica en el PR el porqué de cada decisión de diseño.

## Dónde va cada cambio

- **Aquí:** tokens (`tokens.json`), reglas visuales y de UX (`docs/`), specs (`components/`), vistas previas (`visor/`) y, más adelante, contratos de pantalla.
- **En [nexora-fit](https://github.com/AlexPoveda2/nexora-fit):** los componentes React, la lógica de negocio, la API y la composición de cada pantalla.

Un cambio aquí no migra nexora-fit. El PR dice qué tendrá que adoptar nexora-fit (sincronizar tokens, ajustar un componente) siguiendo [docs/ADOPCION.md](docs/ADOPCION.md).

## Cambiar tokens

1. Edita `tokens.json`. Cada token tiene `name`, `value` y `usage`; los colores semánticos tienen `light` y `dark`, y referencian la paleta con `{nombre}` o usan un hex en minúsculas. `source: "nexora"` se emite en nexora-fit; `source: "tailwind"` documenta un valor por defecto de Tailwind.
2. Si agregas un color semántico que debe cumplir contraste, agrega su combinación a `color.contrast`.
3. `npm run tokens` regenera `tokens.css`, `targets/nexora-fit/globals.tokens.css`, `visor/tokens.css` y `visor/tokens.js`. Nunca los edites a mano.
4. `npm run sync -- ../nexora-fit` muestra qué cambiará en `globals.css`.

## Agregar o cambiar un componente

1. Spec en `components/<Nombre>/README.md`: título `# <Nombre>`, una línea de qué es, `- **Estado:** Draft|Build|Shipped · \`nexora-fit/src/...tsx\` · [vista previa](../../visor/c/<Nombre>.html)`, props/variantes, estados, reglas de uso y una línea `- **No:**`. Viñetas cortas, como las existentes.
2. Vista previa en `visor/c/<Nombre>.html` con `<meta name="nx-group" content="Componentes · <Grupo>">`, que cargue `../tokens.css`, `../componentes.css` y `../componentes.js`. Estilos en `visor/componentes.css` (clases `nx-*`) usando solo variables de los tokens; íconos con `<i data-icon="…">` (el mapa está en `visor/componentes.js`).
3. Agrégalo una sola vez al `catalog` de `visor/index.html`, al índice de [README.md](README.md) (y su conteo) y a [docs/COMPONENTES.md](docs/COMPONENTES.md). Si es Draft, también a la lista `drafts`.
4. Muestra todos los estados que la spec exige: normal, hover, foco, deshabilitado, cargando, error, vacío, en los dos temas.

## Verificar antes de pedir revisión

1. `npm run verify` (sin instalar nada; también corre en cada PR, `.github/workflows/ci-pr.yaml`). Corre todos los pasos aunque uno falle:
   - **lint:** sintaxis de los scripts, del JavaScript del visor y de sus `<script>`; JSON válido.
   - **tokens:** forma de `tokens.json` (nombres, hex, referencias, temas, fuentes y licencias), contraste mínimo de `color.contrast` y archivos generados al día.
   - **catálogo:** catálogo del visor, páginas, `nx-group`, specs (título, estado, vista previa, regla «No»), lista `drafts`, índice y conteo de README.md y docs/COMPONENTES.md coinciden; los íconos usados existen.
   - **enlaces:** enlaces relativos y anclas de Markdown, archivos locales del visor y ningún recurso de internet en el visor.
2. `git diff --check`.
3. Abre `visor/index.html` y revisa lo que cambiaste en **Claro** y **Oscuro**, a **360 px** y en **Escritorio**, con teclado. Mira la consola del navegador. Una revisión estática no prueba accesibilidad.
4. Adjunta capturas al PR.

Commits Conventional en español (`feat(tokens): …`, `docs(ux): …`, `fix(visor): …`). Nada de secretos, dependencias ni estado de herramientas locales en el repositorio.
