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
      areaFocus: "Area focus",
      aboutLabel: "About me",
      focusAreas: "Focus areas",
      focusAreasHint: "Where I create measurable value",
      education: "Education",
      educationHint: "Business and engineering foundation",
      experienceLabel: "Experience",
      experienceTitle: "Experience built around coordination, clarity and execution.",
      experienceSummary: "Healthcare service operations, people development, quality systems and biomedical research.",
      evidenceLabel: "Coursework & work summaries",
      evidenceTitle: "Selected evidence behind the work.",
      evidenceSummary: "University projects, research, business cases and operational summaries.",
      projectsLabel: "Projects",
      projectsTitle: "People and service development with visible impact.",
      projectsSummary: "All selected work is grouped into two practical portfolios and can be sorted by impact or date.",
      credentialsLabel: "Certificates & activities",
      credentialsTitle: "Technical credibility and external learning.",
      credentialsSummary: "Medical-device, ISO/IEC 17025, digital and professional credentials, plus selected external learning.",
      certificates: "Technical & digital certificates",
      certificatesHint: "Selected credentials with certificate previews",
      stepForward: "STEP FORWARD",
      stepForwardHint: "Upskill & reskill certificates",
      externalActivities: "External activities",
      externalActivitiesHint: "Expo · Summit · Visit · Workshop",
      contactLabel: "Contact",
      contactSupport: "Available for healthcare project coordination, service development and digital-improvement opportunities.",
      backToTop: "Back to top ↑",
      featured: "Highlighted",
      result: "Impact",
      viewProject: "View project",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      location: "Location",
      sortImpact: "Impact first",
      sortLatest: "Latest first",
      sourceEvidence: "View project",
      aiLabel: "AI portfolio"
    },
    th: {
      portfolioLabel: "แฟ้มสะสมผลงานวิชาชีพ",
      exploreWork: "ดูผลงาน",
      viewResume: "ดูเรซูเม่",
      areaFocus: "ด้านที่มุ่งเน้น",
      aboutLabel: "เกี่ยวกับฉัน",
      focusAreas: "ความเชี่ยวชาญหลัก",
      focusAreasHint: "ด้านที่สร้างคุณค่าและผลลัพธ์ที่วัดได้",
      education: "การศึกษา",
      educationHint: "พื้นฐานด้านธุรกิจและวิศวกรรม",
      experienceLabel: "ประสบการณ์",
      experienceTitle: "ประสบการณ์ที่ขับเคลื่อนด้วยการประสานงาน ความชัดเจน และการส่งมอบผลลัพธ์",
      experienceSummary: "ครอบคลุมการดำเนินงานบริการสุขภาพ การพัฒนาบุคลากร ระบบคุณภาพ และงานวิจัยชีวการแพทย์",
      evidenceLabel: "ผลงานการศึกษาและสรุปงาน",
      evidenceTitle: "หลักฐานผลงานที่สะท้อนกระบวนการคิดและการทำงาน",
      evidenceSummary: "โครงงานระหว่างการศึกษา งานวิจัย กรณีธุรกิจ และเอกสารสรุปการดำเนินงาน",
      projectsLabel: "ผลงาน",
      projectsTitle: "การพัฒนาคนและบริการที่แสดงผลลัพธ์ได้อย่างชัดเจน",
      projectsSummary: "รวบรวมผลงานเป็น 2 กลุ่มหลัก และเลือกเรียงตามผลกระทบหรือวันที่ได้",
      credentialsLabel: "ประกาศนียบัตรและกิจกรรม",
      credentialsTitle: "ความน่าเชื่อถือทางเทคนิคและการเรียนรู้จากภายนอกองค์กร",
      credentialsSummary: "ประกาศนียบัตรด้านเครื่องมือแพทย์ ISO/IEC 17025 ดิจิทัล และทักษะวิชาชีพ พร้อมกิจกรรมการเรียนรู้ภายนอก",
      certificates: "ประกาศนียบัตรด้านเทคนิคและดิจิทัล",
      certificatesHint: "แสดงภาพตัวอย่างประกาศนียบัตรที่คัดสรร",
      stepForward: "STEP FORWARD",
      stepForwardHint: "ประกาศนียบัตรการพัฒนาทักษะและยกระดับศักยภาพ",
      externalActivities: "กิจกรรมภายนอกองค์กร",
      externalActivitiesHint: "งานแสดงสินค้า · การประชุมสุดยอด · การศึกษาดูงาน · เวิร์กช็อป",
      contactLabel: "ติดต่อ",
      contactSupport: "เปิดรับโอกาสด้านการประสานโครงการสุขภาพ การพัฒนาบริการ และการปรับปรุงงานด้วยดิจิทัล",
      backToTop: "กลับด้านบน ↑",
      featured: "ผลงานเด่น",
      result: "ผลกระทบ",
      viewProject: "ดูรายละเอียดผลงาน",
      email: "อีเมล",
      phone: "โทรศัพท์",
      linkedin: "LinkedIn",
      location: "สถานที่",
      sortImpact: "เรียงตามผลกระทบ",
      sortLatest: "เรียงล่าสุดก่อน",
      sourceEvidence: "ดูรายละเอียดผลงาน",
      aiLabel: "AI Portfolio"
    }
  };

  const projectSortModes = Object.fromEntries((data.projectGroups || []).map((group) => [group.id, "impact"]));

  function mergeDriveFeed() {
    const feed = window.DRIVE_FEED;
    if (!feed) return;
    (feed.projects || []).forEach((item) => {
      const group = data.projectGroups.find((entry) => entry.id === item.groupId);
      if (!group || group.projects.some((project) => project.id === item.id || project.source?.id === item.source?.id)) return;
      group.projects.push(item);
    });
    data.stepForwardCertificates ||= [];
    (feed.stepForwardCertificates || []).forEach((item) => {
      if (data.stepForwardCertificates.some((certificate) => certificate.id === item.id || certificate.source?.id === item.source?.id)) return;
      data.stepForwardCertificates.push(item);
    });
  }
  mergeDriveFeed();

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

  function visibleItems(items = []) {
    return items.filter((item) => item.visible !== false);
  }

  function sortByOrder(items = []) {
    return [...visibleItems(items)].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }

  function sortProjects(items = [], mode = "impact") {
    const list = visibleItems(items);
    if (mode === "latest") {
      return [...list].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || (a.order ?? 999) - (b.order ?? 999));
    }
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (a.order ?? 999) - (b.order ?? 999));
  }

  function isGoogleDriveSource(source) {
    const type = String(source?.type || "").toLowerCase();
    const url = String(source?.url || "").toLowerCase();
    return type === "drive" || url.includes("drive.google.com") || url.includes("docs.google.com");
  }

  function sourceLink(source, compact = false) {
    if (!source?.url) return "";
    if (data.settings.hideGoogleDriveLinks !== false && isGoogleDriveSource(source)) return "";

    const label = localized(source.publicLabel) || UI[language].viewProject || UI[language].sourceEvidence;
    const detail = data.settings.showSourceDetails === true
      ? `<small>${escapeHTML((source.type || "source").toUpperCase())}</small>`
      : "";

    return `
      <a class="source-link public-source-link ${compact ? "compact" : ""}" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">
        <span class="source-copy"><strong>${escapeHTML(label)}</strong>${detail}</span><span aria-hidden="true">↗</span>
      </a>`;
  }

  function credentialPreview(item) {
    const image = `<img class="js-image-fallback" src="${escapeHTML(item.image || "assets/cert-uncertainty.jpg")}" alt="${escapeHTML(localized(item.imageAlt) || localized(item.title))}" loading="lazy"><span>${escapeHTML(item.year || "")}</span>`;
    const source = item.source;
    if (source?.url && !(data.settings.hideGoogleDriveLinks !== false && isGoogleDriveSource(source))) {
      return `<a class="credential-preview" href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${image}</a>`;
    }
    return `<div class="credential-preview credential-preview-static">${image}</div>`;
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
    setText("#heroSecondaryName", localized(data.hero.secondaryName));
    setText("#heroLead", localized(data.hero.lead));
    document.querySelector("#resumeButton").hidden = data.settings.showResume === false;
    document.querySelector("#resumeButton").href = data.meta.resumeUrl;
    document.querySelector("#heroMetrics").innerHTML = data.hero.metrics.map((metric) => `
      <div class="metric-card">
        <strong>${escapeHTML(metric.value)}</strong>
        <span>${escapeHTML(localized(metric.label))}</span>
      </div>`).join("");
    document.querySelector("#heroFocusList").innerHTML = (data.hero.areaFocus || []).map((item) => `
      <div class="hero-focus-item"><span aria-hidden="true">✓</span><strong>${escapeHTML(localized(item))}</strong></div>`).join("");
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


  function renderAIPortfolio() {
    if (!data.aiPortfolio) return;
    setText("#aiHeading", localized(data.aiPortfolio.heading));
    setText("#aiSummary", localized(data.aiPortfolio.summary));
    setText("#aiToolsHeading", localized(data.aiPortfolio.toolsHeading));
    setText("#aiToolsHint", localized(data.aiPortfolio.toolsHint));
    setText("#aiShowcasesHeading", localized(data.aiPortfolio.showcasesHeading));
    setText("#aiShowcasesHint", localized(data.aiPortfolio.showcasesHint));

    const levelScore = { beginner: 1, intermediate: 2, advanced: 3 };
    const toolsGrid = document.querySelector("#aiToolsGrid");
    if (toolsGrid) {
      toolsGrid.innerHTML = (data.aiPortfolio.tools || []).map((tool) => {
        const score = levelScore[tool.level] || 1;
        const levelBars = [1, 2, 3].map((value) =>
          `<span class="${value <= score ? "active" : ""}"></span>`
        ).join("");
        return `
          <article class="ai-tool-card">
            <div class="ai-tool-head">
              <div class="ai-tool-title">
                <h4>${escapeHTML(tool.name)}</h4>
                <div class="ai-competency" aria-label="${escapeHTML(localized(tool.levelLabel))}">
                  <span class="ai-level-icon" aria-hidden="true">${levelBars}</span>
                  <strong>${escapeHTML(localized(tool.levelLabel))}</strong>
                </div>
              </div>
              <span class="ai-tool-badge">${escapeHTML(localized(tool.category))}</span>
            </div>
            <p>${escapeHTML(localized(tool.summary))}</p>
          </article>`;
      }).join("");
    }

    const showcaseGrid = document.querySelector("#aiShowcasesGrid");
    if (showcaseGrid) {
      showcaseGrid.innerHTML = (data.aiPortfolio.showcases || []).map((item) => `
        <article class="ai-showcase-card">
          <div class="ai-showcase-visual">
            <img class="js-image-fallback" src="${escapeHTML(item.image || "assets/project-dashboard.jpg")}" alt="${escapeHTML(localized(item.title))}" loading="lazy">
          </div>
          <div class="ai-showcase-copy">
            <h4>${escapeHTML(localized(item.title))}</h4>
            <p>${escapeHTML(localized(item.summary))}</p>
            <div class="tag-row">${(item.tools || []).map((tool) => `<span class="tag">${escapeHTML(tool)}</span>`).join("")}</div>
          </div>
        </article>`).join("");
    }
  }

  function renderExperience() {
    document.querySelector("#experienceList").innerHTML = sortByOrder(data.experience).map((item) => `
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

  function renderKnowledge() {
    const container = document.querySelector("#knowledgeGroups");
    container.innerHTML = (data.knowledgeSections || []).map((group) => `
      <section class="knowledge-group reveal">
        <div class="knowledge-group-head">
          <div><h3>${escapeHTML(localized(group.title))}</h3><p>${escapeHTML(localized(group.intro))}</p></div>
        </div>
        <div class="knowledge-grid">
          ${sortByOrder(group.items).map((item) => `
            <article class="knowledge-card">
              <div class="knowledge-icon" aria-hidden="true">↗</div>
              <h4>${escapeHTML(localized(item.title))}</h4>
              <p>${escapeHTML(localized(item.summary))}</p>
              ${sourceLink(item.source, true)}
            </article>`).join("")}
        </div>
      </section>`).join("");
  }

  function projectCard(project, index) {
    return `
      <article class="project-card ${project.featured ? "featured" : ""}">
        <div class="project-visual">
          <img class="js-image-fallback" src="${escapeHTML(project.image || "assets/project-dashboard.jpg")}" alt="${escapeHTML(localized(project.imageAlt) || localized(project.title))}" loading="lazy">
          <div class="project-visual-overlay">
            <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
            ${project.featured ? `<span class="featured-label">${escapeHTML(UI[language].featured)}</span>` : ""}
          </div>
        </div>
        <div class="project-content">
          <div class="project-date">${escapeHTML(project.date || "")}</div>
          <h4>${escapeHTML(localized(project.title))}</h4>
          <p class="project-result"><strong>${escapeHTML(UI[language].result)}</strong><span>${escapeHTML(localized(project.result))}</span></p>
          <p class="project-summary">${escapeHTML(localized(project.summary))}</p>
          <div class="tag-row">${(project.tags || []).map((tag) => `<span class="tag">${escapeHTML(localized(tag))}</span>`).join("")}</div>
          ${sourceLink(project.source)}
        </div>
      </article>`;
  }

  function renderProjects() {
    document.querySelector("#projectGroups").innerHTML = data.projectGroups.map((group) => {
      const trackId = `track-${group.id}`;
      const mode = projectSortModes[group.id] || "impact";
      const cards = sortProjects(group.projects, mode).map(projectCard).join("");
      return `
        <section class="project-group reveal" aria-labelledby="heading-${escapeHTML(group.id)}">
          <div class="project-group-head">
            <div class="project-group-title">
              <h3 id="heading-${escapeHTML(group.id)}">${escapeHTML(localized(group.title))}</h3>
              <p>${escapeHTML(localized(group.intro))}</p>
            </div>
            <div class="project-group-actions">
              <div class="sort-switch" role="group" aria-label="Project sorting">
                <button type="button" data-project-sort="impact" data-group-id="${escapeHTML(group.id)}" class="${mode === "impact" ? "active" : ""}">${escapeHTML(UI[language].sortImpact)}</button>
                <button type="button" data-project-sort="latest" data-group-id="${escapeHTML(group.id)}" class="${mode === "latest" ? "active" : ""}">${escapeHTML(UI[language].sortLatest)}</button>
              </div>
              <div class="slider-controls" data-slider-controls="${trackId}">
                <button type="button" data-direction="prev" aria-label="Previous">←</button>
                <button type="button" data-direction="next" aria-label="Next">→</button>
              </div>
            </div>
          </div>
          <div class="horizontal-track" id="${trackId}">${cards}</div>
        </section>`;
    }).join("");
  }

  function credentialCards(items) {
    return sortByOrder(items).map((item) => `
      <article class="credential-card">
        ${credentialPreview(item)}
        <div class="credential-content">
          <div class="card-meta"><span class="card-type">${item.featured ? escapeHTML(UI[language].featured) : escapeHTML(localized(item.issuer))}</span></div>
          <h4>${escapeHTML(localized(item.title))}</h4>
          <p>${escapeHTML(localized(item.issuer))}</p>
          ${sourceLink(item.source)}
        </div>
      </article>`).join("");
  }

  function renderCredentials() {
    document.querySelector("#certificatesTrack").innerHTML = credentialCards(data.certificates);
    document.querySelector("#stepForwardTrack").innerHTML = credentialCards(data.stepForwardCertificates || []);
    document.querySelector("#activitiesTrack").innerHTML = sortByOrder(data.activities).map((item) => `
      <article class="activity-card activity-card-visual">
        <div class="activity-visual">
          <img class="js-image-fallback" src="${escapeHTML(item.image || "assets/project-dashboard.jpg")}" alt="${escapeHTML(localized(item.imageAlt) || localized(item.title))}" loading="lazy">
        </div>
        <div class="activity-content">
          <div class="card-meta"><span>${escapeHTML(item.date)}</span><span class="card-type">${escapeHTML(localized(item.type))}</span></div>
          <h4>${escapeHTML(localized(item.title))}</h4>
          <p>${escapeHTML(localized(item.summary))}</p>
          ${sourceLink(item.source)}
        </div>
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
    renderKnowledge();
    renderAIPortfolio();
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

    document.querySelectorAll(".js-image-fallback").forEach((image) => {
      if (image.dataset.fallbackReady) return;
      image.dataset.fallbackReady = "true";
      image.addEventListener("error", () => {
        if (image.src.endsWith("project-dashboard.jpg")) return;
        image.src = image.closest(".credential-card") ? "assets/cert-uncertainty.jpg" : "assets/project-dashboard.jpg";
      }, { once: true });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
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

  document.addEventListener("click", (event) => {
    const sortButton = event.target.closest("button[data-project-sort]");
    if (!sortButton) return;
    projectSortModes[sortButton.dataset.groupId] = sortButton.dataset.projectSort;
    renderProjects();
    activateInteractions();
  });

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
