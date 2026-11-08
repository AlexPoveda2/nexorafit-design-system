# Sheet

Panel que entra desde un borde (Radix `Dialog`): menú móvil del sitio (derecha) y «Más» del panel (abajo).

- **Estado:** Shipped · `nexora-fit/src/shared/ui/sheet.tsx` · [vista previa](../../visor/c/Sheet.html)
- **Partes:** `Sheet`, `SheetTrigger`, `SheetContent` (`side` `right` por defecto · `left` · `top` · `bottom`; `showCloseButton`), `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`.
- `bg-popover`, `shadow-lg`, borde del lado interior. Izquierda/derecha: 75 % del ancho, máximo 384 px desde `sm`. Arriba/abajo: ancho completo. Entra en 200 ms.
- Abajo respeta el área segura (`env(safe-area-inset-bottom)`). Hereda el tema: el menú del `Header` lleva `class="dark"`.
- Mismas reglas de foco que `Dialog`; cierra con Esc, la X o el fondo.
- **No:** formularios largos desde abajo en celular, `Sheet` dentro de `Sheet`, navegación principal del panel en escritorio (barra lateral).
