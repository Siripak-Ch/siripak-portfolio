"use strict";

const activities = [
  { year: "2026", title: "CES Engage 2026", cat: "leadership", label: "Leadership & Engagement", url: "https://drive.google.com/drive/folders/1y7A0N4eFX9-WkJVbI3N5_2B9EsJr0PyA" },
  { year: "2026", title: "AI Summit", cat: "digital", label: "Artificial Intelligence", url: "https://drive.google.com/drive/folders/190fZqPYA6sbYEZnTimCkJUpkaKE46RZD" },
  { year: "2026", title: "Medtec 2026", cat: "training", label: "Industry Event", url: "https://drive.google.com/drive/folders/1C3cqr7OrJQqbvbd8-5M-HX6PwEXn_Nq6" },
  { year: "2026", title: "Customer Training: Reading ISO/IEC 17025 Reports", cat: "training", label: "Customer Development", url: "https://drive.google.com/drive/folders/1LC59VnUMQgHm-7SU6TRMhTvmtDTvh_Jr" },
  { year: "2026", title: "CES Meeting Q2", cat: "leadership", label: "Business Alignment", url: "https://drive.google.com/drive/folders/1tvzVCsmqvErDsBST20U3-UYm5krMgg-G" },
  { year: "2026", title: "PSU Visit", cat: "engagement", label: "Onsite Visit", url: "https://drive.google.com/drive/folders/1nM5kxwy6-B69_FZmUyO2hSynfJIBf4Ra" },
  { year: "2026", title: "Supervisor Occupational Safety Training", cat: "quality", label: "Safety", url: "https://drive.google.com/drive/folders/1K8qc5HXUxULwWqijNjdom-xfuRNbtyrC" },
  { year: "2026", title: "Medtronic Program", cat: "training", label: "Technical Training", url: "https://drive.google.com/drive/folders/1d3OecEDotpJCKDwoyAgKllCuSWWxAkE7" },
  { year: "2026", title: "Risk Management for Laboratories", cat: "quality", label: "Risk & Quality", url: "https://drive.google.com/drive/folders/1Y9y5fPlc3TL47VnxG-IsY3mCTSsipKy7" },
  { year: "2026", title: "FutureSkill NEXT", cat: "digital", label: "Future Skills", url: "https://drive.google.com/drive/folders/1R8f4tgOM_QpG-0Ko5kepXb5OhKUomUDe" },
  { year: "2026", title: "Medical Laboratory Safety", cat: "quality", label: "Laboratory Safety", url: "https://drive.google.com/drive/folders/1-OmEjwXti2BneEv9L3zh_QOziH7-ohzq" },
  { year: "2026", title: "Smart Healthcare Facility & System Design", cat: "training", label: "Healthcare Systems", url: "https://drive.google.com/drive/folders/16DS5lmPXt72HsDnbqzkhzIHhp6mCaJxb" },
  { year: "2026", title: "CES Workshop", cat: "leadership", label: "Workshop", url: "https://drive.google.com/drive/folders/1xtyX6-i8nibxcvw647PaP2T15ue3s9i4" },
  { year: "2026", title: "CX-IHB New Year 2026", cat: "engagement", label: "Engagement", url: "https://drive.google.com/drive/folders/1iLSEDZAE-vEcQdEfgKYSN6aoR1Wg89NE" },
  { year: "2026", title: "Customer Training", cat: "training", label: "Customer Development", url: "https://drive.google.com/drive/folders/1AF6xynsc8ejew0p_mRP-zqx178100nHC" },
  { year: "2026", title: "Reskill Retrain 2026", cat: "training", label: "People Development", url: "https://drive.google.com/drive/folders/1ByWG__vyTTTMfP-AH2AzpZ5Ilj9ZPwlE" },
  { year: "2026", title: "CES CSR", cat: "engagement", label: "CSR", url: "https://drive.google.com/drive/folders/1eVTXJkLqgtsWV18untoGp5LNgV8kReKd" },
  { year: "2025", title: "CES Crew Leader 2026 Preparation", cat: "leadership", label: "Leadership Pipeline", url: "https://drive.google.com/drive/folders/1KdHv812IzYz9mQ-DiFI_ilJSdXqPjmFM" },
  { year: "2025", title: "Annual Fire Safety Training", cat: "quality", label: "Safety", url: "https://drive.google.com/drive/folders/1cpCr0_-c2yXu2w_h_A2CPbN-2BfBcbqn" },
  { year: "2025", title: "Thai Heart Visit", cat: "engagement", label: "Site Visit", url: "https://drive.google.com/drive/folders/1garx0YmSsGY0f43SL8fzV6hZ-vPRuYxN" },
  { year: "2025", title: "Scope of Service Update", cat: "quality", label: "Service Governance", url: "https://drive.google.com/drive/folders/1Uc4nU-rw9L2TerQnw5htRiVgZ6Ss3UnS" },
  { year: "2025", title: "Parcel Notification Workflow", cat: "digital", label: "Operations System", url: "https://drive.google.com/drive/folders/1gSWnkNHFM0vniRHywT5r6OcJulxH3ZB7" },
  { year: "2025", title: "24th Anniversary", cat: "engagement", label: "Corporate Event", url: "https://drive.google.com/drive/folders/1WXsW-Eko9hOpzKOmi7micrPcsrso0wT-" },
  { year: "2025", title: "Internal Audit: CAL-MED LAB", cat: "quality", label: "Internal Audit", url: "https://drive.google.com/drive/folders/1piMW4neh_c9E6JPqAmgbZXtgjeDNHYs3" },
  { year: "2025", title: "CES Sales Update", cat: "leadership", label: "Commercial Alignment", url: "https://drive.google.com/drive/folders/1hO4Mbj8KPDbIfbsdMOUMpJ9K2Go30FvO" },
  { year: "2025", title: "CSI Announcement", cat: "digital", label: "Customer Experience", url: "https://drive.google.com/drive/folders/1WWB2Pe9KWKK_ms0_OUV9g7M9Coh1SYSw" },
  { year: "2025", title: "Monthly Meeting Summary Rollout", cat: "digital", label: "Reporting System", url: "https://drive.google.com/drive/folders/1VYoDyuii2ok6XcKv_lSR8PjJws51-jrs" },
  { year: "2025", title: "Vehicle Booking System Communication", cat: "digital", label: "Operations System", url: "https://drive.google.com/drive/folders/1U47EhkKMi9dSVCGnKFAS0MyaasQDrqZX" },
  { year: "2025", title: "Performance Review", cat: "leadership", label: "Performance Management", url: "https://drive.google.com/drive/folders/1VllsOj0qXkCGillxnFgNGRj0eWgOY02m" },
  { year: "2025", title: "Care the Bear", cat: "engagement", label: "Sustainability", url: "https://drive.google.com/drive/folders/1M88nn9goFIfTwqTcBfAQtZ2UwgOKRbnb" },
  { year: "2025", title: "PSU Onsite Visit", cat: "engagement", label: "Onsite Visit", url: "https://drive.google.com/drive/folders/1Y2bay57-kB852DqOudZ7-tVWXd81W64W" },
  { year: "2025", title: "Radio Audit", cat: "quality", label: "Audit", url: "https://drive.google.com/drive/folders/1wvdD8C3DtNxkOLmHTJKvTTBtsN4bLNAT" },
  { year: "2025", title: "CAL-MED Risk Management Review", cat: "quality", label: "Risk Review", url: "https://drive.google.com/drive/folders/1K0EqedreUi4DvQt09xVJJ43tieZpCQ3n" },
  { year: "2025", title: "AM Coffee Meeting", cat: "engagement", label: "Team Engagement", url: "https://drive.google.com/drive/folders/1ON4-COoR9YDvfQ7ZTWzX5RHIJ_bNd0cY" },
  { year: "2025", title: "Hearth PRO", cat: "training", label: "Professional Development", url: "https://drive.google.com/drive/folders/1XwwBkCaspREoDXLKWj8aBEnwaAp_E15Z" },
  { year: "2025", title: "New Staff Training Program", cat: "training", label: "Onboarding", url: "https://drive.google.com/drive/folders/16GomTQJM9irhjN7NQx-uZCfEahYbUZ1i" },
  { year: "2025", title: "CAL-MED Workshop", cat: "training", label: "Technical Workshop", url: "https://drive.google.com/drive/folders/10WOVb4jQMMpU2XNSFu1RdiuwXhVZqR1L" },
  { year: "2024", title: "CES: The Way to Go 2025", cat: "leadership", label: "Strategic Planning", url: "https://drive.google.com/drive/folders/1kkqojdaO8_nHkIMFW1Cr6lxEimbFdjhI" },
  { year: "2024", title: "External Audit", cat: "quality", label: "External Audit", url: "https://drive.google.com/drive/folders/17AORE0E9gOTguxPIjS7Cv1jpahmjnydF" },
  { year: "2024", title: "Annual Fire Safety Training", cat: "quality", label: "Safety", url: "https://drive.google.com/drive/folders/1al3GLrAdFu3GHujkhr7AtMfinNerTRCD" }
];

