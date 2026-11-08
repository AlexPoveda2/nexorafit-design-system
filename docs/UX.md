# Nexora Fit · Reglas de experiencia

Cómo se comporta Nexora Fit: estados, formularios, patrones de producto, textos y accesibilidad. El aspecto está en [VISUAL.md](VISUAL.md); los contratos de cada componente en [COMPONENTES.md](COMPONENTES.md). Estas reglas guían la construcción en nexora-fit; que estén aquí no prueba que una pantalla ya las cumpla.

## Principios aplicados

1. **La tarea primero.** Cada pantalla responde qué se está viendo y cuál es el siguiente paso: comprar, entrar, entrenar, cobrar.
2. **Una acción principal por bloque.** Si vende, es `cta`; si no, `default`. Las destructivas van separadas y con confirmación.
3. **Estado explícito.** Cargando, vacío, error, guardando y sin acceso significan cosas distintas. Una consulta que falla nunca se muestra como cero ni como vacío.
4. **Nada se pierde.** Un error no borra lo escrito. Las actualizaciones optimistas vuelven atrás si la API falla y lo avisan.
5. **Una mano, una columna.** Formularios de una columna, objetivos de 44 px y acciones al alcance del pulgar.

## Estados de pantalla

| Estado | Cómo se ve |
|---|---|
| Cargando | `Skeleton` con la forma del contenido: tarjeta, filas de tabla o bloques del día. Nunca un spinner de pantalla completa ni métricas en cero |
| Vacío | `EmptyState` con una acción: «Aún no tienes planes» + «Ver planes» |
| Error de consulta | `ErrorState` con «Reintentar». El mensaje sale de `error-messages.ts` |
| Error de una acción | Junto al formulario o al elemento que falló, no en un aviso ni en `ErrorState` |
| Guardando | El botón entra en estado de carga; el resto de la pantalla sigue usable |
| Confirmación breve | Aviso (`Toaster`) de 4 s: «Código copiado», «Día guardado» |

## Formularios

- **Una columna, siempre.** Orden: datos, consentimiento, captcha, botón.
- **Etiqueta arriba y siempre visible.** El `placeholder` solo muestra un ejemplo (`NXF-XXXX-XXXX`, `tu@correo.com`). Un campo opcional lo dice en la etiqueta.
- Campos a 16 px y 44 px de alto. Atributos de autocompletar y teclado según el dato ([Input](../components/Input/README.md)).
- Se valida al enviar y, después del primer intento, al salir de cada campo. Un error nunca borra lo escrito.
- **Error:** `aria-invalid="true"`, borde de error y mensaje con `CircleAlert` y `role="alert"` debajo, asociado con `aria-describedby`. Nunca solo color.
- Al enviar con errores, el foco va al primer campo con error.
- Mientras se envía, el botón muestra la carga y no admite un segundo envío.
- El captcha (Turnstile, modo `managed`) va a todo el ancho justo encima del botón y toma el tema de la sección.

## Patrones de producto

### Precios

- Siempre con `formatCop()`: `$ 160.000`, sin decimales.
- El front no calcula totales: muestra los valores que entrega la API.
- Precio vigente en `price` (con `font-display text-price-lg` cuando es grande); el tachado en `muted-foreground` con `line-through` y un `aria-label` («Antes $ 640.000»). Un precio nunca se distingue solo por color.
- Ahorro: insignia `cta` «Ahorra X %», con un porcentaje que viene de la API o se deriva de dos valores que entrega la API.

### Código de acceso

- Tarjeta con borde de 2 px `foreground`, etiqueta «Tu código de acceso», el código en `font-mono text-3xl tracking-[0.15em] tabular-nums` y `select-all`.
- Botones: `outline` «Copiar» (pasa a `Check` + «Copiado» por 2 s y lo anuncia con `aria-live`) y `cta lg` «Entrar a mi plan».
- Debajo: «También te lo enviamos a {correo}. Guárdalo: es tu llave para entrar».
- El código nunca va a la consola, a herramientas de errores, a analítica ni al almacenamiento del navegador.

### Contenido bloqueado

- Se muestra el primer bloque real que entrega la API; el resto son barras de relleno `bg-muted` con `blur-sm`, `aria-hidden` y `select-none`. El contenido real nunca llega al navegador.
- Encima del relleno: degradado hacia `background`, `Lock` y el botón `cta` «Desbloquear el plan de Boxeo».

### Día completado

- Botón `outline lg` a todo el ancho: `Circle` + «Marcar día completado». Al marcarlo pasa a `CircleCheck` en `success` + «Día completado» al instante (actualización optimista).
- Es un botón con `aria-pressed`, no una casilla: se desmarca con el mismo botón.
- Si la API falla, vuelve al estado anterior y muestra un aviso con el error.

