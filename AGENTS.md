# AGENTS.md — nexorafit-design-system

Lee [README.md](README.md) y [CONTRIBUTING.md](CONTRIBUTING.md) antes de editar. Es un repositorio de referencia independiente; su rama de trabajo es `main`.

- Este repositorio es dueño del único juego de tokens (`tokens.json`) y de las specs. Los componentes de producción viven en nexora-fit (`src/shared/ui/`); no hay paquete npm. No cambies nexora-fit como parte de un cambio aquí: describe en el PR qué tendrá que adoptar ([docs/ADOPCION.md](docs/ADOPCION.md)).
- Para cambios de UI lee [docs/VISUAL.md](docs/VISUAL.md), [docs/UX.md](docs/UX.md), [docs/COMPONENTES.md](docs/COMPONENTES.md) y la spec del componente.
- Tokens: edita solo `tokens.json` y corre `npm run tokens`. Nunca edites a mano `tokens.css`, `targets/`, `visor/tokens.css` ni `visor/tokens.js`.
- El visor se abre directo desde disco: sin servidor, sin CDN, sin recursos de internet. Un componente nuevo lleva spec, vista previa y entrada en el catálogo de `visor/index.html`.
- Documentación, specs y textos del visor en español; identificadores y nombres de archivo de código en inglés. Tutea y sigue la voz de [docs/UX.md](docs/UX.md#voz-y-textos).
- Verifica con `npm run verify` y `git diff --check`, y revisa el visor en claro y oscuro a 360 px y en escritorio. Reporta por separado lo que revisaste en el navegador; nunca des por pasada una revisión que no corriste.
- Commits Conventional en español. Haz commit o push solo cuando te lo pidan. Scripts de prueba y capturas van en el scratchpad, no en el repositorio.
