/* Abtin Shahidi — site interactions
   Hero "living catalog": a point field that reads as a galaxy catalog and a
   statistical embedding at once, with faint graph edges (identity-graph nod). */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- stat counters ---------- */
  var stats = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    if (reduce) { el.textContent = target.toFixed(dec) + suffix; return; }
    var start = performance.now(), dur = 1400;
    function step(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if (t < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec) + suffix;
    }
    requestAnimationFrame(step);
  }
  if (stats.length && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); so.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    stats.forEach(function (el) { so.observe(el); });
    // safety net: ensure counters never stay at 0 once they've been on screen
    setTimeout(function () {
      stats.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { animateCount(el); so.unobserve(el); }
      });
    }, 2600);
  } else {
    stats.forEach(function (el) { animateCount(el); });
  }

  /* ---------- hero living catalog ---------- */
  var canvas = document.getElementById("catalog");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, pts = [], edges = [], t = 0, raf = null;
  var palette = [
    { c: "244,183,64", w: 3 },   // gold
    { c: "84,200,214", w: 3 },   // cyan
    { c: "166,132,240", w: 2 },  // violet
    { c: "233,238,249", w: 4 }   // starlight
  ];
  // soft cluster centres (an "embedding" look), in normalized coords
  var clusters = [
    { x: 0.30, y: 0.34, r: 0.20, n: 46 },
    { x: 0.68, y: 0.30, r: 0.16, n: 34 },
    { x: 0.55, y: 0.70, r: 0.22, n: 50 },
    { x: 0.20, y: 0.74, r: 0.14, n: 24 }
  ];

  function gauss() { // Box-Muller
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function build() {
    pts = [];
    clusters.forEach(function (cl, ci) {
      for (var i = 0; i < cl.n; i++) {
        var pal = palette[Math.floor(Math.random() * palette.length)];
        // brightness weighting: most dim, few bright (stellar luminosity function feel)
        var bright = Math.random();
        bright = bright * bright;
        pts.push({
          cx: cl.x + gauss() * cl.r * 0.5,
          cy: cl.y + gauss() * cl.r * 0.5,
          r: (0.5 + pal.w * (0.4 + bright)) * (DPR * 0.9),
          col: pal.c,
          base: 0.35 + bright * 0.6,
          tw: Math.random() * Math.PI * 2,       // twinkle phase
          tws: 0.6 + Math.random() * 1.4,        // twinkle speed
          dx: (Math.random() - 0.5) * 0.00018,   // slow drift
          dy: (Math.random() - 0.5) * 0.00018,
          depth: 0.4 + Math.random() * 0.6,      // parallax depth
          cluster: ci
        });
      }
    });
    // edges: nearest-neighbour links within one cluster (graph nod), sparse
    edges = [];
    var cl0 = pts.filter(function (p) { return p.cluster === 2; });
    cl0.forEach(function (p, i) {
      var best = null, bd = 1e9;
      cl0.forEach(function (q, j) {
        if (i === j) return;
        var d = (p.cx - q.cx) * (p.cx - q.cx) + (p.cy - q.cy) * (p.cy - q.cy);
        if (d < bd) { bd = d; best = q; }
      });
      if (best && Math.random() < 0.5) edges.push([p, best]);
    });
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = canvas.width = Math.max(1, Math.floor(rect.width * DPR));
    H = canvas.height = Math.max(1, Math.floor(rect.height * DPR));
  }

  var mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
  var hostVisual = canvas.closest(".hero__visual");
  if (hostVisual && !reduce) {
    hostVisual.addEventListener("pointermove", function (e) {
      var r = hostVisual.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width;
      tmy = (e.clientY - r.top) / r.height;
    });
    hostVisual.addEventListener("pointerleave", function () { tmx = 0.5; tmy = 0.5; });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    var px = (mx - 0.5), py = (my - 0.5);

    // edges
    ctx.lineWidth = DPR * 0.6;
    edges.forEach(function (e) {
      var a = e[0], b = e[1];
      var ax = (a.cx + px * 0.04 * a.depth) * W, ay = (a.cy + py * 0.04 * a.depth) * H;
      var bx = (b.cx + px * 0.04 * b.depth) * W, by = (b.cy + py * 0.04 * b.depth) * H;
      var pulse = 0.10 + 0.06 * Math.sin(t * 0.6 + a.tw);
      ctx.strokeStyle = "rgba(84,200,214," + pulse + ")";
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    });

    // points
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.cx += p.dx; p.cy += p.dy;
      // gentle wrap within frame
      if (p.cx < 0.04 || p.cx > 0.96) p.dx *= -1;
      if (p.cy < 0.04 || p.cy > 0.96) p.dy *= -1;
      var x = (p.cx + px * 0.06 * p.depth) * W;
      var y = (p.cy + py * 0.06 * p.depth) * H;
      var tw = reduce ? 1 : (0.72 + 0.28 * Math.sin(t * p.tws + p.tw));
      var a = p.base * tw;
      // glow for bright points
      if (p.r > DPR * 2.2) {
        var g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 4);
        g.addColorStop(0, "rgba(" + p.col + "," + (a * 0.5) + ")");
        g.addColorStop(1, "rgba(" + p.col + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, p.r * 4, 0, 6.2832); ctx.fill();
      }
      ctx.fillStyle = "rgba(" + p.col + "," + a + ")";
      ctx.beginPath(); ctx.arc(x, y, p.r, 0, 6.2832); ctx.fill();
    }
    t += 0.016;
    raf = requestAnimationFrame(draw);
  }

  function start() {
    resize(); build();
    if (reduce) { draw(); return; }  // one static frame
    if (raf) cancelAnimationFrame(raf);
    draw();
  }
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt); rt = setTimeout(function () { resize(); build(); if (reduce) draw(); }, 180);
  });
  // pause when off-screen
  if ("IntersectionObserver" in window && !reduce) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { if (!raf) draw(); }
        else { if (raf) { cancelAnimationFrame(raf); raf = null; } }
      });
    }, { threshold: 0.05 }).observe(canvas);
  }
  start();
})();
