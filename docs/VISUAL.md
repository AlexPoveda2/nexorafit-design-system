# Nexora Fit · Dirección visual

Cómo se ve Nexora Fit: principios, temas, color, tipografía, espacio, radios, movimiento e imágenes. Los **valores** viven en [`tokens.json`](../tokens.json) y se ven en el [visor](../visor/index.html) (Fundamentos); este documento explica cuándo usar cada uno. El comportamiento está en [UX.md](UX.md) y los componentes en [COMPONENTES.md](COMPONENTES.md).

Las reglas marcadas con **SIEMPRE** no se negocian. El resto son valores por defecto: si el diseño cambia uno, se cambia aquí y en `tokens.json` en el mismo PR.

## Principios

1. **Mobile-first (SIEMPRE).** La mayoría llega desde Instagram en el celular. Cada pantalla se diseña a 360 px y después se adapta a 768 px y 1280 px.
2. **El rojo vende.** El rojo se usa solo en lo que debe llamar la atención: botones de compra, precios y destacados. Si todo es rojo, nada destaca.
3. **Negro de base, blanco de respiro.** El rojo llama la atención, el blanco le da plenitud al fondo y el negro siempre está.
4. **Fuerza en los títulos, calma en el texto.** Títulos en Bebas Neue; todo lo demás en Inter.
5. **Tokens, nunca valores sueltos (SIEMPRE).** Nada de `text-[#E10600]` ni `p-[13px]`. Si falta un token, se agrega a `tokens.json` y se sincroniza ([ADOPCION.md](ADOPCION.md)).
6. **Accesible por defecto.** Contraste AA, foco visible, objetivos táctiles de 44 px y controles con etiqueta.
7. **El panel se usa con una mano.** Sam opera desde el celular: ver ventas, buscar un alumno, crear un link de pago y editar rutinas.

## Temas por área

No hay selector de tema: cada área tiene el suyo. Los dos temas usan los mismos tokens semánticos; solo cambia su valor, que se activa con `class="dark"` en el contenedor.

| Área | Tema | Por qué |
|---|---|---|
| Sitio público | Alterna secciones oscuras y claras | Impacto en el hero y descanso en el contenido |
| Checkout, `/acceder`, `/pago/resultado` | Claro, con la barra superior oscura | Los formularios en fondo claro transmiten confianza |
| Área del alumno | Oscuro | Se siente como una app de entrenamiento y los videos resaltan |
| Panel de admin | Claro, con la navegación oscura | Tablas legibles al sol en el celular |
| Correos (los envía el back) | Claro con encabezado negro | Misma marca en «Tu acceso» |

### Ritmo de la landing

| # | Sección | Fondo |
|---|---|---|
| 1 | Barra superior | Oscuro, fija |
| 2 | Hero | Oscuro, sobre foto o video con capa |
| 3 | Bienvenida / Sobre Sam | Claro (`background`) |
| 4 | Cómo funciona | Claro (`muted`) |
| 5 | Deportes | Oscuro |
| 6 | Pack completo | **Rojo** (`cta`): la única sección roja del sitio |
| 7 | Qué incluye | Claro |
| 8 | Acceso directo | Oscuro |
| 9 | Preguntas frecuentes | Claro |
| 10 | Footer | Oscuro |

**Regla:** nunca dos secciones seguidas con el mismo fondo, salvo la barra y el hero.

## Color

### Paleta de marca

Once colores: `negro`, `carbon`, `grafito`, `blanco`, `humo`, `niebla`, `gris`, `acero`, `rojo`, `rojo-oscuro` y `rojo-vivo`. Los cuatro primeros de la planeación (negro, blanco, humo, rojo) más los mínimos para cumplir AA y tener superficies en oscuro. Valores y uso: `palette` en [`tokens.json`](../tokens.json).

La paleta solo la usan los tokens semánticos y casos puntuales documentados (la capa del texto sobre fotos usa `negro`).

### Tokens semánticos

Los componentes **solo** usan estos tokens; así el mismo componente funciona en los dos temas.