### Tablas en el celular

Por debajo de `md`, cada fila es una tarjeta: dato principal (alumno, referencia) con la insignia de estado a la derecha; datos secundarios en `text-sm text-muted-foreground`; toda la tarjeta lleva al detalle. Los filtros se abren en un `Sheet` con el botón «Filtros (2)».

### Editor de rutinas en el celular

- Cada bloque y cada ejercicio es una tarjeta. Controles `ghost` de 44 px: `ChevronUp`, `ChevronDown` y `Trash2`, con `aria-label` («Mover "Golpe recto" arriba»). Sin arrastrar y soltar.
- El primero no tiene «Mover arriba» activo y el último no tiene «Mover abajo».
- Borrar un ejercicio no pide confirmación, pero muestra un aviso con «Deshacer» durante 5 s.
- Con cambios sin guardar aparece la barra fija «Cambios sin guardar» + `default` «Guardar día». Salir con cambios pide confirmación.
- Los errores de validación se muestran en el ejercicio que falla y la pantalla se desplaza hasta el primero.

### Confirmaciones

Toda acción irreversible usa `AlertDialog`: el título dice qué pasa («¿Anular la orden NXF-8F3K2M?») y el botón repite el verbo («Anular orden»). Las acciones que se pueden deshacer no se confirman: se ofrecen con «Deshacer».

### Enlaces externos

WhatsApp, Instagram y los legales que se abren desde el checkout usan `target="_blank" rel="noopener noreferrer"` y `ExternalLink` de 16 px cuando no es obvio que salen del sitio.

## Voz y textos

- **Se tutea siempre** («Revisa tu correo», «Entra con tu código»).
- **En la landing habla Sam**, en primera persona («Entrena conmigo»). En el checkout, el área del alumno y el panel habla la plataforma, con un tono neutro y corto.
- **Botones:** verbo + objeto («Comprar plan de Boxeo», «Copiar código», «Guardar día»). Nada de «Aceptar», «OK» o «Enviar» a secas.
- **Mayúscula solo al inicio** («Ya tengo código»). Las mayúsculas totales las pone Bebas Neue.
- **Errores:** dicen qué pasó y qué hacer («El enlace venció o ya se usó. Pide uno nuevo.»). Salen de `error-messages.ts`, nunca del texto del servidor.
- **Números y fechas:** `$ 160.000`; fechas con `Intl.DateTimeFormat("es-CO", { dateStyle: "medium" })`; datos separados con punto medio: «4 semanas · 3 días · 50 min».
- **Nombres fijos:** «código de acceso» (no «llave», que es el término interno), «Mis planes», «Acceso directo», «Pack completo», «Plan personalizado», «Básico» e «Intermedio».
- **Sin emojis** en la interfaz; se usan los íconos del [mapa de íconos](VISUAL.md#íconos).

## Accesibilidad

- Contraste AA en los dos temas ([VISUAL.md](VISUAL.md#contraste-wcag-22-aa)); el texto sobre fotos se revisa con la foto real.
- Todo se usa con teclado y con el foco visible. Los componentes Radix ya resuelven el teclado: no se reemplazan por `div` con `onClick`.
- Todo control tiene etiqueta visible o `aria-label`. Los errores van con `role="alert"`.
- Objetivos táctiles de al menos 44 px; casillas y radios con zona táctil ampliada.
- Una pantalla tiene un solo `h1`. Los enlaces navegan; los botones actúan.
- Un estado nunca depende solo del color: insignia con texto, ícono + palabra.
- Respetar `prefers-reduced-motion` ([VISUAL.md](VISUAL.md#movimiento)).
- Las pruebas buscan por rol y texto (`getByRole`, `getByLabelText`), lo que obliga a cumplir lo anterior.

## Checklist de UI para cada PR en nexora-fit

- [ ] Solo usa tokens: sin colores, tamaños ni sombras sueltos.
- [ ] Como máximo un botón rojo por bloque visible, y el rojo solo en lo que vende.
- [ ] Revisado a 360, 768 y 1280 px, con capturas en el PR.
- [ ] Los textos cumplen el contraste, incluido el texto sobre fotos reales.
- [ ] Todo se puede usar con teclado y el foco se ve; los botones con solo ícono tienen `aria-label`.
- [ ] Objetivos táctiles de al menos 44 px y campos con texto de 16 px.
- [ ] La pantalla tiene sus estados de carga, vacío y error.
- [ ] Se respeta `prefers-reduced-motion`.
- [ ] Los textos siguen la voz y los errores salen de `error-messages.ts`.
- [ ] Si hizo falta un token o un componente nuevo, primero se agregó en nexorafit-design-system ([ADOPCION.md](ADOPCION.md)).