const activityGrid = document.querySelector("#activityGrid");
const showMoreButton = document.querySelector("#showMore");
const activityCount = document.querySelector("#activityCount");
const filters = [...document.querySelectorAll(".filter")];
const mobileBreakpoint = window.matchMedia("(max-width: 580px)");

let activeFilter = "all";
let expanded = false;

function getInitialLimit() {
  return mobileBreakpoint.matches ? 6 : 12;
}

function renderActivities() {
  const filtered = activities.filter((activity) => activeFilter === "all" || activity.cat === activeFilter);
  const initialLimit = getInitialLimit();
  const visible = expanded ? filtered : filtered.slice(0, initialLimit);

  activityGrid.innerHTML = visible.map((activity) => `
    <a class="activity-card" href="${activity.url}" target="_blank" rel="noopener noreferrer">
      <div class="activity-top">
        <span class="activity-year">${activity.year}</span>
        <span class="activity-tag">${activity.label}</span>
      </div>
      <h3>${activity.title}</h3>
      <small>Open Drive folder ↗</small>
    </a>
  `).join("");

  activityCount.textContent = `${filtered.length} ${filtered.length === 1 ? "activity" : "activities"}`;
  showMoreButton.hidden = filtered.length <= initialLimit;
  showMoreButton.textContent = expanded ? "Show fewer activities" : "Show all activities";
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    expanded = false;
    renderActivities();
  });
});

showMoreButton.addEventListener("click", () => {
  expanded = !expanded;
  renderActivities();
  if (!expanded) document.querySelector("#activities").scrollIntoView({ behavior: "smooth" });
});

mobileBreakpoint.addEventListener?.("change", renderActivities);
renderActivities();

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function closeNavigation() {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.counter || 0);
    const suffix = element.dataset.suffix || "";
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    observer.unobserve(element);
  });
}, { threshold: 0.65 });

document.querySelectorAll("[data-counter]").forEach((counter) => counterObserver.observe(counter));
document.querySelector("#year").textContent = new Date().getFullYear();

// Correct résumé link if the optional contact shortcut was edited incorrectly.
const resumeFallback = document.querySelector('[data-resume-fallback="true"]');
if (resumeFallback) {
  resumeFallback.href = "https://drive.google.com/file/d/1ghwF1yoer6nzkwu5rgeCHNBJNeuO5SQS/view";
}