| Token | Claro | Oscuro | Para qué |
|---|---|---|---|
| `background` · `foreground` | blanco · negro | negro · blanco | Fondo y texto principal |
| `card` / `popover` | blanco | carbon | Tarjetas, menús, diálogos, avisos |
| `muted` · `muted-foreground` | humo · acero | carbon · gris | Superficies secundarias, esqueletos · texto secundario |
| `primary` · `primary-foreground` | negro · blanco | blanco · negro | Acción principal **que no vende**, casillas, progreso, pestaña activa |
| `secondary` / `accent` | humo | grafito | Botón secundario, hover de menús |
| `border` | niebla | grafito | Bordes decorativos |
| `input` | gris | gris | Borde de campos, casillas, radios (≥ 3:1) |
| `ring` | negro | blanco | Anillo de foco |
| `cta` · `cta-hover` · `cta-foreground` | rojo · rojo-oscuro · blanco | igual | Botones de compra y sección del pack |
| `price` | rojo | rojo-vivo | Precio vigente como texto |
| `destructive` | `#b42318` | `#b42318` | Fondo de botones destructivos |
| `danger` · `success` · `warning` | `#b42318` · `#15803d` · `#b45309` | `#f87171` · `#4ade80` · `#fbbf24` | Texto e ícono de error, éxito y aviso |

> **Error contra marca:** `danger` y `rojo` son rojos parecidos. Un error **siempre** lleva ícono (`CircleAlert`) y texto, y nunca se muestra como un botón relleno.

### Reglas del rojo (SIEMPRE)

- **Un solo botón rojo por bloque visible.** En el hero, «Ver planes» es rojo y «Quiero un plan personalizado» es secundario.
- **Sí es rojo:** «Comprar…», «Desbloquear», «Renovar», «Completa el pack», precios, la sección del pack y la insignia «Ahorra X».
- **No es rojo:** «Entrar», «Guardar», «Ya tengo código», navegación, barras de progreso, casillas, pestañas, focos, íconos decorativos y casi todo el panel.
- **En el panel**, el rojo aparece solo en los montos de venta del inicio y en «Generar link de pago».
- Dentro de la sección roja del pack, el botón es `default` sobre oscuro (blanco con texto negro), nunca rojo sobre rojo.

### Contraste (WCAG 2.2 AA)

AA pide **4,5:1** para texto normal, **3:1** para texto grande (≥ 24 px, o ≥ 19 px en negrita) y **3:1** para bordes de controles y foco. `color.contrast` en `tokens.json` declara las combinaciones obligatorias; `npm run verify` las calcula y falla si alguna no alcanza su mínimo, y la página **Colores** del visor muestra la tabla.

Casos que conviene recordar:

- **Rojo sobre negro: 3,96:1.** Solo texto grande. Para texto rojo en oscuro se usa `price` (`rojo-vivo`, 5,55:1).
- **Gris sobre blanco / humo: 3,45 / 3,17.** No sirve como texto; sí como borde de campo. El texto secundario en claro es `acero` (5,33:1).
- **Niebla sobre blanco (1,26) y grafito sobre negro (1,37):** solo decorativo, nunca el único borde de un control.
- El texto sobre fotos se revisa con la foto real, no con la de prueba.

## Tipografía

| Token | Fuente | Uso |
|---|---|---|
| `font-display` | **Bebas Neue** 400 | Títulos de página y sección, nombres de deporte, precios grandes, cifras del «Sobre mí» |
| `font-sans` | **Inter** 400, 500, 600, 700 | Todo lo demás: párrafos, botones, formularios, tablas, panel |
| `font-mono` | Monoespaciada del sistema | Código de acceso (`NXF-7KQ4-P9DM`), IDs de video (`BOX-GOL-001`), referencias de orden |

**Bebas Neue:**

- Un solo peso y solo mayúsculas. **Nunca** `font-bold`.
- Mínimo 24 px; por debajo, Inter semibold.
- Nunca en párrafos, botones, campos ni tablas.
- El texto se escribe en minúsculas normales en el código («Entrena conmigo»); la fuente ya lo muestra en mayúsculas y los lectores de pantalla no lo deletrean.

**Escala** (`type.scale`): `hero` 48 → 96 px, `display-1` 40 → 64, `display-2` 32 → 48, `display-3` 24 → 32 y `price-lg` 40 → 56 en Bebas Neue, con `clamp()` para crecer sin saltos; `xl` 20 px (600), `lg` 18, `base` 16, `sm` 14 y `xs` 12 (500) en Inter, con los valores por defecto de Tailwind. Nada más pequeño que `xs`.

