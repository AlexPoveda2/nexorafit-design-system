# Nexora Fit · Contratos de componentes

Qué debe cumplir cada componente y dónde vive. Cada componente base tiene una spec en `components/<Nombre>/README.md` y una vista previa en el [visor](../visor/index.html); el aspecto general está en [VISUAL.md](VISUAL.md) y el comportamiento en [UX.md](UX.md).

## Dónde vive cada cosa

- **Aquí:** la spec (props, variantes, estados, reglas «No») y una vista previa en HTML y CSS plano que reproduce las clases de Tailwind con los tokens. La vista previa es una referencia: no es el componente de producción ni prueba su accesibilidad.
- **En nexora-fit:** la implementación de producción, en `src/shared/ui/` (shadcn/ui + Radix + Tailwind v4) para los componentes base y en el `ui/` de cada feature para los de producto. Los componentes base **no reciben lógica de negocio**; si uno se repite en tres features, sube a `shared/ui`.
- Ningún componente define colores propios: usan los tokens semánticos.

El ciclo Draft → Build → Shipped y la forma de llevar los cambios a nexora-fit están en [ADOPCION.md](ADOPCION.md).

## Comportamiento obligatorio

- Resolver los estados que apliquen: normal, hover, foco, presionado, deshabilitado, cargando, error y éxito.
- **Botones:** texto verbo + objeto, `type` explícito, estado de carga sin cambiar de tamaño y sin doble envío. La API sigue protegiéndose de duplicados.
- **Campos:** etiqueta visible, ayuda y error asociados (`aria-describedby`), `aria-invalid`, 16 px y 44 px. Los grupos de casillas o radios van en `fieldset` + `legend`.
- **Overlays** (`Dialog`, `AlertDialog`, `Sheet`, `Select`): atrapan el foco, tienen nombre accesible, cierran con Esc y devuelven el foco al disparador. Las listas y menús se abren en un portal, por encima de todo, sin recortarse.
- **Estados de datos:** carga con `Skeleton`, vacío con `EmptyState`, error con `ErrorState`; nunca ceros inventados.
- **Íconos:** decorativos con `aria-hidden`; botones de solo ícono con `aria-label`. El estado nunca depende solo del color.
- **Objetivos táctiles:** 44 px como mínimo en todo lo que se toca; `sm` (36 px) solo en tablas del panel en escritorio.

## Componentes base

Todos están **Shipped** en `nexora-fit/src/shared/ui/`.

| Grupo | Componentes |
|---|---|
| Acciones | [Button](../components/Button/README.md) |
| Formularios | [Label](../components/Label/README.md) · [Input](../components/Input/README.md) · [Textarea](../components/Textarea/README.md) · [Select](../components/Select/README.md) · [Checkbox](../components/Checkbox/README.md) · [RadioGroup](../components/RadioGroup/README.md) |
| Navegación | [Tabs](../components/Tabs/README.md) |
| Visualización | [Badge](../components/Badge/README.md) · [Card](../components/Card/README.md) · [Table](../components/Table/README.md) · [Accordion](../components/Accordion/README.md) · [Separator](../components/Separator/README.md) |
| Overlays | [Dialog](../components/Dialog/README.md) · [AlertDialog](../components/AlertDialog/README.md) · [Sheet](../components/Sheet/README.md) |
| Feedback | [Toaster](../components/Toaster/README.md) · [Progress](../components/Progress/README.md) · [Skeleton](../components/Skeleton/README.md) · [EmptyState](../components/EmptyState/README.md) · [ErrorState](../components/ErrorState/README.md) |
| Layout | [Header](../components/Header/README.md) · [Footer](../components/Footer/README.md) |

**Sin spec todavía** (existen en `src/shared/ui/` pero no en el visor): `Command` (buscador de videos y alumnos), `DropdownMenu` (menú de sesión y acciones de fila) e `InputGroup`. Se agregan con el mismo proceso.

## Componentes de producto

Viven en el `ui/` de su feature y se arman con los componentes base y los tokens. Aún no tienen spec propia ni vista previa: esta es su referencia hasta que la tengan. Los que estén en `shared/ui` se marcan.

### Compartidos

| Componente | Anatomía y reglas |
|---|---|
| `PriceTag` | Precio en `font-display text-price-lg text-price` con `formatCop()`. Si hay precio tachado, va antes, en `text-lg text-muted-foreground line-through` con `aria-label`. Si hay ahorro, insignia `cta` «Ahorra X %» |
| `Captcha` | Turnstile `managed`, ancho completo en celular, justo encima del botón de enviar. Tema según la sección |

### Sitio público (`catalog`)

