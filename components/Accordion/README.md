# Accordion

Secciones plegables (Radix `Accordion`): preguntas frecuentes y semanas del plan.

- **Estado:** Shipped · `nexora-fit/src/shared/ui/accordion.tsx` · [vista previa](../../visor/c/Accordion.html)
- **Partes:** `Accordion` (`type` `single` · `multiple`, `collapsible`, `defaultValue`), `AccordionItem` (borde inferior salvo el último), `AccordionTrigger`, `AccordionContent` (animación de altura de 200 ms).
- Disparador de 56 px de alto como mínimo, texto 14 px peso 500, subrayado en hover y un solo `ChevronDown` en `muted-foreground` que gira 180°.
- FAQ: una sola columna, `max-w-3xl`. Semanas: «Semana 1» + «3 de 5 días» a la derecha; se abre la primera semana con días sin completar.
- **No:** dos íconos intercambiados, contenido crítico escondido por defecto, acordeones anidados en celular salvo `PlanTree` del panel.