- **Campos de formulario a 16 px (SIEMPRE).** Con menos, Safari en iPhone hace zoom al tocar el campo.
- Números en tablas y contadores con `tabular-nums`.
- Ancho máximo de párrafo: `max-w-prose` (unos 65 caracteres).
- `letter-spacing`: `0.01em` en display; las insignias en mayúsculas usan `tracking-wide`.

Las fuentes se cargan en nexora-fit con `next/font/google`. Este repositorio guarda copias locales (OFL) solo para que el visor funcione sin internet: [fonts/README.md](../fonts/README.md).

## Espaciado, layout y breakpoints

Escala de Tailwind (múltiplos de 4 px). Para mantener el ritmo se prefieren estos pasos (`spacing`):

| Paso | px | Uso típico |
|---|---|---|
| `1` · `2` | 4 · 8 | Ícono con texto, insignias |
| `3` · `4` | 12 · 16 | Dentro de tarjetas, entre campo y etiqueta, **margen lateral en celular** |
| `6` | 24 | Padding de tarjeta en escritorio, entre grupos de un formulario |
| `8` · `12` | 32 · 48 | Entre bloques de una sección |
| `16` · `24` | 64 · 96 | Padding vertical de sección: `py-16 md:py-24` |

**Contenedor:** `mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8`.

| Bloque | 360 px | `sm` 640 | `md` 768 | `lg` 1024+ |
|---|---|---|---|---|
| Tarjetas de deporte | 1 columna | 2 | 2 | 4 |
| Niveles (Básico / Intermedio) | 1 | 1 | 2 | 2 |
| Cómo funciona · Qué incluye | 1 | 1 | 3 · 2 | 3 · 2 |
| Mis planes | 1 | 2 | 2 | 3 |
| Técnicas (videos) | 2 | 2 | 3 | 4 |
| KPIs del panel | 2 | 2 | 4 | 4 |
| Formularios (checkout, acceder) | 1 columna, `max-w-md` centrada | | | |

