# EmptyState

Vacío real: hay respuesta y no hay datos. Ícono, título, una línea y una acción opcional.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/empty-state.tsx` · [vista previa](../../visor/c/EmptyState.html)
- **Props:** `icon` (`LucideIcon`, 24 px en `muted-foreground`), `title` (`text-xl`, 500), `description` (una línea, `text-sm text-muted-foreground`), `action` (un botón).
- Centrado, `py-12`. Copia: qué no hay y el primer paso permitido: «Aún no tienes planes» + «Ver planes».
- **No:** mostrarlo antes de que responda la API o cuando la consulta falló (usa `ErrorState`), más de una acción, ilustraciones o emojis.
