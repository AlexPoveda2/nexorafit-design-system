# Button

Botón de acción en Inter 600, 14 px (16 px en `lg`), `rounded-md`. Lo único rojo es `cta`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/button.tsx` · [vista previa](../../visor/c/Button.html)
- **Props:** `variant` — `cta` (comprar, desbloquear, renovar, «Ver planes»: `cta` + `cta-hover`), `default` (acción principal que no vende: «Entrar», «Guardar día»; `primary`, negro en claro y blanco en oscuro), `secondary` («Quiero un plan personalizado»), `outline` (acciones de tarjeta o tabla: «Ver detalle»; borde `input`), `ghost` (íconos de la barra, ↑↓ del editor, menús), `link` (dentro de un texto), `destructive` («Anular orden», «Borrar video»; texto blanco). `size` — `sm` 36 px · `default` 44 px · `lg` 48 px · `icon` 44 × 44. `asChild` para enlaces (`<Link>`).
- **Estados:** hover (`cta` → `cta-hover`; `default` al 90 %; `secondary` al 80 %; `outline`/`ghost` → `accent`), foco (borde `ring` + anillo de 3 px al 50 %), deshabilitado (50 %, sin puntero). **Cargando:** deshabilitado, `LoaderCircle` girando a la izquierda y el texto en gerundio («Entrando…», «Guardando…»), sin cambiar de tamaño.
- En celular, el botón principal de un formulario o tarjeta ocupa todo el ancho: `w-full sm:w-auto`.
- Texto: verbo + objeto, mayúscula solo al inicio («Comprar plan de Boxeo», «Copiar código»). Un botón con solo ícono lleva `aria-label`.
- Dentro de la sección roja del pack, `default` sobre oscuro (blanco con texto negro).
- **No:** dos `cta` en el mismo bloque visible, `cta` en «Entrar», «Guardar», navegación o casi todo el panel, `destructive` fuera de un `AlertDialog`, `sm` en celular, rojo sobre rojo, «Aceptar», «OK» o «Enviar» a secas.
