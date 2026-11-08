# Dialog

Ventana modal (Radix `Dialog`): reproductor de video y formularios cortos del panel.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/dialog.tsx` · [vista previa](../../visor/c/Dialog.html)
- **Partes:** `Dialog`, `DialogTrigger`, `DialogContent` (`showCloseButton`, por defecto `true`), `DialogHeader`, `DialogTitle` (16 px, 500), `DialogDescription`, `DialogFooter` (`showCloseButton` opcional), `DialogClose`.
- Contenido: `bg-popover`, `rounded-xl`, `ring-1 ring-foreground/10`, padding 16 px, ancho `calc(100% - 2rem)` y máximo 384 px desde `sm`. Fondo `black/10` con desenfoque.
- Pie sobre `muted/50` con borde superior: en celular los botones se apilan (el principal arriba); desde `sm`, en fila a la derecha.
- Botón de cerrar `ghost` de 44 px arriba a la derecha con nombre accesible «Cerrar».
- Atrapa el foco, cierra con Esc, la X o un clic en el fondo, y devuelve el foco al disparador. Siempre con `DialogTitle`.
- **No:** confirmar acciones irreversibles (usa `AlertDialog`), formularios largos (página o `Sheet`), diálogos encadenados.
