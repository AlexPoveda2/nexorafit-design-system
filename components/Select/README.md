# Select

Lista de opciones (Radix `Select`). El disparador mide 44 px con texto a 16 px, como `Input`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/select.tsx` · [vista previa](../../visor/c/Select.html)
- **Partes:** `Select`, `SelectTrigger` (`size` `default` 44 px · `sm` 36 px), `SelectValue` (`placeholder` en `muted-foreground`), `SelectContent` (`bg-popover`, `shadow-md`, `ring-1`, `rounded-lg`, en un portal), `SelectGroup`, `SelectLabel`, `SelectItem` (activo en `accent`, check a la derecha), `SelectSeparator`.
- **Estados:** foco, error (`aria-invalid`), deshabilitado; en oscuro el fondo es `input/30` y el hover `input/50`.
- Usos: días por semana (1 a 7) en el cuestionario; filtros del panel.
- Teclado de Radix: flechas, Enter, Esc y búsqueda por letra. La lista se abre por encima de todo y nunca queda recortada.
- **No:** `sm` en celular, `Select` para dos opciones visibles (usa `RadioGroup`), opciones sin texto.
