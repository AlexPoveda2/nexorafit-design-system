// Páginas de fundamentos del visor: pintan window.NX_TOKENS (visor/tokens.js, generado desde
// tokens.json). Las muestras usan las variables de visor/tokens.css, así reflejan el tema activo.
(function () {
  'use strict';
  var T = window.NX_TOKENS;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  // `código` en los textos de uso → <code>.
  var md = function (s) { return esc(s).replace(/`([^`]+)`/g, '<code class="pv-code">$1</code>'); };
  var src = function (s) { return '<span class="nx-badge" data-variant="' + (s === 'nexora' ? 'outline' : 'neutral') + '">' + (s === 'nexora' ? 'Nexora' : 'Tailwind') + '</span>'; };

  function resolve(value, theme) {
    var v = String(value), m = /^\{([\w-]+)\}$/.exec(v);
    if (v.charAt(0) === '#') return v;
    if (m) return T.palette.tokens.filter(function (t) { return t.name === m[1]; })[0].value;
    var s = T.color.tokens.filter(function (t) { return t.name === v; })[0];
    return resolve(s.value[theme || 'light'], theme);
  }
  function ratio(a, b) {
    function lum(hex) {
      var n = hex.replace('#', '');
      var c = [0, 2, 4].map(function (i) { var x = parseInt(n.slice(i, i + 2), 16) / 255; return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    }
    var l = [lum(a), lum(b)].sort(function (x, y) { return y - x; });
    return (l[0] + 0.05) / (l[1] + 0.05);
  }
  function swatch(hex, label) {
    return '<span style="display:inline-flex;align-items:center;gap:8px"><span aria-hidden="true" style="width:28px;height:28px;border-radius:var(--radius-sm);border:1px solid var(--input);background:' + esc(hex) + '"></span><span class="pv-code">' + esc(label) + '</span></span>';
  }
  function section(title, html, note) {
    return '<section class="pv"><h2 class="pv-t">' + esc(title) + '</h2>' + (note ? '<p class="pv-note" style="margin-bottom:12px">' + note + '</p>' : '') + html + '</section>';
  }
  function table(head, rows) {
    return '<div class="pv-scroll"><table class="pv-table"><thead><tr>' + head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }

  var pages = {
    colores: function () {
      var palette = '<div class="pv-grid">' + T.palette.tokens.map(function (t) {
        return '<figure class="nx-card" data-size="sm" style="padding-top:0"><div aria-hidden="true" style="height:72px;background:' + esc(t.value) + ';border-bottom:1px solid var(--border)"></div>' +
          '<figcaption class="nx-card-header"><div class="nx-card-title">' + esc(t.name) + ' <span class="pv-code" style="color:var(--muted-foreground)">' + esc(t.value) + '</span></div>' +
          '<div class="pv-code">--color-' + esc(t.name) + '</div><div class="nx-card-description">' + md(t.usage) + '</div></figcaption></figure>';
      }).join('') + '</div>';
      var groups = [];
      T.color.tokens.forEach(function (t) { if (groups.indexOf(t.group) < 0) groups.push(t.group); });
      var semantic = groups.map(function (g) {
        return '<h3 class="pv-note" style="margin:16px 0 4px;font-weight:600">' + esc(g) + '</h3>' + table(['Token', 'Claro', 'Oscuro', 'Uso'], T.color.tokens.filter(function (t) { return t.group === g; }).map(function (t) {
          return ['<span class="pv-code">--' + esc(t.name) + '</span>', swatch(resolve(t.value.light, 'light'), t.value.light.replace(/[{}]/g, '')), swatch(resolve(t.value.dark, 'dark'), t.value.dark.replace(/[{}]/g, '')), md(t.usage)];
        }));
      }).join('');
      var contrast = table(['Texto / borde', 'Fondo', 'Tema', 'Contraste', 'Mínimo', 'Resultado', 'Uso'], T.color.contrast.map(function (c) {
        var theme = c.theme || 'light', fg = resolve(c.fg, theme), bg = resolve(c.bg, theme), r = ratio(fg, bg), ok = r >= c.min;
        return [swatch(fg, c.fg.replace(/[{}]/g, '')), swatch(bg, c.bg.replace(/[{}]/g, '')), c.theme ? (theme === 'dark' ? 'Oscuro' : 'Claro') : '—',
          '<span class="nx-num">' + r.toFixed(2).replace('.', ',') + ':1</span>', '<span class="nx-num">' + String(c.min).replace('.', ',') + ':1</span>',
          '<span class="nx-badge" data-variant="' + (ok ? 'success' : 'danger') + '">' + (ok ? 'Cumple' : 'No cumple') + '</span>', md(c.usage)];
      }));
      var sample = function (dark) {
        // La muestra clara fija los valores claros en línea: dentro de un .dark heredaría los oscuros.
        var light = dark ? '' : T.color.tokens.map(function (t) { return '--' + t.name + ':' + resolve(t.value.light, 'light'); }).join(';') + ';';
        return '<div class="pv-band' + (dark ? ' dark' : '') + '" style="' + light + 'display:grid;gap:12px"><p style="font-family:var(--font-display);font-size:var(--text-display-3);line-height:1.1">Plan de boxeo</p>' +
          '<p style="color:var(--muted-foreground)">4 semanas · 3 días · 50 min</p><p style="font-family:var(--font-display);font-size:var(--text-display-3)" class="nx-price">$ 160.000</p>' +
          '<div class="pv-row"><button class="nx-btn" data-variant="cta" type="button">Comprar plan</button><button class="nx-btn" data-variant="outline" type="button">Ver detalle</button></div></div>';
      };
      return section('Los dos temas en contexto', '<div class="pv-grid">' + sample(false) + sample(true) + '</div>', 'Mismos tokens semánticos, distinto valor: <code class="pv-code">class="dark"</code> en el contenedor. El rojo solo en lo que vende.') +
        section('Paleta de marca', palette, 'Solo la usan los tokens semánticos y casos puntuales documentados. Los componentes usan los semánticos.') +
        section('Tokens semánticos', semantic) +
        section('Contraste (WCAG 2.2 AA)', contrast, 'Calculado aquí con la fórmula de luminancia relativa. <code class="pv-code">npm run verify</code> hace la misma comprobación.');
    },
    tipografia: function () {
      var fams = T.type.families.map(function (f) {
        return '<div class="nx-card" data-size="sm"><div class="nx-card-header"><div class="nx-card-title">' + esc(f.family || 'Monoespaciada del sistema') + ' · <span class="pv-code">font-' + esc(f.name) + '</span></div><div class="nx-card-description">' + md(f.usage) + '</div></div>' +
          '<div class="nx-card-content" style="font-family:var(--font-' + esc(f.name) + ');font-size:' + (f.name === 'display' ? '40px;line-height:1' : '18px') + '">' + (f.name === 'mono' ? 'NXF-7KQ4-P9DM · BOX-GOL-001' : 'Entrena conmigo ¿listo? ñ á é') + '</div></div>';
      }).join('');
      var scale = T.type.scale.map(function (t) {
        var fam = t.family === 'display' ? 'var(--font-display)' : 'var(--font-sans)';
        return '<div style="display:grid;gap:4px;padding:16px 0;border-bottom:1px solid var(--border)">' +
          '<div class="pv-row" style="gap:8px"><span class="pv-code">text-' + esc(t.name) + '</span>' + src(t.source) + '<span class="pv-note">' + esc(t.range) + ' · interlineado ' + esc(t.lineHeight) + (t.weight ? ' · peso ' + t.weight : '') + '</span></div>' +
          '<div style="font-family:' + fam + ';font-size:var(--text-' + esc(t.name) + ');line-height:var(--text-' + esc(t.name) + '--line-height);font-weight:' + (t.weight || 400) + ';letter-spacing:' + (t.family === 'display' ? '0.01em' : 'normal') + ';overflow-wrap:anywhere">' +
          (t.name === 'price-lg' ? '<span class="nx-price">$ 640.000</span>' : t.family === 'display' ? 'Entrena conmigo' : 'Revisa tu correo: te enviamos tu código de acceso.') + '</div>' +
          '<p class="pv-note">' + md(t.usage) + '</p></div>';
      }).join('');
      return section('Familias', '<div class="pv-grid">' + fams + '</div>', 'Bebas Neue e Inter (OFL) se cargan aquí desde copias locales; nexora-fit las carga con <code class="pv-code">next/font/google</code>.') +
        section('Escala', scale, 'Los tamaños display usan <code class="pv-code">clamp()</code>: cambia el ancho del visor (360 / 768 / escritorio) para verlos crecer. Los de Tailwind son sus valores por defecto.') +
        section('Reglas', '<ul style="display:grid;gap:6px;padding-left:20px"><li>Bebas Neue: un solo peso; nunca <code class="pv-code">font-bold</code>; mínimo 24 px; nunca en párrafos, botones, campos ni tablas.</li><li>El texto se escribe en minúsculas normales; la fuente lo muestra en mayúsculas.</li><li>Campos de formulario a 16 px siempre.</li><li>Números en tablas y contadores con <code class="pv-code">tabular-nums</code>.</li><li>Ancho máximo de párrafo: <code class="pv-code">max-w-prose</code> (unos 65 caracteres).</li></ul>');
    },
    espaciado: function () {
      var bars = T.spacing.tokens.map(function (t) {
        return ['<span class="pv-code">' + esc(t.name) + '</span>', '<span class="nx-num">' + t.px + ' px</span>', '<span aria-hidden="true" style="display:block;height:12px;width:var(--space-' + esc(t.name) + ');background:var(--primary);border-radius:2px"></span>', md(t.usage)];
      });
      var bp = T.breakpoints.tokens.map(function (t) { return ['<span class="pv-code">' + esc(t.name) + '</span>', '<span class="nx-num">' + t.px + ' px</span>', md(t.usage)]; });
      var sizes = T.size.tokens.map(function (t) { return ['<span class="pv-code">' + esc(t.name) + '</span>', '<span class="nx-num">' + t.px + ' px</span>', md(t.usage)]; });
      var z = T.zIndex.tokens.map(function (t) { return ['<span class="pv-code">' + esc(t.name) + '</span>', '<span class="nx-num">' + esc(t.value) + '</span>', md(t.usage)]; });
      return section('Espaciado', table(['Paso', 'Valor', 'Muestra', 'Uso'], bars), 'Escala de Tailwind (múltiplos de 4 px). Se prefieren estos pasos para mantener el ritmo.') +
        section('Breakpoints', table(['Nombre', 'Desde', 'Uso'], bp), 'Mobile-first: se diseña a 360 px y se revisa en 360, 768 y 1280 px.') +
        section('Tamaños', table(['Token', 'Valor', 'Uso'], sizes)) +
        section('Capas (z-index)', table(['Token', 'Valor', 'Uso'], z));
    },
    radios: function () {
      var items = [{ name: 'radius', px: 8, usage: 'Base de shadcn (`--radius`).' }].concat(T.radius.tokens).map(function (t) {
        var v = t.name === 'radius' ? 'var(--radius)' : 'var(--radius-' + t.name + ')';
        return '<div class="pv-cell"><div aria-hidden="true" style="width:96px;height:72px;border:1px solid var(--input);background:var(--muted);border-radius:' + v + '"></div><span class="pv-code">' + (t.name === 'radius' ? '--radius' : 'rounded-' + esc(t.name)) + '</span>' +
          '<span class="pv-note">' + (t.px == null ? 'círculo' : t.px + ' px') + '</span><span class="pv-note">' + md(t.usage) + '</span></div>';
      }).join('');
      return section('Radios', '<div class="pv-grid">' + items + '</div>', 'El hero y las fotos de borde a borde no llevan radio. Borde de 1 px; 2 px solo en el foco y en la tarjeta seleccionada.');
    },
    sombras: function () {
      var card = function (t, dark) {
        return '<div class="pv-band' + (dark ? ' dark' : '') + '"><div style="height:96px;border-radius:var(--radius-lg);background:var(--card);border:1px solid var(--border);box-shadow:var(--shadow-' + esc(t.name) + ');display:grid;place-items:center"><span class="pv-code">shadow-' + esc(t.name) + '</span></div></div>';
      };
      var rows = T.shadow.tokens.map(function (t) {
        return '<div style="display:grid;gap:8px;margin-bottom:16px"><div class="pv-grid">' + card(t, false) + card(t, true) + '</div><p class="pv-note">' + md(t.usage) + '</p></div>';
      }).join('');
      var flat = '<div class="pv-grid"><div class="nx-card"><div class="nx-card-header"><div class="nx-card-title">Tarjeta</div><div class="nx-card-description">Se separa con <code class="pv-code">border</code>, sin sombra.</div></div></div>' +
        '<div class="pv-cell"><button class="nx-btn is-focus" data-variant="outline" type="button">Foco visible</button><span class="pv-note">Foco de los controles: borde <code class="pv-code">ring</code> y anillo de 3 px al 50 %.</span></div></div>';
      return section('La marca es plana', flat, 'Solo llevan sombra los elementos que flotan. En el tema oscuro se usa <code class="pv-code">border-border</code>.') + section('Sombras', rows);
    },
    movimiento: function () {
      var durations = T.motion.tokens.filter(function (t) { return /^duration/.test(t.name); });
      var easings = T.motion.tokens.filter(function (t) { return /^ease/.test(t.name); });
      var bar = function (prop, v) {
        return '<div class="pv-track" style="position:relative;height:28px;border-radius:var(--radius-md);background:var(--muted)"><span class="pv-dot" style="position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:9999px;background:var(--primary);transition:left ' + (prop === 'd' ? v + ' var(--ease-out)' : '600ms ' + v) + '"></span></div>';
      };
      var rows = durations.map(function (t) { return ['<span class="pv-code">' + esc(t.name) + '</span>', '<span class="nx-num">' + esc(t.value) + '</span>', bar('d', 'var(--' + t.name + ')'), md(t.usage)]; })
        .concat(easings.map(function (t) { return ['<span class="pv-code">' + esc(t.name) + '</span>', '<span class="pv-code">' + esc(t.value) + '</span>', bar('e', 'var(--' + t.name + ')'), md(t.usage)]; }));
      return section('Duraciones y curvas', '<button class="nx-btn" data-variant="outline" type="button" id="play" style="margin-bottom:12px">Reproducir</button>' + table(['Token', 'Valor', 'Muestra', 'Uso'], rows), 'Las curvas se muestran a 600 ms para que se note la diferencia.') +
        section('Reglas', '<ul style="display:grid;gap:6px;padding-left:20px"><li><code class="pv-code">prefers-reduced-motion</code> (siempre): sin desplazamientos (<code class="pv-code">motion-reduce:transition-none</code>), el video del hero se queda en el <code class="pv-code">poster</code> y la marca de agua cambia de lugar sin animación.</li><li>Nada se mueve por adorno: sin parallax, sin contadores animados y sin carruseles automáticos.</li></ul>');
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-fundamento'), root = document.getElementById('root');
    if (!T || !pages[page]) { root.textContent = 'No se encontraron los tokens (visor/tokens.js).'; return; }
    root.innerHTML = pages[page]();
    var play = document.getElementById('play');
    if (play) play.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.querySelectorAll('.pv-dot').forEach(function (d) {
        if (reduce) d.style.transition = 'none';
        d.style.left = d.style.left === 'calc(100% - 24px)' ? '4px' : 'calc(100% - 24px)';
      });
    });
  });
})();
