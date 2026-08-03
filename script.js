(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem'>Portfolio data could not be loaded.</p>";
    return;
  }

  const UI = {
    en: {
      portfolioLabel: "Professional Portfolio",
      exploreWork: "Explore work",
      viewResume: "View résumé",
      currentFocus: "Current focus",
      focusValue: "Healthcare service transformation",
      aboutLabel: "About me",
      focusAreas: "Focus areas",
      focusAreasHint: "Where I create value",
      education: "Education",
      educationHint: "Business + engineering foundation",
      experienceLabel: "Experience",
      experienceTitle: "Roles built around coordination, clarity and execution.",
      experienceSummary: "Experience across healthcare service operations, people development, compliance and biomedical research.",
      projectsLabel: "Selected projects",
      projectsTitle: "Three ways I support service transformation.",
      projectsSummary: "Cards are organized as a catalog: they can be reordered, hidden or highlighted without editing the page layout.",
      credentialsLabel: "Certificates & activities",
      credentialsTitle: "Technical credibility and external learning.",
      credentialsSummary: "Certificates focus on medical-device and ISO/IEC 17025 knowledge; activities focus on expos, summits, external visits and workshops.",
      certificates: "Certificates",
      certificatesHint: "Selected technical and digital credentials",
      externalActivities: "External activities",
      externalActivitiesHint: "Expo · Summit · Visit · Workshop",
      contactLabel: "Contact",
      contactSupport: "Available for project coordination, service-development and healthcare operations opportunities.",
      backToTop: "Back to top ↑",
      featured: "Highlighted",
      result: "Result",
      openSource: "Open source",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      location: "Location"
    },
    th: {
      portfolioLabel: "แฟ้มสะสมผลงาน",
      exploreWork: "ดูผลงาน",
      viewResume: "ดูเรซูเม่",
      currentFocus: "งานที่มุ่งเน้น",
      focusValue: "การพัฒนาบริการสุขภาพ",
      aboutLabel: "เกี่ยวกับฉัน",
      focusAreas: "ความเชี่ยวชาญหลัก",
      focusAreasHint: "ด้านที่สร้างคุณค่า",
      education: "การศึกษา",
      educationHint: "พื้นฐานธุรกิจและวิศวกรรม",
      experienceLabel: "ประสบการณ์",
      experienceTitle: "บทบาทที่เน้นการประสานงาน ความชัดเจน และการส่งมอบผลลัพธ์",
      experienceSummary: "ประสบการณ์ด้านการดำเนินงานบริการสุขภาพ การพัฒนาบุคลากร มาตรฐาน และงานวิจัยชีวการแพทย์",
      projectsLabel: "ผลงานที่คัดเลือก",
      projectsTitle: "3 มิติของการสนับสนุน Service Transformation",
      projectsSummary: "การ์ดผลงานจัดเป็น Catalog สามารถเปลี่ยนลำดับ ซ่อน หรือเลือก Highlight ได้โดยไม่ต้องแก้โครงหน้าเว็บ",
      credentialsLabel: "ประกาศนียบัตรและกิจกรรม",
      credentialsTitle: "ความน่าเชื่อถือทางเทคนิคและการเรียนรู้ภายนอกองค์กร",
      credentialsSummary: "ส่วนประกาศนียบัตรเน้นความรู้เครื่องมือแพทย์และ ISO/IEC 17025 ส่วนกิจกรรมเน้น Expo, Summit, Visit และ Workshop ภายนอก",
      certificates: "ประกาศนียบัตร",
      certificatesHint: "คัดเลือกด้านเทคนิคและดิจิทัล",
      externalActivities: "กิจกรรมภายนอก",
      externalActivitiesHint: "Expo · Summit · Visit · Workshop",
      contactLabel: "ติดต่อ",
      contactSupport: "เปิดรับโอกาสด้านการประสานโครงการ การพัฒนาบริการ และการดำเนินงานสุขภาพ",
      backToTop: "กลับด้านบน ↑",
      featured: "ผลงานเด่น",
      result: "ผลลัพธ์",
      openSource: "เปิดแหล่งข้อมูล",
      email: "อีเมล",
      phone: "โทรศัพท์",
      linkedin: "LinkedIn",
      location: "สถานที่"
    }
  };

  const getLanguage = () => localStorage.getItem("portfolio-language") || data.meta.defaultLanguage || "en";
  let language = getLanguage();
  const localized = (value) => {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    return value[language] || value.en || value.th || "";
  };
  const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function sortVisible(items) {
    return [...items]
      .filter((item) => item.visible !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }

  function sourceLink(source) {
    if (!source?.url) return "";
    const label = data.settings.showSourceLabels ? source.label : UI[language].openSource;
    return `
      <a class="source-link" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHTML(source.id || source.label || "Source")}">
        <span>${escapeHTML(label)}</span><span aria-hidden="true">↗</span>
      </a>`;
  }

  function renderNavigation() {
    const nav = document.querySelector("#primary-nav");
    nav.innerHTML = data.nav.map((item) => `<a href="#${escapeHTML(item.id)}">${escapeHTML(localized(item.label))}</a>`).join("");
  }

  function renderUIStrings() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-ui]").forEach((element) => {
      const key = element.dataset.ui;
      if (UI[language][key]) element.textContent = UI[language][key];
    });
    document.querySelectorAll("[data-text]").forEach((element) => {
      const key = element.dataset.text;
      if (UI[language][key]) element.textContent = UI[language][key];
    });
    document.querySelectorAll("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === language));
  }

  function renderHero() {
    setText("#heroRole", localized(data.hero.role));
    setText("#heroCompany", data.hero.company);
    setText("#heroKicker", localized(data.hero.kicker));
    setText("#heroTitle", localized(data.hero.title));
    setText("#heroLead", localized(data.hero.lead));
    document.querySelector("#resumeButton").hidden = data.settings.showResume === false;
    document.querySelector("#resumeButton").href = data.meta.resumeUrl;
    document.querySelector("#heroMetrics").innerHTML = data.hero.metrics.map((metric) => `
      <div class="metric-card">
        <strong>${escapeHTML(metric.value)}</strong>
        <span>${escapeHTML(localized(metric.label))}</span>
      </div>`).join("");
  }

  function renderAbout() {
    setText("#aboutHeading", localized(data.about.heading));
    setText("#aboutSummary", localized(data.about.summary));
    document.querySelector("#successHighlights").innerHTML = data.about.successHighlights.map((item, index) => `
      <article class="success-card reveal">
        <span class="success-number">0${index + 1}</span>
        <h3>${escapeHTML(localized(item.title))}</h3>
        <p>${escapeHTML(localized(item.text))}</p>
      </article>`).join("");
    document.querySelector("#focusAreas").innerHTML = data.about.focusAreas.map((item) => `<span class="pill">${escapeHTML(localized(item))}</span>`).join("");
    document.querySelector("#educationList").innerHTML = data.about.education.map((item) => `
      <div class="education-item">
        <h4>${escapeHTML(localized(item.degree))}</h4>
        <div class="education-meta"><span>${escapeHTML(item.school)}</span><span>${escapeHTML(item.period)}</span></div>
        <p>${escapeHTML(localized(item.detail))}</p>
      </div>`).join("");
  }

  function renderExperience() {
    document.querySelector("#experienceList").innerHTML = sortVisible(data.experience).map((item) => `
      <article class="experience-card reveal">
        <div>
          <div class="experience-period">${escapeHTML(item.period)}</div>
          <div class="experience-company">${escapeHTML(item.company)}</div>
        </div>
        <div class="experience-body">
          <h3>${escapeHTML(localized(item.role))}</h3>
          <p>${escapeHTML(localized(item.summary))}</p>
          <ul>${item.bullets.map((bullet) => `<li>${escapeHTML(localized(bullet))}</li>`).join("")}</ul>
        </div>
      </article>`).join("");
  }

  function renderProjects() {
    document.querySelector("#projectGroups").innerHTML = data.projectGroups.map((group) => {
      const trackId = `track-${group.id}`;
      const cards = sortVisible(group.projects).map((project, index) => `
        <article class="project-card ${project.featured ? "featured" : ""}">
          <div class="project-top">
            <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
            ${project.featured ? `<span class="featured-label">${escapeHTML(UI[language].featured)}</span>` : ""}
          </div>
          <h4>${escapeHTML(localized(project.title))}</h4>
          <p>${escapeHTML(localized(project.summary))}</p>
          <p class="project-result"><strong>${escapeHTML(UI[language].result)}:</strong> ${escapeHTML(localized(project.result))}</p>
          <div class="tag-row">${project.tags.map((tag) => `<span class="tag">${escapeHTML(localized(tag))}</span>`).join("")}</div>
          ${sourceLink(project.source)}
        </article>`).join("");
      return `
        <section class="project-group reveal" aria-labelledby="heading-${escapeHTML(group.id)}">
          <div class="project-group-head">
            <div class="project-group-title">
              <h3 id="heading-${escapeHTML(group.id)}">${escapeHTML(localized(group.title))}</h3>
              <p>${escapeHTML(localized(group.intro))}</p>
            </div>
            <div class="slider-controls" data-slider-controls="${trackId}">
              <button type="button" data-direction="prev" aria-label="Previous">←</button>
              <button type="button" data-direction="next" aria-label="Next">→</button>
            </div>
          </div>
          <div class="horizontal-track" id="${trackId}">${cards}</div>
        </section>`;
    }).join("");
  }

  function renderCredentials() {
    document.querySelector("#certificatesTrack").innerHTML = sortVisible(data.certificates).map((item) => `
      <article class="credential-card">
        <div class="card-meta"><span>${escapeHTML(item.year)}</span><span class="card-type">${item.featured ? escapeHTML(UI[language].featured) : "Certificate"}</span></div>
        <h4>${escapeHTML(localized(item.title))}</h4>
        <p>${escapeHTML(localized(item.issuer))}</p>
        ${sourceLink(item.source)}
      </article>`).join("");

    document.querySelector("#activitiesTrack").innerHTML = sortVisible(data.activities).map((item) => `
      <article class="activity-card">
        <div class="card-meta"><span>${escapeHTML(item.date)}</span><span class="card-type">${escapeHTML(localized(item.type))}</span></div>
        <h4>${escapeHTML(localized(item.title))}</h4>
        <p>${escapeHTML(localized(item.summary))}</p>
        ${sourceLink(item.source)}
      </article>`).join("");
  }

  function renderContact() {
    setText("#contactHeading", localized(data.contact.heading));
    const items = [
      { label: UI[language].email, value: data.contact.email, url: `mailto:${data.contact.email}` },
      ...(data.settings.showPhone ? [{ label: UI[language].phone, value: data.contact.phone, url: `tel:${data.contact.phone.replace(/\s/g, "")}` }] : []),
      { label: UI[language].linkedin, value: "siripak-chattanupakorn", url: data.contact.linkedin },
      { label: UI[language].location, value: localized(data.contact.location), url: "https://maps.google.com/?q=Bangkok,Thailand" }
    ];
    document.querySelector("#contactCards").innerHTML = items.map((item) => `
      <a class="contact-card" href="${escapeHTML(item.url)}" ${item.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>
        <div><small>${escapeHTML(item.label)}</small><strong>${escapeHTML(item.value)}</strong></div><span aria-hidden="true">↗</span>
      </a>`).join("");
  }

  function renderAll() {
    renderNavigation();
    renderUIStrings();
    renderHero();
    renderAbout();
    renderExperience();
    renderProjects();
    renderCredentials();
    renderContact();
    activateInteractions();
  }

  function activateInteractions() {
    document.querySelectorAll("[data-slider-controls]").forEach((controls) => {
      if (controls.dataset.ready) return;
      controls.dataset.ready = "true";
      const track = document.getElementById(controls.dataset.sliderControls);
      controls.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-direction]");
        if (!button || !track) return;
        const amount = Math.max(track.clientWidth * 0.82, 300);
        track.scrollBy({ left: button.dataset.direction === "next" ? amount : -amount, behavior: "smooth" });
      });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.visible)").forEach((element) => revealObserver.observe(element));

    const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
    const sections = [...document.querySelectorAll("main section[id]")];
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55%", threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      language = button.dataset.lang;
      localStorage.setItem("portfolio-language", language);
      renderAll();
    });
  });

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20), { passive: true });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
  renderAll();
})();
