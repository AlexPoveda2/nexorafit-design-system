# Toaster

Avisos breves de `sonner` (`Toaster` en el layout, `toast()` en el código) con los colores de `popover`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/sonner.tsx` · [vista previa](../../visor/c/Toaster.html)
- **Tipos:** `toast.success` (`CircleCheck`), `toast.info` (`Info`), `toast.warning` (`TriangleAlert`), `toast.error` (`OctagonX`), `toast.loading` (`LoaderCircle` girando); con `action` para «Deshacer».
- Estilo: `--normal-bg: var(--popover)`, `--normal-text: var(--popover-foreground)`, `--normal-border: var(--border)`, radio `--radius`; ícono de 16 px. Sigue el tema de la sección que lo contiene.
- Duración 4 s; con «Deshacer» (borrar un ejercicio) 5 s. Abajo al centro en celular y abajo a la derecha en escritorio, por encima de todo.
- Usos: «Código copiado», «Día guardado», revertir una actualización optimista que falló.
- **No:** errores de un formulario (van junto al formulario), información que la persona necesita conservar, avisos para cada acción menor.
