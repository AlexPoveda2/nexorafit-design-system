# Card

Superficie de contenido: `rounded-lg border bg-card`, sin sombra. Padding 16 px en celular y 24 px desde `md`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/card.tsx` · [vista previa](../../visor/c/Card.html)
- **Partes:** `Card` (`size` `default` · `sm` 12 px), `CardHeader`, `CardTitle` (16 px, 500), `CardDescription` (`muted-foreground`), `CardAction` (arriba a la derecha: insignia o menú), `CardContent`, `CardFooter` (sobre `muted/50` con borde superior).
- Una imagen como primer hijo va de borde a borde (sin padding superior) con las esquinas superiores redondeadas.
- **Tarjeta enlace:** el enlace es el título y se extiende con `after:absolute after:inset-0`; un solo foco.
- Sin fotos todavía: bloque `bg-muted` con la misma proporción, para que el layout no cambie.
- **No:** sombras, `div` con `onClick`, varias acciones `cta` en una tarjeta, colores propios.
