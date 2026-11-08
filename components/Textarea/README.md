# Textarea

Texto de varias líneas con el mismo borde, foco y estados que `Input`. Crece con el contenido (`field-sizing-content`), mínimo 64 px; texto a 16 px.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/textarea.tsx` · [vista previa](../../visor/c/Textarea.html)
- **Props:** las de `<textarea>`.
- Usos: lesiones del cuestionario (con la nota «Solo Sam ve esta información») y el texto de la rutina en `ImportRoutineDialog`.
- Error: `aria-invalid="true"` + mensaje con `CircleAlert` debajo.
- **No:** texto de menos de 16 px, datos de salud en analítica o logs.