**Breakpoints:** los de Tailwind sin cambios (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Se revisa en **360, 768 y 1280 px**.

**Elementos fijos** (`size`, `zIndex`):

| Elemento | Alto | Dónde | Capa |
|---|---|---|---|
| Barra superior (`Header`) | 64 px | Todo el sitio | `z-50` |
| `BuyBar` (precio + comprar) | 64 px + área segura | `/planes/[deporte]` en celular | `z-30` |
| Navegación inferior del panel | 64 px + área segura | `/admin/**` por debajo de `lg` | `z-40` |
| Barra «Guardar día» | 64 px + área segura | Editor con cambios sin guardar | `z-30` |
| Diálogos, `Sheet`, menús | — | — | `z-50` |
| Avisos (`sonner`) | — | Abajo al centro en celular, abajo a la derecha en escritorio | `z-[100]` |

Las barras inferiores suman `pb-[env(safe-area-inset-bottom)]` y la página agrega el mismo alto como `padding-bottom` para que no tapen contenido.

## Bordes, radios y elevación

`--radius` es 8 px. De ahí salen `rounded-sm` 4 px (insignias, casillas), `rounded-md` 6 px (botones), `rounded-lg` 8 px (tarjetas, campos, imágenes en tarjetas) y `rounded-xl` 12 px (contenido de `Dialog` y `AlertDialog`); `rounded-full` para el botón ▶, avatares, puntos de estado y `Progress`.

- El hero y las fotos de borde a borde no llevan radio.
- **La marca es plana.** Las tarjetas se separan con `border`, no con sombra. Solo flotan con sombra `Sheet` y menús (`shadow-lg`), la lista de `Select` (`shadow-md`), la barra superior al hacer scroll (`shadow-sm`) y `BuyBar` (sombra hacia arriba, pendiente de token).
- Borde de 1 px. 2 px solo en el foco y en la tarjeta seleccionada (el nivel elegido, `AccessCodeCard`, `CustomPlanBanner`).
- Foco de los controles shadcn: borde `ring` y anillo de 3 px de `ring` al 50 %. El resto de elementos enfocables usa el contorno global de 2 px con 2 px de separación.

## Movimiento

| Duración | Uso |
|---|---|
| 150 ms | Color y opacidad en hover y foco |
| 200 ms | Acordeón, pestañas, aparición de avisos |
| 300 ms | `Sheet` y diálogos |

Hoy los overlays de shadcn en nexora-fit usan 100 ms (`Dialog`, `AlertDialog`) y 200 ms (`Sheet`): ver [diferencias conocidas](ADOPCION.md#diferencias-conocidas).

- Curva `ease-out` al entrar y `ease-in` al salir.
- **`prefers-reduced-motion` (SIEMPRE):** se quitan los desplazamientos (`motion-reduce:transition-none`), el video del hero no se reproduce solo y se queda en el `poster`, y la marca de agua cambia de lugar sin animación.
- Nada se mueve por adorno: sin parallax, sin contadores animados y sin carruseles automáticos.

## Íconos

`lucide-react` con trazo 2. Tamaños: 16 px (`size-4`) junto a texto `sm`, en insignias y botones; 20 px (`size-5`) en menús; 24 px (`size-6`) en listas de «Qué incluye» y estados vacíos; 32 px dentro de un círculo de 56 px en los pasos de «Cómo funciona».

- Un ícono que acompaña texto lleva `aria-hidden`. Un botón con solo ícono lleva `aria-label` («Mover arriba», «Copiar código»).
- Los íconos no van en rojo, salvo dentro de un botón `cta`.
- Sin emojis en la interfaz.

**Mapa de íconos** (para no elegir uno distinto en cada pantalla):

| Concepto | Ícono |
|---|---|
| Pagar en línea | `CreditCard` |
| Código de acceso | `KeyRound` |
| Entrenar | `Dumbbell` |
| Videos de técnica · reproducir | `CirclePlay` · `Play` |
| Rutinas escritas | `ClipboardList` |
| Cualquier dispositivo | `Smartphone` |
| Dos niveles | `Layers` |
| Día completado | `CircleCheck` (marcado) · `Circle` (sin marcar) |
| Plan bloqueado | `Lock` |
| WhatsApp / chat con Sam | `MessageCircle` |
| Copiar · copiado | `Copy` · `Check` |
| Mover arriba / abajo · borrar | `ChevronUp` / `ChevronDown` · `Trash2` |
| Error · aviso · éxito | `CircleAlert` · `TriangleAlert` · `CircleCheck` |
| Cargando | `LoaderCircle` con `animate-spin` |
| Enlace externo | `ExternalLink` (16 px) |

Los deportes **no** se representan con íconos: se usan fotos de Sam.

## Imágenes

Siempre con `next/image`, `sizes` correcto y `priority` solo en el hero. Se recortan con `object-cover`, nunca se estiran.

| Imagen | Proporción | `sizes` |
|---|---|---|
| Hero | 9:16 en celular · 16:9 desde `md` | `100vw` |
| Tarjeta de deporte | 4:5 | `(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw` |
| Encabezado del deporte | 3:2 en celular · 21:9 desde `md` | `100vw` |
| Fotos del «Sobre mí» | 4:5 | `(min-width: 768px) 33vw, 50vw` |
| Poster de video | 16:9 | Según la rejilla de técnicas |

Mientras no estén las fotos, bloques `bg-muted` con la misma proporción para que el layout no cambie.

**Texto sobre fotos:** capa `bg-gradient-to-t from-negro via-negro/70 to-negro/20`, texto blanco sobre la zona más oscura. En una tarjeta de plan bloqueado la foto va en `grayscale` y `opacity-60`, pero el texto conserva su contraste.

## Trabajo en la herramienta de diseño

Para que pasar del diseño al código sea directo (hoy en Adobe XD):

1. **Colores** con los nombres de la paleta (`negro`, `carbon`, `rojo`…) y los semánticos como segundo grupo, uno por tema.
2. **Estilos de carácter** con los nombres de la escala (`hero`, `display-1`, `base`, `sm`…) en 360 px y 1280 px.
3. **Componentes con los mismos nombres y variantes del código:** `Button / cta / lg`, `Badge / warning`, `PlanCard / renovar`. Los estados (hover, cargando, deshabilitado, error) como estados del componente.
4. **Artboards** de 360 × 800, 768 × 1024 y 1280 × 800 por pantalla.
5. **Rejilla:** 4 columnas con márgenes de 16 px en celular y 12 columnas con contenedor de 1152 px en escritorio, con paso de 4 px.
6. Si el diseño necesita un valor que no existe (color, tamaño, radio), **se agrega primero a `tokens.json`** y después se usa. Así el diseño, este repositorio y nexora-fit no se separan.
