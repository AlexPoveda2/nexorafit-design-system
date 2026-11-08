# Skeleton

Marcador de carga: `bg-muted rounded-md animate-pulse` con la forma del contenido que reemplaza.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/skeleton.tsx` · [vista previa](../../visor/c/Skeleton.html)
- **Props:** las de `<div>`; el tamaño y la forma van en `className`.
- Formas: tarjeta (imagen 16:9 + título + barra + botón), filas de tabla, bloques del día, video 16:9 en `VideoPlayer`.
- El contenedor marca `aria-busy="true"` y un nombre («Cargando planes»).
- **No:** spinner de pantalla completa, métricas en cero mientras carga, volver todo a esqueleto en cada refresco.
