# Progress

Barra de progreso (Radix `Progress`): 8 px, fondo `muted`, relleno `primary`, extremos redondos.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/progress.tsx` · [vista previa](../../visor/c/Progress.html)
- **Props:** `value` (0 a 100) y las de Radix.
- Siempre con el texto al lado o debajo: «5 de 24 días», «Subiendo video: 64 %. No cierres esta pestaña».
- Usos: avance del plan en `PlanCard`, subida de videos en `UploadProgress`.
- **No:** barra roja, barra sola sin texto, progreso inventado para una carga de duración desconocida (usa `Skeleton`).