| Componente | Anatomía y reglas |
|---|---|
| `Hero` | Pantalla completa menos la barra (`min-h-[calc(100svh-3.5rem)]`). Foto o video con capa, título `text-hero`, subtítulo `text-lg`, `cta` «Ver planes» y `secondary` «Quiero un plan personalizado»; apilados a todo el ancho en celular. Video `muted`, `loop`, `playsInline`, `poster`; sin autoplay con `prefers-reduced-motion` |
| `About` | Texto en primera persona de Sam (`max-w-prose`), 2 o 3 fotos 4:5 y 3 cifras en `font-display text-display-2` con su etiqueta en `text-sm text-muted-foreground` |
| `HowItWorks` | 3 pasos con número, ícono en círculo `bg-background` de 56 px, título `text-xl` y una línea |
| `SportCards` | Foto 4:5 de borde a borde, nombre en `text-display-3`, una línea, insignia «Básico + Intermedio», `PriceTag` pequeño y `outline` «Ver plan». Toda la tarjeta es el enlace |
| `PackBanner` | Sección `bg-cta text-cta-foreground`: «Llévate los 4 deportes», tachado en blanco al 70 %, precio en blanco y botón `default` sobre oscuro «Comprar pack completo» |
| `Includes` | 2 columnas desde `md`: ícono de 24 px + título + una línea |
| `DirectAccessCta` | Sección oscura: «¿Quieres un plan hecho solo para ti?», explicación y `cta` «Hablar con Sam» |
| `Faq` | `Accordion` de una columna, `max-w-3xl` |
| `PlanHeader` | Foto 3:2 / 21:9 con capa, nombre en `text-display-1`, descripción de 2 o 3 líneas y viñetas «Para quién es» con `Check` |
| `LevelCards` | Dos tarjetas: nivel, fila «4 semanas · 3 días · 50 min» con íconos de 16 px y «Qué logras» |
| `Syllabus` | Lista por categoría (título `text-xl`) con títulos de video y `CirclePlay` en `muted-foreground`. Solo títulos |
| `SampleDayPreview` | Contenido bloqueado ([UX.md](UX.md#contenido-bloqueado)) |
| `EquipmentList` | Insignias `neutral` |
| `BuyBar` | Celular: barra fija abajo con `PriceTag` y `cta` «Comprar». Desde `lg`: tarjeta lateral `sticky top-20`. Debajo, `link` «o llévate el pack completo por $X» |

### Checkout

| Componente | Anatomía y reglas |
|---|---|
| `CheckoutForm` | Tema claro, una columna `max-w-md`: nombre, correo, WhatsApp (opcional), términos, `Captcha` y `cta lg` «Pagar $ X» a todo el ancho. Debajo, `Lock` + «Pago seguro con Wompi» |
| `OrderSummary` | Tarjeta `muted` arriba en celular y a la derecha en `lg`: producto, qué incluye, duración del acceso, crédito en `success` y total en `PriceTag` |
| `PaymentResult` | Un estado por pantalla, centrado, ícono de 48 px: cargando (`LoaderCircle` + «Estamos confirmando tu pago…», `aria-live="polite"`), aprobado (`CircleCheck` + `AccessCodeCard`), pendiente (`TriangleAlert` + «Te enviaremos el código a tu correo apenas se apruebe»), rechazado o expirado (`CircleAlert` + `cta` «Intentar de nuevo») |
| `AccessCodeCard` | Código de acceso ([UX.md](UX.md#código-de-acceso)) |

### Acceso

| Componente | Anatomía y reglas |
|---|---|
| `RedeemForm` | «Entra con tu código», campo de código en `font-mono text-xl tracking-widest uppercase`, `default lg` «Entrar» y enlace «¿Perdiste tu código?». El `Captcha` aparece solo si la API lo pide |
| `RecoverForm` | Correo, `Captcha` y «Enviarme el código». Siempre el mismo mensaje en `success`: «Si el correo tiene compras, te llegará un mensaje en unos minutos» |
| `MagicLinkHandler` | Carga centrada; si el enlace venció, `ErrorState` y el formulario de recuperar |
| `SessionMenu` | `ghost` con el nombre y `ChevronDown`: «Cerrar sesión» y «Cerrar sesión en otros dispositivos» (con `AlertDialog`) |

### Área del alumno (tema oscuro)

| Componente | Anatomía y reglas |
|---|---|
| `CustomPlanBanner` | Primera tarjeta de «Mis planes», a todo el ancho, borde `cta` de 2 px: «Tu plan personalizado» y `default` «Entrenar» |
| `PlanCard` | Foto 16:9, nombre en `text-display-3`, `Progress` con «5 de 24 días», vencimiento en `text-sm text-muted-foreground` y `default` «Entrenar». Por renovar: insignia `warning` «Vence en N días» y `cta` «Renovar» |
| `LockedPlanCard` | Como `PlanCard` con la foto en gris, `Lock`, `PriceTag` y `cta` «Desbloquear». Después de los comprados |
| `UpgradeCard` | «Completa el pack por $ X» con `cta`. Solo si aplica |
| `DirectAccessCard` | `MessageCircle`, «Habla con Sam» y días restantes (insignia `warning` si quedan 3 o menos). `default` «Llenar cuestionario» o «Escribirle a Sam por WhatsApp» (otra pestaña) |
| `LevelTabs` | `Tabs` a todo el ancho: «Básico» e «Intermedio». Los personalizados no muestran pestañas |
| `WeekAccordion` | Una semana por ítem: «Semana 1» + «3 de 5 días». Se abre la primera con días sin completar |
| `DayRoutine` | «Día 1 · Guardia y recto» y «50 min»; bloques con título `text-xl` y su lista de `ExerciseRow`; al final, el botón de día completado ([UX.md](UX.md#día-completado)) |
| `ExerciseRow` | Nombre en `font-medium`, datos en `text-sm text-muted-foreground` separados por «·», notas en `text-sm` itálica y un `outline` de 44 px por video (`Play` + título corto) que abre `VideoModal` |
| `TechniquesGrid` | Posters 16:9 por categoría con título y duración (`text-xs`, `tabular-nums`) |
| `QuestionnaireForm` | Una columna: deportes y equipo con `Checkbox`, nivel con `RadioGroup`, días con `Select` (1 a 7), lesiones con `Textarea` y «Solo Sam ve esta información». `default lg` «Enviar cuestionario» |

### Reproductor

| Componente | Anatomía y reglas |
|---|---|
| `VideoPlayer` | 16:9 `bg-negro rounded-lg overflow-hidden`, `poster`, `playsInline`. Antes de reproducir, botón ▶ centrado de 64 px (`rounded-full bg-negro/60`) con `aria-label="Reproducir {título}"`. Cargando: `Skeleton` 16:9. Error: `ErrorState` en el mismo contenedor |
| `Watermark` | Correo del alumno en `font-mono text-xs` (`md:text-sm`), `text-blanco/30`, `pointer-events-none select-none`, `aria-hidden`. Cambia de posición cada 30 s; sin animación con `prefers-reduced-motion` |
| `VideoModal` | `Dialog` con título, `VideoPlayer` y descripción. En celular ocupa todo el ancho |

### Panel de admin (tema claro)

| Componente | Anatomía y reglas |
|---|---|
| `AdminShell` | Desde `lg`: barra lateral oscura de 240 px. Por debajo: barra superior con el título y navegación inferior de 5 destinos de 44 px (Inicio, Ventas, Alumnos, Videos, Más en un `Sheet`). Ícono + etiqueta siempre; el activo en `primary` |
| `LoginForm` · `OtpForm` | Centrados `max-w-sm`. OTP de 6 dígitos con `inputMode="numeric"` y `autoComplete="one-time-code"` |
| `KpiTiles` | Ventas de hoy, semana y mes en `font-display text-display-2 tabular-nums`; el monto en `text-price` (único rojo del inicio) y la cantidad en `text-sm text-muted-foreground` |
| Listas del panel | `RecentPayments`, `OrdersTable`, `KeySearch`, `DirectAccessList`, `CustomPlansList`, `VideosTable`, `ProductsTable`: tabla desde `md`, tarjetas en celular; filtros en una fila con scroll horizontal en celular |
| `OrderDetail` · `KeyDetail` | Referencia o código en `font-mono` e insignia de estado; datos en `dl` de dos columnas desde `md`; acciones abajo, las irreversibles con `AlertDialog` |
| `CustomPlanForm` | Buscador de alumno (`Command`), precio y crédito en `success`. Al crear el link: `cta` «Copiar link de pago» y `outline` «Enviar por WhatsApp» |
| `VideoForm` · `UploadProgress` | ID en `font-mono` validado con el formato `BOX-GOL-001`. `Progress` con porcentaje y «No cierres esta pestaña»; si falla, «Reanudar» |
| `PlanTree` | Nivel → semana → día como `Accordion` anidado; en celular, tocar un día abre `DayEditor` a pantalla completa |
| `DayEditor` · `ExerciseEditor` | Editor de rutinas ([UX.md](UX.md#editor-de-rutinas-en-el-celular)) |
| `ImportRoutineDialog` | `Textarea` con la rutina y vista previa a la derecha (abajo en celular). IDs desconocidos marcados con `danger` |
