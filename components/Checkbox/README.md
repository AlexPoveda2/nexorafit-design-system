# Checkbox

Casilla de 20 px (Radix `Checkbox`) con zona táctil de 44 px (`after:-inset-3`). Marcada en `primary`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/checkbox.tsx` · [vista previa](../../visor/c/Checkbox.html)
- **Props:** `checked`, `onCheckedChange`, `disabled`, `aria-invalid` y las de Radix.
- **Estados:** sin marcar (borde `input`), marcada (fondo y borde `primary`, `Check` en `primary-foreground`), foco (anillo al 50 %), error (borde `destructive`), deshabilitada (50 %).
- Siempre con `Label` asociado; la fila completa mide al menos 44 px. Un grupo va en `fieldset` + `legend`.
- Usos: deportes y equipo del cuestionario, términos del checkout (con enlaces que abren en otra pestaña).
- **No:** casillas rojas, «Día completado» como casilla (es un botón con `aria-pressed`), casillas sin etiqueta.
