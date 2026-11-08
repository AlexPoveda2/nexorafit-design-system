# ErrorState

Error de una consulta: `CircleAlert` en `danger`, el mensaje y «Reintentar».

- **Estado:** Shipped · `nexora-fit/src/shared/ui/error-state.tsx` · [vista previa](../../visor/c/ErrorState.html)
- **Props:** `message` (ya traducido por `shared/lib/error-messages.ts`), `onRetry` (opcional: muestra el botón `outline` «Reintentar»).
- `role="alert"`, centrado, `py-12`. Dentro del mismo contenedor que fallaba (por ejemplo, el de `VideoPlayer`).
- El mensaje dice qué pasó y qué hacer («El enlace venció o ya se usó. Pide uno nuevo.»).
- **No:** errores de un formulario o de una mutación (van junto al formulario), el texto crudo del servidor, mostrar ceros como si fueran datos.
