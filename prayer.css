/* ========= Mobile Hamburger ========= */
const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

function closeMobileMenuOnOutsideClick(e) {
  if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
    navList.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

menuToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  // close on outside click
  if (isOpen) {
    document.addEventListener("click", closeMobileMenuOnOutsideClick);
  } else {
    document.removeEventListener("click", closeMobileMenuOnOutsideClick);
  }
});

/* ========= Dropdowns (click-to-open on mobile) ========= */
const dropdownToggles = document.querySelectorAll(".dropdown > .dropdown-toggle");
const subDropdownToggles = document.querySelectorAll(".sub-dropdown > .sub-dropdown-toggle");

function togglePanel(link, panelSelector) {
  const container = link.parentElement;
  const panel = container.querySelector(panelSelector);
  const expanded = link.getAttribute("aria-expanded") === "true";
  link.setAttribute("aria-expanded", String(!expanded));

  // Close siblings to avoid huge stacks
  const siblingPanels = [...container.parentElement.querySelectorAll(panelSelector)]
    .filter(p => p !== panel);
  siblingPanels.forEach(p => p.classList.remove("active"));

  panel.classList.toggle("active");
}

dropdownToggles.forEach(link => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      togglePanel(link, ".dropdown-content");
    }
  });

  // keyboard access
  link.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && window.innerWidth <= 768) {
      e.preventDefault();
      togglePanel(link, ".dropdown-content");
    }
  });
});

subDropdownToggles.forEach(link => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      togglePanel(link, ".sub-dropdown-content");
    }
  });

  link.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && window.innerWidth <= 768) {
      e.preventDefault();
      togglePanel(link, ".sub-dropdown-content");
    }
  });
});

/* ========= Modals ========= */
const body = document.body;

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add("active");
  body.style.overflow = "hidden";

  // focus trap to close with ESC
  function escClose(ev) {
    if (ev.key === "Escape") closeModal(id);
  }
  overlay.dataset.escHandler = escClose; // store ref
  document.addEventListener("keydown", escClose);
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove("active");
  body.style.overflow = "";
  const escClose = overlay.dataset.escHandler;
  if (escClose) {
    document.removeEventListener("keydown", escClose);
    delete overlay.dataset.escHandler;
  }

  // Pause any media inside
  overlay.querySelectorAll("video, audio").forEach(m => {
    if (!m.paused) m.pause();
  });
}

// open triggers
document.querySelectorAll("[data-modal-target]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-modal-target");
    openModal(target);
  });
});

// close triggers
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    const overlay = btn.closest(".modal-overlay");
    if (overlay) closeModal(overlay.id);
  });
});

// click outside content to close
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

/* ========= Prayer Wall (localStorage) ========= */
const form = document.getElementById("prayer-form");
const textarea = document.getElementById("prayer-input");
const wall = document.getElementById("prayer-wall");
const charCount = document.getElementById("char-count");
const STORAGE_KEY = "spiritly_prayers";

/** Load existing prayers */
function loadPrayers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    wall.innerHTML = "";
    arr.forEach(addPrayerNode);
  } catch {
    wall.innerHTML = "";
  }
}

/** Save prayers array */
function savePrayers(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

/** Add prayer card to DOM */
function addPrayerNode(text) {
  const note = document.createElement("div");
  note.className = "prayer-note";
  note.textContent = text; // safe (escapes)
  wall.appendChild(note);
}

/** Get array from storage */
function getPrayers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Character counter */
textarea.addEventListener("input", () => {
  charCount.textContent = `${textarea.value.length}/200`;
});

/** Submit handler */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = textarea.value.trim();
  if (!val) return;

  // Basic normalization
  const cleaned = val.replace(/\s+/g, " ").slice(0, 200);
  addPrayerNode(cleaned);

  const arr = getPrayers();
  arr.unshift(cleaned); // newest first
  savePrayers(arr);

  textarea.value = "";
  charCount.textContent = "0/200";
});

/** Init on load */
document.addEventListener("DOMContentLoaded", () => {
  loadPrayers();
  charCount.textContent = `${textarea.value.length}/200`;
});
