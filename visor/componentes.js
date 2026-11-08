// Comportamiento de las páginas del visor (sin dependencias; se abre desde disco).
// Reproduce lo que en nexora-fit resuelven Radix y sonner, solo para inspeccionar estados.
(function () {
  'use strict';
  // Tema: ?tema=dark pone class="dark" en <html>, como el contenedor .dark de nexora-fit.
  try {
    if (new URLSearchParams(location.search).get('tema') === 'dark') document.documentElement.classList.add('dark');
  } catch (e) { /* sin parámetros: tema claro */ }

  // Íconos Lucide (ISC) usados en las vistas previas. <i data-icon="check"></i> → <svg>.
  var ICONS = {
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m18 15-6-6-6 6"/>',
    'menu': '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',
    'circle': '<circle cx="12" cy="12" r="10"/>',
    'circle-alert': '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'triangle-alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'octagon-x': '<path d="m15 9-6 6"/><path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/><path d="m9 9 6 6"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'loader-circle': '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
    'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'play': '<polygon points="6 3 20 12 6 21 6 3"/>',
    'circle-play': '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
    'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    'clipboard-list': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    'credit-card': '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    'external-link': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };
  function icon(el) {
    var name = el.getAttribute('data-icon'), svg = ICONS[name];
    if (!svg) { console.warn('ícono desconocido: ' + name); return; }
    var size = el.getAttribute('data-size') || '';
    var out = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    out.setAttribute('viewBox', '0 0 24 24');
    out.setAttribute('aria-hidden', 'true');
    out.setAttribute('class', ('nx-i ' + (el.className || '')).trim());
    if (size) out.setAttribute('data-size', size);
    out.innerHTML = svg;
    el.replaceWith(out);
  }

  // Tabs: clic y flechas, como Radix (activación automática).
  function tabs(list) {
    var items = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      items.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    items.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (e.key === 'Home') n = -i; else if (e.key === 'End') n = items.length - 1 - i;
        if (n === undefined) return;
        e.preventDefault();
        select(items[(i + n + items.length) % items.length], true);
      });
    });
  }

  // Accordion: data-type="single" cierra los demás ítems al abrir uno.
  function accordion(root) {
    root.querySelectorAll('.nx-acc-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        if (open && root.getAttribute('data-type') === 'single') {
          root.querySelectorAll('.nx-acc-trigger[aria-expanded="true"]').forEach(function (o) { toggle(o, false); });
        }
        toggle(btn, open);
      });
    });
    function toggle(btn, open) {
      btn.setAttribute('aria-expanded', String(open));
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = !open;
    }
  }

  // Avisos (sonner): 4 s; con acción («Deshacer») 5 s. role="status" en una región aria-live.
  function toaster() {
    var region = document.querySelector('.nx-toaster');
    if (!region) {
      region = document.createElement('ol');
      region.className = 'nx-toaster';
      region.setAttribute('aria-label', 'Notificaciones');
      region.setAttribute('aria-live', 'polite');
      document.body.append(region);
    }
    return region;
  }
  var TOAST_ICONS = { success: 'circle-check', info: 'info', warning: 'triangle-alert', error: 'octagon-x', loading: 'loader-circle' };
  function toast(opts) {
    var li = document.createElement('li');
    li.className = 'nx-toast';
    li.setAttribute('role', 'status');
    if (TOAST_ICONS[opts.type]) {
      var i = document.createElement('i');
      i.setAttribute('data-icon', TOAST_ICONS[opts.type]);
      if (opts.type === 'loading') i.className = 'nx-spin';
      li.append(i);
    }
    var body = document.createElement('div'), title = document.createElement('div');
    body.className = 'nx-toast-body'; title.className = 'nx-toast-title'; title.textContent = opts.title;
    body.append(title);
    if (opts.description) { var d = document.createElement('div'); d.className = 'nx-toast-description'; d.textContent = opts.description; body.append(d); }
    li.append(body);
    if (opts.action) {
      var a = document.createElement('button');
      a.type = 'button'; a.className = 'nx-toast-action'; a.textContent = opts.action;
      a.addEventListener('click', function () { li.remove(); });
      li.append(a);
    }
    toaster().append(li);
    li.querySelectorAll('[data-icon]').forEach(icon);
    setTimeout(function () { li.remove(); }, opts.action ? 5000 : 4000);
  }

  // Botón con estado de carga: deshabilitado, LoaderCircle a la izquierda y texto en gerundio.
  function loading(btn) {
    btn.addEventListener('click', function () {
      var html = btn.innerHTML;
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.innerHTML = '<i data-icon="loader-circle" class="nx-spin"></i>' + btn.getAttribute('data-loading');
      btn.querySelectorAll('[data-icon]').forEach(icon);
      setTimeout(function () { btn.innerHTML = html; btn.disabled = false; btn.removeAttribute('aria-busy'); }, 1600);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-icon]').forEach(icon);
    document.querySelectorAll('[role="tablist"]').forEach(tabs);
    document.querySelectorAll('.nx-accordion').forEach(accordion);
    document.querySelectorAll('.nx-progress[data-value]').forEach(function (p) {
      var v = Number(p.getAttribute('data-value')) || 0;
      p.setAttribute('role', 'progressbar'); p.setAttribute('aria-valuemin', '0'); p.setAttribute('aria-valuemax', '100'); p.setAttribute('aria-valuenow', String(v));
      p.querySelector('.nx-progress-indicator').style.transform = 'translateX(-' + (100 - v) + '%)';
    });
    // Diálogos y Sheet con <dialog> nativo: atrapa el foco, cierra con Esc y lo devuelve al disparador.
    document.querySelectorAll('[data-open]').forEach(function (b) {
      b.addEventListener('click', function () { document.getElementById(b.getAttribute('data-open')).showModal(); });
    });
    document.querySelectorAll('[data-close]').forEach(function (b) {
      b.addEventListener('click', function () { b.closest('dialog').close(); });
    });
    // Clic en el fondo: cierra Dialog y Sheet; AlertDialog no (obliga a elegir).
    document.querySelectorAll('dialog[data-dismissable]').forEach(function (d) {
      d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    });
    document.querySelectorAll('[data-toast]').forEach(function (b) {
      b.addEventListener('click', function () {
        toast({ type: b.getAttribute('data-toast'), title: b.getAttribute('data-title'), description: b.getAttribute('data-description'), action: b.getAttribute('data-action') });
      });
    });
    document.querySelectorAll('[data-loading]').forEach(loading);
    // Header: sombra sutil al hacer scroll.
    document.querySelectorAll('.nx-header[data-scroll]').forEach(function (h) {
      function on() { h.classList.toggle('is-scrolled', window.scrollY > 8); }
      window.addEventListener('scroll', on, { passive: true }); on();
    });
  });
})();
