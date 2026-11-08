# Tabs

Pestañas de Radix: selector de nivel Básico | Intermedio. La activa nunca va en rojo.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/tabs.tsx` · [vista previa](../../visor/c/Tabs.html)
- **Partes:** `Tabs` (`value`, `onValueChange`, `orientation`), `TabsList` (`variant` `default` sobre `muted` · `line` con subrayado `foreground`), `TabsTrigger`, `TabsContent`.
- **Estados:** activa (`default`: fondo `background` con `shadow-sm`; en oscuro borde `input` y fondo `input/30` · `line`: subrayado de 2 px), hover (`foreground`), foco, deshabilitada.
- En celular, las pestañas ocupan todo el ancho (`className="w-full"` en `TabsList`). Los planes personalizados no muestran pestañas.
- Teclado: flechas, Inicio y Fin.
- **No:** pestañas para navegar entre páginas (usa enlaces), pestaña activa en `cta`, más de 4 pestañas en celular.
