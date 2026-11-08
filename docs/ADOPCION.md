# Adopción en nexora-fit

Este repositorio es dueño del **único juego de tokens** ([`tokens.json`](../tokens.json): nombres, valores y fuentes) y de las specs visuales y de experiencia. [nexora-fit](https://github.com/AlexPoveda2/nexora-fit) es dueño de la **única implementación**: los componentes React viven en su `src/shared/ui/` (shadcn/ui + Radix + Tailwind v4) y en el `ui/` de cada feature. No hay un repositorio de paquetes: nexora-fit toma los tokens con un paso de sincronización y los componentes los construye siguiendo las specs.

## Cómo llegan los tokens

```text
tokens.json ──npm run tokens──► targets/nexora-fit/globals.tokens.css ──npm run sync──► nexora-fit/src/app/globals.css
            └──────────────────► tokens.css · visor/tokens.css · visor/tokens.js (referencia y visor)
```

- `npm run tokens` genera todo desde `tokens.json`. Ningún archivo generado se edita a mano; `npm run verify` falla si alguno no coincide.
- `targets/nexora-fit/globals.tokens.css` es el bloque exacto que necesita `globals.css`: la paleta en `@theme`, los semánticos claros en `:root`, los oscuros en `.dark` y las utilidades en `@theme inline`. Va entre los marcadores `<nexorafit-design-system:tokens>`.
- Solo se emiten los tokens con `source: "nexora"`. Los que tienen `source: "tailwind"` (espaciado, breakpoints, sombras, duraciones, tamaños de `xs` a `xl`) son los valores por defecto de Tailwind v4: se documentan y los usa el visor, pero en nexora-fit ya existen como utilidades (`p-4`, `shadow-lg`, `duration-150`).
- Fuera del bloque, y propios de nexora-fit, quedan los `@import` (`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`), `@custom-variant dark (&:is(.dark *))` y `@layer base`.

```sh
# Desde este repositorio, con nexora-fit clonado al lado:
npm run sync -- ../nexora-fit            # comprueba; no escribe. Sale con 1 si los valores difieren
npm run sync -- ../nexora-fit --write    # reemplaza el bloque en src/app/globals.css
```

### Tema y fuentes

- El tema oscuro es la clase `dark` en un contenedor (`<section className="dark bg-background text-foreground">`, la raíz del layout `(student)`, el `Header` y el `Footer`). No hay selector de tema ni `next-themes`.
- Las fuentes se cargan en `src/app/layout.tsx` con `next/font/google`, que crea las variables que usa el bloque (`--font-bebas-neue`, `--font-inter`):

```tsx
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas-neue", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// <html lang="es-CO" className={`${bebasNeue.variable} ${inter.variable}`}>
```

- Los `.woff2` de [`fonts/`](../fonts/README.md) son solo para el visor sin conexión.

## Primera adopción (PR pendiente en nexora-fit)

Hoy `globals.css` ya tiene exactamente estos valores: `npm run sync -- ../nexora-fit` responde «mismos tokens; faltan los marcadores». La adopción no cambia nada visual.

1. En nexora-fit, desde `develop`, una issue y su rama (por ejemplo `chore/tokens-design-system`).
2. Clonar este repositorio al lado: `git clone git@github.com:AlexPoveda2/nexorafit-design-system.git ../nexorafit-design-system`.
3. Desde `nexorafit-design-system`: `npm run sync -- ../nexora-fit` (debe salir con 0) y luego `npm run sync -- ../nexora-fit --write`.
4. En nexora-fit, `git diff src/app/globals.css` debe mostrar **solo** las dos líneas de los marcadores. Si muestra algo más, parar: alguien cambió tokens a mano y hay que llevar ese cambio primero a `tokens.json`.
5. Cambiar el comentario sobre `@import "shadcn/tailwind.css"` para que apunte a este repositorio en vez de a `docs/webSite/design-system.md §9`.
6. Reemplazar `docs/webSite/design-system.md` por un puntero (plantilla abajo). Su contenido ya vive aquí: §1–§8 y §14 en [VISUAL.md](VISUAL.md), §10 y §11 en [COMPONENTES.md](COMPONENTES.md) y `components/`, §12, §13 y §16 en [UX.md](UX.md), §9 y §15 en este documento.
7. En `docs/guia-desarrollo-front.md` §8.1, cambiar el enlace a `design-system.md` por este repositorio y dejar el bloque CSS de ejemplo como referencia histórica o quitarlo. En `CLAUDE.md`, agregar una línea: «Design system (tokens y specs): repo `nexorafit-design-system`; no editar tokens en `globals.css` a mano».
8. Los comentarios de `src/shared/ui/` que citan «design system §10.1», «§10.4», etc. (`accordion`, `badge`, `button`, `card`, `empty-state`, `error-state`, `footer`, `header`, `input`, `sonner`) pasan a citar la spec: `nexorafit-design-system/components/Button/README.md`. Puede hacerse en este PR o al tocar cada archivo.
9. `make check`, revisión en el navegador a 360, 768 y 1280 px (sin cambios esperados) y PR contra `develop`: `chore(ui): sincronizar tokens desde nexorafit-design-system`.
10. Opcional: un paso de CI en nexora-fit que clone este repositorio (es público) y corra `npm run sync -- <nexora-fit>` sin `--write`, para que nadie edite el bloque a mano.

Plantilla para `docs/webSite/design-system.md`:

```markdown
# Design system: frontend

El design system de Nexora Fit vive en el repositorio
[nexorafit-design-system](https://github.com/AlexPoveda2/nexorafit-design-system): tokens (`tokens.json`),
dirección visual, reglas de UX, una spec por componente y un visor que se abre sin servidor.

- Tokens: no se editan en `src/app/globals.css`; se cambian allá y se sincronizan (`docs/ADOPCION.md`).
- Componentes: se implementan aquí, en `src/shared/ui/`, siguiendo `components/<Nombre>/README.md`.
- Checklist de UI para cada PR: `docs/UX.md` de ese repositorio.
```

## Cambiar un token

1. PR en este repositorio: editar `tokens.json`, `npm run tokens`, `npm run verify` (incluye el contraste) y revisar el visor en los dos temas. Si cambia una regla, actualizar [VISUAL.md](VISUAL.md).
2. Tras el merge, PR en nexora-fit con `npm run sync -- ../nexora-fit --write`. El diff de `globals.css` muestra exactamente el cambio. `make check` y capturas a 360, 768 y 1280 px de las pantallas afectadas.
3. Un token nuevo que nexora-fit necesita como utilidad lleva `source: "nexora"`; si Tailwind ya lo trae, `source: "tailwind"`.

## Ciclo de un componente

| Estado | Dónde | Qué significa |
|---|---|---|
| **Draft** | Este repositorio | Spec en `components/<Nombre>/README.md` con `**Estado:** Draft`, vista previa en `visor/c/<Nombre>.html`, entrada en el catálogo y en la lista `drafts` del visor (sale marcado «Borrador»). Aún no existe en nexora-fit |
| **Build** | nexora-fit | Issue y rama en nexora-fit que lo implementa en `src/shared/ui/` (o en el `ui/` de su feature) con shadcn/Radix, los tokens y todos los estados de la spec; pruebas por rol y texto; revisión a 360 px. La spec pasa a `**Estado:** Build` con la ruta del archivo |
| **Shipped** | nexora-fit `develop` | Mergeado. La spec pasa a `**Estado:** Shipped` y sale de `drafts`. La vista previa queda como referencia de los estados |

- Un cambio a un componente Shipped empieza aquí (spec y vista previa) y luego va a nexora-fit en un PR que la cite. Si nexora-fit necesita un ajuste urgente, se hace allá y en el mismo día se actualiza la spec aquí.
- Nombres genéricos, como shadcn: `Button`, `Badge`, `Card`, `Dialog`. El aspecto de Nexora va en `variant` y `size`, nunca en el nombre (`ButtonNexora`).
- `className` en nexora-fit es para layout (ancho, márgenes, rejilla); no para recolorear un componente. Si hace falta otro aspecto, es una variante nueva y empieza aquí.

## Ajustes históricos a la guía del front

Decisiones tomadas al crear el design system (HUF-2) que cambiaron la §8.1 de `guia-desarrollo-front.md`:

| # | Antes | Ahora | Por qué |
|---|---|---|---|
| 1 | `--primary: var(--color-rojo)` | `--primary` negro en claro y blanco en oscuro; el rojo es `--cta` | shadcn usa `primary` en casillas, progreso, pestañas y botones por defecto: todo saldría rojo y el rojo dejaría de vender |
| 2 | `--color-gris` para texto secundario | `acero` en claro; `gris` en oscuro y bordes de campos | El gris da 3,45:1 sobre blanco y no pasa AA |
| 3 | Un solo rojo | `rojo-vivo` para texto rojo sobre negro y `rojo-oscuro` para el hover | El rojo base da 3,96:1 sobre negro |
| 4 | Solo tema claro | Tema oscuro con `.dark` por sección y por área | La landing alterna fondos y el área del alumno es oscura |
| 5 | `@theme` con las fuentes | Fuentes en `@theme inline` | Las utilidades usan la variable que crea `next/font` |

## Diferencias conocidas

Diferencias entre la spec original (`docs/webSite/design-system.md`) y lo que hoy hace nexora-fit. Los **tokens** coinciden byte a byte; esto es uso y componentes. Las specs de `components/` describen lo que está en nexora-fit; cada punto necesita una decisión: ajustar el código o ajustar la regla.

- **`Input`, `Textarea` y `SelectTrigger` usan `rounded-lg` (8 px)**; la spec pedía `rounded-md` (6 px) para botones y campos.
- **Error de campo en `destructive`, no en `danger`.** `aria-invalid` pinta el borde con `destructive` (en oscuro al 50 %), mientras la spec dice «borde `danger`». En oscuro, `danger` es `#f87171` y `destructive` sigue en `#b42318`.
- **`Tabs`:** la lista mide 32 px (`h-8`), por debajo del objetivo táctil de 44 px, y la pestaña activa es `background` con sombra (o subrayado `foreground` en `line`), no `primary` como dice la spec.
- **`Dialog` y `AlertDialog` usan `rounded-xl` (12 px)**; la spec pedía `rounded-lg`. Sus animaciones duran 100 ms y la de `Sheet` 200 ms; la spec pide 300 ms.
- **Botón de cerrar de `Dialog` y `Sheet` con texto accesible en inglés** («Close»); debe ser «Cerrar».
- **`Header`:** 64 px siempre (la spec: 56 px en celular, 64 px desde `md`), `z-50` (la spec: `z-40`), fondo sólido en vez de `bg-background/95` con desenfoque (el propio código explica que la versión transparente es de la landing), y usa `Button size="sm"` (36 px) en celular, que la spec prohíbe. El logo está escrito en mayúsculas («NEXORA FIT»), contra la regla de escribir en minúsculas normales para Bebas Neue.
- **`Toaster`:** el error usa `OctagonX`; el mapa de íconos dice `CircleAlert` para errores.
- **Sombras en oscuro:** la spec dice «en el tema oscuro no hay sombras», pero el `Header` (oscuro) suma `shadow-sm` al hacer scroll y `Sheet` lleva `shadow-lg` en los dos temas.
- **Foco:** los controles shadcn quitan el contorno global y usan borde `ring` + anillo de 3 px al 50 %; la spec describe un anillo de 2 px con 2 px de separación.
- **`destructive` usa `text-white`**, un color fuera de los tokens; no hay `destructive-foreground`.
- **`Checkbox` usa `rounded-[4px]`**, un valor arbitrario igual a `rounded-sm`.
- **Interlineados de la escala de Inter:** la spec dice `sm` 1,45, `lg` 1,6 y `xs` 1,4, pero `globals.css` no los define y Tailwind usa 1,43, 1,56 y 1,33. `tokens.json` sigue a `globals.css`.
- **Sin token para la sombra hacia arriba de `BuyBar`** ni para la capa del texto sobre fotos: se definen al construir esos componentes.

## Próximos pasos

- **Contratos de pantalla** (`docs/ui-contracts/`): landing, página del deporte, checkout, resultado del pago, acceder, «Mis planes», día de rutina, inicio del panel, listas y detalle del panel, editor de rutinas.
- Specs y vistas previas de `Command`, `DropdownMenu` e `InputGroup`, y de los componentes de producto que se repiten (`PriceTag`, `AccessCodeCard`, `PlanCard`, `BuyBar`, `AdminShell`).
- Resolver las [diferencias conocidas](#diferencias-conocidas).
- Etiquetas de versión (`v1.0.0`) cuando nexora-fit adopte el bloque, para citar la versión en cada PR de sincronización.
