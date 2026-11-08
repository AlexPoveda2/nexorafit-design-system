# RadioGroup

Una opción entre varias (Radix `RadioGroup`). Radio de 20 px, zona táctil de 44 px, marcado en `primary`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/radio-group.tsx` · [vista previa](../../visor/c/RadioGroup.html)
- **Partes:** `RadioGroup` (`grid gap-2`; `value`, `onValueChange`), `RadioGroupItem` (`value`, `disabled`, `aria-invalid`).
- **Estados:** sin marcar, marcado (fondo `primary` con punto `primary-foreground`), foco, error, deshabilitado.
- Flechas para moverse dentro del grupo; Tab entra y sale. El grupo lleva su pregunta como `legend` o `aria-labelledby`.
- Uso: nivel (Básico / Intermedio) en el cuestionario.
- **No:** grupos sin pregunta visible, radios para acciones, más de 6 opciones (usa `Select`).
