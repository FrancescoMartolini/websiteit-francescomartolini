/* Unico script del sito: menu a scomparsa su mobile e voce attiva nel menu.
   Senza JavaScript il menu resta sempre visibile. */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
});


/* ---------- Schema delle aree: evidenziazione e trascinamento ----------
   Ogni nodo resta un normale link (clic, tocco, tastiera).
   Su desktop si può anche trascinare un'area verso il centro per aprirla. */
document.addEventListener("DOMContentLoaded", function () {
  var schema = document.querySelector(".schema");
  if (!schema) return;


  // Evidenzia la linea del nodo in hover o focus
  schema.querySelectorAll(".node").forEach(function (n) {
    var line = schema.querySelector('[data-line="' + n.dataset.node + '"]');
    if (!line) return;
    function on() { line.classList.add("is-on"); }
    function off() { line.classList.remove("is-on"); }
    n.addEventListener("pointerenter", on);
    n.addEventListener("pointerleave", off);
    n.addEventListener("focus", on);
    n.addEventListener("blur", off);
  });

  if (!window.PointerEvent) return;

  function nearCenter(node) {
    var s = schema.getBoundingClientRect();
    var r = node.querySelector(".dot").getBoundingClientRect();
    var dx = r.left + r.width / 2 - (s.left + s.width / 2);
    var dy = r.top + r.height / 2 - (s.top + s.height / 2);
    return Math.hypot(dx, dy) < s.width * 0.14;
  }

  function open(node) {
    var href = node.getAttribute("href");
    if (node.target === "_blank") {
      window.open(href, "_blank", "noopener");
    } else {
      window.location.href = href;
    }
  }

  schema.querySelectorAll(".node-main").forEach(function (node) {
    var pid = null, sx = 0, sy = 0, dragging = false, blockClick = false;

    node.addEventListener("dragstart", function (e) { e.preventDefault(); });

    node.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch" || e.button !== 0) return; // sul touch resta il tocco
      pid = e.pointerId; sx = e.clientX; sy = e.clientY; dragging = false;
    });

    node.addEventListener("pointermove", function (e) {
      if (e.pointerId !== pid) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!dragging && Math.hypot(dx, dy) > 8) {
        dragging = true;
        node.setPointerCapture(pid);
        node.classList.add("is-dragging");
        schema.classList.add("is-dragging");
        var ln = schema.querySelector('[data-line="' + node.dataset.node + '"]');
        if (ln) ln.classList.add("is-hidden");
      }
      if (dragging) {
        node.style.setProperty("--dx", dx + "px");
        node.style.setProperty("--dy", dy + "px");
        schema.classList.toggle("is-ready", nearCenter(node));
      }
    });

    function end(e, cancelled) {
      if (e.pointerId !== pid) return;
      pid = null;
      if (!dragging) return;
      var ok = !cancelled && nearCenter(node);
      dragging = false;
      blockClick = true;
      setTimeout(function () { blockClick = false; }, 0);
      node.classList.remove("is-dragging");
      schema.classList.remove("is-dragging", "is-ready");
      var ln2 = schema.querySelector('[data-line="' + node.dataset.node + '"]');
      if (ln2) ln2.classList.remove("is-hidden");
      node.style.removeProperty("--dx");
      node.style.removeProperty("--dy");
      if (ok) open(node);
    }
    node.addEventListener("pointerup", function (e) { end(e, false); });
    node.addEventListener("pointercancel", function (e) { end(e, true); });

    node.addEventListener("click", function (e) {
      if (blockClick) e.preventDefault();
    });
  });
});


/* ---------- Pagina Progetti: filtri Tutti / Web / IT ---------- */
document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".projects-grid");
  var buttons = document.querySelectorAll(".filters button");
  if (!grid || !buttons.length) return;

  function apply(f) {
    grid.setAttribute("data-filter", f);
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filter === f));
    });
  }
  function fromHash() {
    var h = location.hash.slice(1);
    return h === "web" || h === "it" ? h : "all";
  }
  apply(fromHash());
  window.addEventListener("hashchange", function () { apply(fromHash()); });
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.filter);
      if (history.replaceState) {
        history.replaceState(null, "", b.dataset.filter === "all" ? location.pathname : "#" + b.dataset.filter);
      }
    });
  });
});
