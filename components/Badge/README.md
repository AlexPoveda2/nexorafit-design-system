# Badge

Insignia en MAYÚSCULAS: `text-xs font-medium tracking-wide`, `rounded-sm`, `px-2 py-0.5`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/badge.tsx` · [vista previa](../../visor/c/Badge.html)
- **Props:** `variant` — `neutral` (por defecto: «Básico + Intermedio», «Expirada»), `cta` («Ahorra 60 %», «Más completo»; solo sitio público), `success` («Aprobada», «Listo»), `warning` («Pendiente», «Vence en 5 días»), `danger` («Rechazada», «Falló»), `outline` («Anulada», «Reembolsada»). `asChild`. Un ícono hijo mide 12 px.
- Los tonos de estado usan el color al 10 % de fondo y el color pleno de texto; funcionan en los dos temas.
- **Estados de la API:** orden `pending` → `warning` Pendiente · `approved` → `success` Aprobada · `declined` → `danger` Rechazada · `expired` → `neutral` Expirada · `voided`/`refunded` → `outline` Anulada/Reembolsada. Video `draft` → `neutral` Borrador · `processing` → `warning` Procesando (con `LoaderCircle`) · `ready` → `success` Listo · `failed` → `danger` Falló.
- El texto sale de un mapa en el `domain/` de la feature, nunca del valor crudo de la API.
- **No:** frases, botones disfrazados de insignia, `cta` en el panel o el área del alumno, estado comunicado solo con color.
