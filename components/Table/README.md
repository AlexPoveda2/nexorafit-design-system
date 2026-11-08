# Table

Tabla de datos del panel, solo desde `md`. Por debajo, la misma información como lista de tarjetas.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/table.tsx` · [vista previa](../../visor/c/Table.html)
- **Partes:** `Table` (dentro de un contenedor con scroll horizontal), `TableHeader`, `TableBody`, `TableFooter` (`muted/50`), `TableRow` (hover `muted/50`; `data-state="selected"` → `muted`), `TableHead` (40 px, 500), `TableCell` (padding 8 px), `TableCaption`.
- Montos y contadores con `tabular-nums`; referencias, códigos e IDs en `font-mono`; estados con `Badge`.
- **Celular (< `md`):** cada fila es una tarjeta: dato principal e insignia arriba, datos secundarios en `text-sm text-muted-foreground` abajo; toda la tarjeta lleva al detalle. Filtros en un `Sheet` con «Filtros (2)».
- Estados de pantalla: `Skeleton` con forma de filas, `EmptyState`, `ErrorState`.
- **No:** tablas en celular, montos sin `tabular-nums`, filas clicables sin enlace real, columnas que se cortan sin scroll.
