# Nexora Fit · Design system

**El lenguaje visual de Nexora Fit en un solo lugar:** los tokens, las reglas de diseño y experiencia, una spec por componente y un visor que se abre sin instalar nada.

[Visor](#empieza-por-el-visor) · [Dirección visual](docs/VISUAL.md) · [Reglas de UX](docs/UX.md) · [Componentes](docs/COMPONENTES.md) · [Adopción en nexora-fit](docs/ADOPCION.md)

Sirve al sitio público, el checkout, el área del alumno y el panel de admin de [nexora-fit](https://github.com/AlexPoveda2/nexora-fit). Negro de base, blanco de respiro y rojo solo para lo que vende.

**23 especificaciones de componentes. Tema claro y oscuro. Un solo `tokens.json`.**

## Empieza por el visor

Clona el repositorio y abre **[`visor/index.html`](visor/index.html)** en el navegador. Sin instalar, sin servidor y sin internet: las fuentes y los tokens van dentro de `visor/`.

```sh
git clone git@github.com:AlexPoveda2/nexorafit-design-system.git
cd nexorafit-design-system
# Abre visor/index.html en el navegador.
```

- **Fundamentos:** colores (con la tabla de contraste calculada), tipografía, espaciado, radios, sombras y movimiento, pintados desde `tokens.json`.
- **Componentes:** los que ya existen en `nexora-fit/src/shared/ui/`, con sus variantes y estados.
- **Claro / Oscuro** cambia el tema (la clase `dark`, como en nexora-fit). **Escritorio / 768 px / 360 px** fija el ancho de la vista previa: el diseño se revisa en 360, 768 y 1280 px.
- Enlace directo: `visor/index.html?tema=dark&ancho=360#Button`. Cada vista previa acepta `?tema=dark` por su cuenta.

GitHub muestra el HTML como código; el visor funciona desde tu copia local.

## El ADN

| El rojo vende | Mobile-first | Tokens, nunca valores sueltos |
| :--- | :--- | :--- |
| Rojo solo en comprar, precios y la sección del pack. Uno por bloque visible. | Todo se diseña a 360 px; objetivos de 44 px y campos a 16 px. | Si falta un valor, se agrega a `tokens.json`; nunca `text-[#E10600]`. |

La [dirección visual](docs/VISUAL.md) define el aspecto. Las [reglas de UX](docs/UX.md) definen el comportamiento. Los [contratos de componentes](docs/COMPONENTES.md) unen las dos.

## De la referencia al producto

| Aquí: el design system | [nexora-fit](https://github.com/AlexPoveda2/nexora-fit): la implementación |
| :--- | :--- |
| `tokens.json` (único juego de tokens), specs, reglas y visor. | Componentes React en `src/shared/ui/` (shadcn/ui + Tailwind v4) y en cada feature. |
| Se discute un patrón y se ven sus estados. | Se implementa, se prueba y se publica. |
| Genera el bloque de tokens de `globals.css`. | Lo sincroniza con `npm run sync` desde aquí; no edita tokens a mano. |

No hay paquete npm: las vistas previas son HTML y CSS plano que reproducen las clases de nexora-fit con los tokens. Una vista previa no prueba que el componente de producción cumpla la spec. Lee la [guía de adopción](docs/ADOPCION.md) antes de cambiar nexora-fit.

## Comandos

Node 24 y npm. Sin dependencias.

```sh
npm run tokens                         # genera tokens.css, el bloque de nexora-fit y los tokens del visor
npm run verify                         # lint, tokens (forma, contraste, generados), catálogo y enlaces
npm run sync -- ../nexora-fit          # compara el bloque de tokens de nexora-fit con tokens.json
npm run sync -- ../nexora-fit --write  # lo reemplaza
```

## Qué hay dentro

```text
tokens.json         Única fuente de los tokens (color por tema, tipografía, radios, espacio, movimiento…)
tokens.css          Variables CSS de referencia, generadas
targets/nexora-fit/ Bloque @theme / :root / .dark / @theme inline para src/app/globals.css, generado
components/         Una spec por componente (README.md)
docs/               VISUAL, UX, COMPONENTES y ADOPCION
visor/              Visor sin conexión: index.html, vistas previas en c/, estilos y tokens embebidos
fonts/              Bebas Neue e Inter (OFL), solo para el visor
scripts/            tokens.mjs, sync-tokens.mjs y verify.mjs (Node puro)
```

[CONTRIBUTING.md](CONTRIBUTING.md) explica cómo editar y verificar. Los contratos de pantalla (`docs/ui-contracts/`) son el siguiente paso.

## Componentes

<details>
<summary><strong>Las 23 especificaciones, con su vista previa</strong></summary>

Cada vista previa acepta `?tema=dark`.

- [Accordion](components/Accordion/README.md) · [vista previa](visor/c/Accordion.html)
- [AlertDialog](components/AlertDialog/README.md) · [vista previa](visor/c/AlertDialog.html)
- [Badge](components/Badge/README.md) · [vista previa](visor/c/Badge.html)
- [Button](components/Button/README.md) · [vista previa](visor/c/Button.html)
- [Card](components/Card/README.md) · [vista previa](visor/c/Card.html)
- [Checkbox](components/Checkbox/README.md) · [vista previa](visor/c/Checkbox.html)
- [Dialog](components/Dialog/README.md) · [vista previa](visor/c/Dialog.html)
- [EmptyState](components/EmptyState/README.md) · [vista previa](visor/c/EmptyState.html)
- [ErrorState](components/ErrorState/README.md) · [vista previa](visor/c/ErrorState.html)
- [Footer](components/Footer/README.md) · [vista previa](visor/c/Footer.html)
- [Header](components/Header/README.md) · [vista previa](visor/c/Header.html)
- [Input](components/Input/README.md) · [vista previa](visor/c/Input.html)
- [Label](components/Label/README.md) · [vista previa](visor/c/Label.html)
- [Progress](components/Progress/README.md) · [vista previa](visor/c/Progress.html)
- [RadioGroup](components/RadioGroup/README.md) · [vista previa](visor/c/RadioGroup.html)
- [Select](components/Select/README.md) · [vista previa](visor/c/Select.html)
- [Separator](components/Separator/README.md) · [vista previa](visor/c/Separator.html)
- [Sheet](components/Sheet/README.md) · [vista previa](visor/c/Sheet.html)
- [Skeleton](components/Skeleton/README.md) · [vista previa](visor/c/Skeleton.html)
- [Table](components/Table/README.md) · [vista previa](visor/c/Table.html)
- [Tabs](components/Tabs/README.md) · [vista previa](visor/c/Tabs.html)
- [Textarea](components/Textarea/README.md) · [vista previa](visor/c/Textarea.html)
- [Toaster](components/Toaster/README.md) · [vista previa](visor/c/Toaster.html)

</details>
