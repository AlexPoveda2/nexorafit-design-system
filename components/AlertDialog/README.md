# AlertDialog

Confirmación (Radix `AlertDialog`) de toda acción irreversible: anular orden, borrar video, regenerar código, cerrar sesión en otros dispositivos.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/alert-dialog.tsx` · [vista previa](../../visor/c/AlertDialog.html)
- **Partes:** `AlertDialogContent` (`size` `default` 320 → 384 px desde `sm` · `sm` 320 px con botones en dos columnas), `AlertDialogHeader` (centrado en celular; a la izquierda desde `sm`), `AlertDialogMedia` (ícono de 24 px en un cuadro `muted` de 40 px), `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel` (`outline`), `AlertDialogAction` (`default`; `variant="destructive"` si destruye).
- El título dice qué pasa («¿Anular la orden NXF-8F3K2M?») y el botón repite el verbo («Anular orden»).
- No se cierra tocando el fondo: hay que elegir. Esc equivale a cancelar.
- **No:** «Sí», «Aceptar» u «OK»; confirmar acciones reversibles (borrar un ejercicio usa un aviso con «Deshacer»); `cta` en la acción.
