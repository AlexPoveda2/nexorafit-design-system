# Header

Barra superior fija y siempre oscura (`class="dark"`), sobre cualquier tema de sección.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/header.tsx` · [vista previa](../../visor/c/Header.html)
- **Anatomía:** contenedor `max-w-6xl px-4`, 64 px de alto; logo «Nexora Fit» en `font-display text-2xl tracking-wide` a la izquierda.
- **Desde `md`:** «Planes» (`ghost`, baja a `#deportes`) y «Ya tengo código» (`outline`).
- **Celular:** «Ya tengo código» siempre visible y un botón `ghost` `icon` con `Menu` («Abrir menú») que abre un `Sheet` oscuro desde la derecha.
- Fondo sólido siempre; al hacer scroll suma `shadow-sm`. La variante transparente sobre el hero es de la landing, no de este componente.
- **No:** `cta` en la barra, más de dos acciones, ocultar «Ya tengo código» en celular.
