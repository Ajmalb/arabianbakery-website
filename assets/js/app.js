/* Arabian Bakery — site behaviour (no dependencies) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const S = BAKERY.store;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = Object.fromEntries(BAKERY.products.map((p) => [p.id, p]));
  const catIcon = Object.fromEntries(BAKERY.categories.map((c) => [c.id, c.icon]));
  const artFor = (p) => BAKERY.tileArt[p.id] || catIcon[p.category] || "🧁";

  // For the "Everything" view, alternate categories so the grid isn't six cakes in a row
  const mixedOrder = (() => {
    const groups = BAKERY.categories.filter((c) => c.id !== "all")
      .map((c) => BAKERY.products.filter((p) => p.category === c.id));
    const out = [];
    for (let i = 0; out.length < BAKERY.products.length; i++) groups.forEach((g) => g[i] && out.push(g[i]));
    return out;
  })();

  const waLink = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}`;
  const openWhatsApp = (text) => {
    const win = window.open(waLink(text), "_blank", "noopener");
    if (!win) location.href = waLink(text);
  };

  /* ---------- Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- Header ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Highlight the nav link for the section in view
  const navLinks = $$(".main-nav a");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["about", "menu", "cakes", "gallery", "visit"].forEach((id) => { const el = document.getElementById(id); if (el) sectionObs.observe(el); });

  /* ---------- Mobile nav ---------- */
  const mobileNav = $("#mobile-nav");
  const menuToggle = $("#menu-toggle");
  function setMobileNav(open) {
    mobileNav.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  menuToggle.addEventListener("click", () => setMobileNav(true));
  $$("[data-close-mobile]").forEach((el) => el.addEventListener("click", () => setMobileNav(false)));

  /* ---------- Open / closed status (always India time) ---------- */
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const fmt = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    const ap = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return m ? `${h12}:${String(m).padStart(2, "0")} ${ap}` : `${h12} ${ap}`;
  };
  function indiaNow() {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, mins: Number(get("hour")) * 60 + Number(get("minute")) };
  }
  const toMins = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

  function updateStatus() {
    const { day, mins } = indiaNow();
    const [o, c] = S.hours[day];
    const open = mins >= toMins(o) && mins < toMins(c);
    let title, detail;
    if (open) {
      const left = toMins(c) - mins;
      title = left <= 60 ? `Open · closes in ${left} min` : "Open now";
      detail = `Today ${fmt(o)} – ${fmt(c)}`;
    } else if (mins < toMins(o)) {
      title = "Closed now";
      detail = `Opens today at ${fmt(o)}`;
    } else {
      const next = (day + 1) % 7;
      title = "Closed now";
      detail = `Opens tomorrow at ${fmt(S.hours[next][0])}`;
    }
    $$("[data-status], [data-status-block]").forEach((el) => {
      el.hidden = false;
      el.classList.toggle("is-closed", !open);
    });
    $$("[data-status-text]").forEach((el) => (el.textContent = title));
    $$("[data-status-detail]").forEach((el) => (el.textContent = detail));
    $$("#hours li").forEach((li) => li.classList.toggle("today", Number(li.dataset.day) === day));
  }

  // Weekly hours table, Monday first
  $("#hours").innerHTML = [1, 2, 3, 4, 5, 6, 0]
    .map((d) => `<li data-day="${d}"><span>${DAYS[d]}</span><span>${fmt(S.hours[d][0])} – ${fmt(S.hours[d][1])}</span></li>`)
    .join("");
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Cart (kept in this browser only) ---------- */
  const CART_KEY = "arabianBakeryCart";
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { cart = {}; }
  Object.keys(cart).forEach((id) => { if (!byId[id] || !(cart[id] > 0)) delete cart[id]; });
  const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ } };
  const cartTotal = () => Object.values(cart).reduce((a, b) => a + b, 0);

  function setQty(id, qty) {
    const before = cart[id] || 0;
    if (qty <= 0) delete cart[id]; else cart[id] = Math.min(qty, 99);
    saveCart();
    renderCart();
    syncCardControls(id);
    if (qty > before) {
      $$("[data-cart-count]").forEach((b) => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
      if (before === 0) toast(`Added ${byId[id].name}`);
    }
  }

  /* ---------- Menu ---------- */
  const chipsEl = $("#chips");
  const productsEl = $("#products");
  const searchEl = $("#search");
  let activeCat = "all";

  chipsEl.innerHTML = BAKERY.categories.map((c) => {
    const n = c.id === "all" ? BAKERY.products.length : BAKERY.products.filter((p) => p.category === c.id).length;
    return `<button type="button" class="chip" role="tab" data-cat="${c.id}" aria-selected="${c.id === activeCat}"><span>${c.icon}</span>${esc(c.name)} <small>${n}</small></button>`;
  }).join("");

  function controlsHtml(id) {
    const q = cart[id] || 0;
    if (!q) return `<button type="button" class="add-btn" data-add="${id}"><svg><use href="#i-plus"/></svg> Add</button>`;
    return `<div class="qty" aria-label="Quantity"><button type="button" data-dec="${id}" aria-label="Remove one"><svg><use href="#i-minus"/></svg></button><output>${q}</output><button type="button" data-inc="${id}" aria-label="Add one"><svg><use href="#i-plus"/></svg></button></div>`;
  }
  function syncCardControls(id) {
    const slot = productsEl.querySelector(`[data-ctl="${id}"]`);
    if (slot) slot.innerHTML = controlsHtml(id);
  }

  function renderProducts() {
    const q = searchEl.value.trim().toLowerCase();
    const list = mixedOrder.filter((p) => {
      if (activeCat !== "all" && p.category !== activeCat) return false;
      if (!q) return true;
      return [p.name, p.ml, p.desc, p.category, ...(p.tags || [])].join(" ").toLowerCase().includes(q);
    });
    $("#empty-note").hidden = list.length > 0;
    productsEl.innerHTML = list.map((p, i) => `
      <article class="product" style="animation-delay:${Math.min(i, 8) * 45}ms">
        <div class="p-media">
          ${p.image
            ? `<img src="${p.image}" alt="${esc(p.name)}" loading="lazy" />`
            : `<div class="p-tile cat-${p.category}" role="img" aria-label="${esc(p.name)}"><span>${artFor(p)}</span></div>`}
          ${p.badge ? `<span class="p-badge">${esc(p.badge)}</span>` : ""}
        </div>
        <div class="p-body">
          <span class="p-size">${esc(p.size)}</span>
          <h3 class="p-name">${esc(p.name)}</h3>
          <p class="p-ml" lang="ml">${esc(p.ml)}</p>
          <p class="p-desc">${esc(p.desc)}</p>
          <div class="p-tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="p-foot">
            <span class="p-price">Today's rate<strong>Ask on WhatsApp</strong></span>
            <span data-ctl="${p.id}">${controlsHtml(p.id)}</span>
          </div>
        </div>
      </article>`).join("");
  }

  function setCategory(cat) {
    activeCat = cat;
    $$(".chip", chipsEl).forEach((c) => c.setAttribute("aria-selected", String(c.dataset.cat === cat)));
    const chip = chipsEl.querySelector(`[data-cat="${cat}"]`);
    if (chip) chip.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    renderProducts();
  }

  chipsEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) setCategory(chip.dataset.cat);
  });
  let searchTimer;
  searchEl.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (searchEl.value.trim() && activeCat !== "all") setCategory("all"); else renderProducts();
    }, 120);
  });
  productsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-add],[data-inc],[data-dec]");
    if (!b) return;
    const id = b.dataset.add || b.dataset.inc || b.dataset.dec;
    setQty(id, (cart[id] || 0) + (b.dataset.dec ? -1 : 1));
  });
  $$("[data-jump-cat]").forEach((a) => a.addEventListener("click", () => setCategory(a.dataset.jumpCat)));

  renderProducts();

  /* ---------- Drawer ---------- */
  const drawer = $("#drawer");
  const scrim = $("#scrim");
  let lastFocus = null;
  function setDrawer(open) {
    if (open) lastFocus = document.activeElement;
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    scrim.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) setTimeout(() => $(".drawer-head .icon-btn").focus(), 50);
    else if (lastFocus) lastFocus.focus();
  }
  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", () => setDrawer(true)));
  $$("[data-close-cart]").forEach((b) => b.addEventListener("click", () => setDrawer(false)));
  scrim.addEventListener("click", () => setDrawer(false));

  const itemsEl = $("#cart-items");
  function renderCart() {
    const ids = Object.keys(cart);
    const total = cartTotal();
    $$("[data-cart-count]").forEach((b) => { b.textContent = total; b.hidden = total === 0; });
    $("#cart-empty").hidden = ids.length > 0;
    $("#cart-filled").hidden = ids.length === 0;
    $("#cart-foot").hidden = ids.length === 0;
    itemsEl.innerHTML = ids.map((id) => {
      const p = byId[id];
      return `<li class="cart-item">
        <span class="thumb">${p.image ? `<img src="${p.image}" alt="" />` : artFor(p)}</span>
        <div><strong>${esc(p.name)}</strong><small>${esc(p.size)}</small></div>
        <div class="qty"><button type="button" data-dec="${id}" aria-label="Remove one ${esc(p.name)}"><svg><use href="#i-minus"/></svg></button><output>${cart[id]}</output><button type="button" data-inc="${id}" aria-label="Add one ${esc(p.name)}"><svg><use href="#i-plus"/></svg></button></div>
      </li>`;
    }).join("");
  }
  itemsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-inc],[data-dec]");
    if (!b) return;
    const id = b.dataset.inc || b.dataset.dec;
    setQty(id, (cart[id] || 0) + (b.dataset.dec ? -1 : 1));
  });
  $$('input[name="otype"]').forEach((r) => r.addEventListener("change", () => {
    $("#addr-field").hidden = $('input[name="otype"]:checked').value !== "Local delivery";
  }));
  $("#clear-cart").addEventListener("click", () => {
    const ids = Object.keys(cart);
    cart = {};
    saveCart();
    renderCart();
    ids.forEach(syncCardControls);
  });
  $("#send-order").addEventListener("click", () => {
    const nameField = $("#c-name");
    const name = nameField.value.trim();
    if (!name) {
      nameField.closest(".field").classList.add("invalid");
      nameField.focus();
      toast("Please add your name");
      return;
    }
    nameField.closest(".field").classList.remove("invalid");
    const type = $('input[name="otype"]:checked').value;
    const addr = $("#c-addr").value.trim();
    const notes = $("#c-notes").value.trim();
    const lines = Object.keys(cart).map((id, i) => `${i + 1}. ${byId[id].name} (${byId[id].size}) × ${cart[id]}`);
    const msg = [
      "Hello Arabian Bakery! I'd like to order:",
      "",
      ...lines,
      "",
      `Name: ${name}`,
      `Order type: ${type}`,
      type === "Local delivery" && addr ? `Address: ${addr}` : null,
      notes ? `Notes: ${notes}` : null,
      "",
      "Please confirm today's rate and when it will be ready. Thank you!"
    ].filter((l) => l !== null).join("\n");
    openWhatsApp(msg);
  });
  renderCart();

  /* ---------- Cake form ---------- */
  const cakeForm = $("#cake-form");
  const dateInput = cakeForm.elements.date;
  const todayISO = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
  dateInput.min = todayISO;

  cakeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = cakeForm.elements;
    let firstBad = null;
    ["date", "name", "phone"].forEach((k) => {
      const ok = f[k].value.trim() !== "" && (k !== "date" || f[k].value >= todayISO);
      f[k].closest(".field").classList.toggle("invalid", !ok);
      if (!ok && !firstBad) firstBad = f[k];
    });
    if (firstBad) { firstBad.focus(); toast("Please fill in the highlighted fields"); return; }

    const d = new Date(f.date.value + "T00:00:00");
    const dateStr = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    const msg = [
      "Hello Arabian Bakery! I'd like to book a custom cake:",
      "",
      `Flavour: ${f.flavour.value}${f.eggless.checked ? " (eggless)" : ""}`,
      `Weight: ${f.weight.value}`,
      `Occasion: ${f.occasion.value}`,
      f.message.value.trim() ? `Message on cake: "${f.message.value.trim()}"` : null,
      `Needed on: ${dateStr}${f.time.value ? " at " + f.time.value : ""}`,
      `Pickup / delivery: ${f.mode.value}`,
      f.notes.value.trim() ? `Design notes: ${f.notes.value.trim()}` : null,
      "",
      `Name: ${f.name.value.trim()}`,
      `Phone: ${f.phone.value.trim()}`,
      "",
      "Please confirm the price and availability. Thank you!"
    ].filter((l) => l !== null).join("\n");
    openWhatsApp(msg);
  });
  cakeForm.addEventListener("input", (e) => {
    const field = e.target.closest(".field");
    if (field) field.classList.remove("invalid");
  });
  $("#c-name").addEventListener("input", (e) => e.target.closest(".field").classList.remove("invalid"));

  /* ---------- Gallery + lightbox ---------- */
  const gal = BAKERY.gallery;
  $("#gallery-grid").innerHTML = gal.map((g, i) => `
    <button type="button" class="g-item reveal ${g.size === "wide" ? "g-wide" : ""} ${g.size === "tall" ? "g-tall" : ""}" data-i="${i}" aria-label="View photo: ${esc(g.title)}">
      <img src="${g.src}" alt="${esc(g.title)}" loading="lazy" />
      <figcaption>${esc(g.title)}</figcaption>
    </button>`).join("");

  const lb = $("#lightbox");
  let lbIndex = 0;
  let lbReturn = null;
  function showLb(i) {
    lbIndex = (i + gal.length) % gal.length;
    const g = gal[lbIndex];
    $("#lb-img").src = g.src;
    $("#lb-img").alt = g.title;
    $("#lb-cap").innerHTML = `${esc(g.title)}<span lang="ml">${esc(g.ml || "")}</span>`;
  }
  function openLb(i) {
    lbReturn = document.activeElement;
    showLb(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lb-close").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lbReturn) lbReturn.focus();
  }
  $("#gallery-grid").addEventListener("click", (e) => {
    const item = e.target.closest(".g-item");
    if (item) openLb(Number(item.dataset.i));
  });
  lb.addEventListener("click", (e) => {
    const act = e.target.closest("[data-lb]")?.dataset.lb;
    if (act === "close" || e.target === lb) closeLb();
    if (act === "prev") showLb(lbIndex - 1);
    if (act === "next") showLb(lbIndex + 1);
  });

  // Swipe between photos on touch screens
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") showLb(lbIndex - 1);
      if (e.key === "ArrowRight") showLb(lbIndex + 1);
      return;
    }
    if (e.key === "Escape") {
      if (drawer.classList.contains("open")) setDrawer(false);
      if (!mobileNav.hidden) setMobileNav(false);
    }
  });

  /* ---------- Reviews ---------- */
  const star = '<svg><use href="#i-star"/></svg>';
  $("#reviews-grid").innerHTML = BAKERY.reviews.map((r) => `
    <figure class="review reveal">
      <div class="stars" aria-label="5 out of 5 stars">${star.repeat(5)}</div>
      <p>${esc(r.text)}</p>
      <footer><span class="avatar">${esc(r.name.charAt(0))}</span><div><strong>${esc(r.name)}</strong><small>${esc(r.place)}</small></div></footer>
    </figure>`).join("");

  /* ---------- Reveal on scroll + counters ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    revealObs.observe(el);
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countObs.unobserve(e.target);
      const el = e.target;
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      if (reduceMotion) return;
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1200);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countObs.observe(el));

  $("#year").textContent = new Date().getFullYear();
})();
