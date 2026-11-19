// ===== Header: shadow on scroll =====
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

// ===== Current year in hero side rail =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Count-up numbers =====
function countUp(el) {
  const target = Number(el.dataset.count);
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ===== Reveal on scroll + trigger counters =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.count) countUp(el);
      else el.classList.add("is-visible");
      observer.unobserve(el);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal, [data-count]").forEach((el) => observer.observe(el));

// ===== Experience accordion (one open at a time) =====
const jobs = document.querySelectorAll(".job");
jobs.forEach((job) => {
  const head = job.querySelector(".job__head");
  head.addEventListener("click", () => {
    const willOpen = !job.classList.contains("is-open");
    jobs.forEach((j) => {
      j.classList.remove("is-open");
      j.querySelector(".job__head").setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      job.classList.add("is-open");
      head.setAttribute("aria-expanded", "true");
    }
  });
});

// ===== Case study cards: hovered card becomes the raised "active" one =====
const cases = document.querySelectorAll(".case");
cases.forEach((card) =>
  card.addEventListener("mouseenter", () => {
    cases.forEach((c) => c.classList.toggle("is-active", c === card));
  })
);
