# Input

Campo de texto de una línea: 44 px de alto, texto a 16 px siempre, borde `input`, `rounded-lg`.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/input.tsx` · [vista previa](../../visor/c/Input.html)
- **Props:** las de `<input>`. Atributos según el dato: correo `type="email" autoComplete="email"`; nombre `autoComplete="name"`; WhatsApp `type="tel" inputMode="tel"`; código `autoComplete="off" autoCapitalize="characters" spellCheck={false}`; OTP `inputMode="numeric" autoComplete="one-time-code"`.
- **Estados:** foco (borde `ring` + anillo al 50 %), error (`aria-invalid="true"`: borde y anillo `destructive`), deshabilitado (50 %, fondo `input/50`). En oscuro el fondo es `input/30`.
- Etiqueta arriba (`Label`), ayuda debajo en `text-sm text-muted-foreground` y, si hay error, un mensaje con `CircleAlert` en `danger` y `role="alert"`, asociado con `aria-describedby`. El texto sale de `error-messages.ts` o del esquema de Zod.
- Código de acceso: `font-mono text-xl tracking-widest uppercase`; el `placeholder` muestra el formato (`NXF-XXXX-XXXX`).
- **No:** texto de menos de 16 px (Safari en iPhone hace zoom), error marcado solo con color, `placeholder` en lugar de etiqueta, borrar lo escrito al fallar.
