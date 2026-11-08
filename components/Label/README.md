# Label

Etiqueta de un control (Radix `Label`): 14 px, peso 500, `leading-none`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/label.tsx` · [vista previa](../../visor/c/Label.html)
- **Props:** las de `<label>`; `htmlFor` apunta al `id` del control.
- Va arriba del campo y siempre visible. Un campo opcional lo dice en la etiqueta: «WhatsApp (opcional)».
- Con el control deshabilitado baja al 50 % (`peer-disabled`, `group-data-[disabled=true]`).
- Junto a `Checkbox` o `RadioGroupItem`, la fila completa es la zona táctil (≥ 44 px).
- **No:** el `placeholder` como etiqueta, etiquetas ocultas en campos visibles, mayúsculas totales.
