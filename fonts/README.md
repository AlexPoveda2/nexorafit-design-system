# Fuentes

Copias locales para que el visor funcione sin internet. nexora-fit no las usa: allá se cargan con `next/font/google` ([docs/ADOPCION.md](../docs/ADOPCION.md#tema-y-fuentes)).

| Rol | Familia | Archivo | Licencia |
|---|---|---|---|
| Títulos (`--font-display`) | Bebas Neue (Dharma Type) | `bebas-neue-latin.woff2` (400, subconjunto latino) | [SIL Open Font License 1.1](OFL-bebas-neue.txt) |
| Texto (`--font-sans`) | Inter (Rasmus Andersson) | `inter-latin.woff2` (variable 100–900, subconjunto latino, sin itálica) | [SIL Open Font License 1.1](OFL-inter.txt) |

- Los archivos son los que `next/font/google` descargó para nexora-fit (subconjunto latino de Google Fonts: tildes, ñ, ¿ ¡ « » y €).
- La OFL permite usarlas, incrustarlas y guardarlas en este repositorio. Conserva cada licencia junto a su archivo y no vendas los archivos por separado.
- `scripts/tokens.mjs` las embebe en `visor/tokens.css` como `data:` para que el visor no dependa de rutas de archivos entre carpetas.
