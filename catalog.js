(() => {
  "use strict";

  const STORAGE_KEY = "siripak-portfolio-catalog-draft-v2";
  const original = structuredClone(window.PORTFOLIO_DATA);
  const stored = localStorage.getItem(STORAGE_KEY);
  let state = stored ? JSON.parse(stored) : structuredClone(original);
  let activeTab = "profile";
  const content = document.querySelector("#catalogContent");
  const title = document.querySelector("#panelTitle");
  const hint = document.querySelector("#panelHint");
  const addButton = document.querySelector("#addItem");

  const tabInfo = {
    profile: ["Profile & Experience", "แก้ข้อความหลัก About และเรียงลำดับประสบการณ์"],
    projects: ["Projects", "ลากการ์ดเพื่อเรียงลำดับ และเลือก Visible / Highlight"],
    certificates: ["Certificates", "จัดลำดับประกาศนียบัตรและตรวจลิงก์เอกสาร"],
    activities: ["Activities", "เลือกเฉพาะ Expo / Summit / Visit / Workshop ที่ต้องการโชว์"],
    sources: ["Drive / Source Map", "ดูว่าแต่ละรายการเชื่อมกับ Drive, GitHub หรือ Resume ใด"],
    settings: ["Settings", "ตั้งค่าข้อมูลติดต่อและการแสดงผลทั่วไป"]
  };

  const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  function toast(message) {
    const element = document.querySelector("#toast");
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove("show"), 2200);
  }

  function saveDraft(message = "บันทึก Draft แล้ว") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    toast(message);
  }

  function field(label, path, value, multiline = false) {
    if (multiline) return `<div class="field full"><label>${label}</label><textarea data-path="${escapeHTML(path)}">${escapeHTML(value || "")}</textarea></div>`;
    return `<div class="field"><label>${label}</label><input type="text" value="${escapeHTML(value || "")}" data-path="${escapeHTML(path)}"></div>`;
  }

  function editorFields(item, path, kind) {
    if (kind === "experience") {
      return [
        field("Role EN", `${path}.role.en`, item.role?.en || ""),
        field("Role TH", `${path}.role.th`, item.role?.th || ""),
        field("Company", `${path}.company`, item.company || ""),
        field("Period", `${path}.period`, item.period || ""),
        field("Summary EN", `${path}.summary.en`, item.summary?.en || "", true),
        field("Summary TH", `${path}.summary.th`, item.summary?.th || "", true)
      ].join("");
    }
    const common = [
      field("Title EN", `${path}.title.en`, item.title?.en || ""),
      field("Title TH", `${path}.title.th`, item.title?.th || "")
    ];
    if (kind === "project") {
      common.push(
        field("Summary EN", `${path}.summary.en`, item.summary?.en || "", true),
        field("Summary TH", `${path}.summary.th`, item.summary?.th || "", true),
        field("Result EN", `${path}.result.en`, item.result?.en || "", true),
        field("Result TH", `${path}.result.th`, item.result?.th || "", true)
      );
    }
    if (kind === "certificate") {
      common.push(
        field("Issuer EN", `${path}.issuer.en`, item.issuer?.en || ""),
        field("Issuer TH", `${path}.issuer.th`, item.issuer?.th || ""),
        field("Year", `${path}.year`, item.year || "")
      );
    }
    if (kind === "activity") {
      common.push(
        field("Type EN", `${path}.type.en`, item.type?.en || ""),
        field("Type TH", `${path}.type.th`, item.type?.th || ""),
        field("Date", `${path}.date`, item.date || ""),
        field("Summary EN", `${path}.summary.en`, item.summary?.en || "", true),
        field("Summary TH", `${path}.summary.th`, item.summary?.th || "", true)
      );
    }
    common.push(
      field("Source label", `${path}.source.label`, item.source?.label || ""),
      field("Source ID", `${path}.source.id`, item.source?.id || ""),
      field("Source URL", `${path}.source.url`, item.source?.url || "", true)
    );
    return common.join("");
  }

  function catalogItem(item, path, kind, groupKey) {
    const displayTitle = kind === "experience" ? item.role?.en : item.title?.en;
    const displaySource = kind === "experience" ? `${item.company || ""} · ${item.period || ""}` : (item.source?.label || "No source linked");
    const highlightToggle = kind === "experience" ? "" : `<label class="switch-label"><input type="checkbox" data-toggle="featured" ${item.featured ? "checked" : ""}> Highlight</label>`;
    return `
      <article class="catalog-item" draggable="true" data-path="${escapeHTML(path)}" data-group="${escapeHTML(groupKey)}">
        <div class="item-summary">
          <span class="drag-handle" title="ลากเพื่อเรียง">⋮⋮</span>
          <div class="item-title">
            <strong>${escapeHTML(displayTitle || "Untitled")}</strong>
            <span>${escapeHTML(displaySource)}</span>
          </div>
          <div class="item-actions">
            <label class="switch-label"><input type="checkbox" data-toggle="visible" ${item.visible !== false ? "checked" : ""}> Visible</label>
            ${highlightToggle}
            <button type="button" data-action="edit">Edit</button>
            <button type="button" class="delete" data-action="delete">Delete</button>
          </div>
        </div>
        <div class="item-editor"><div class="field-grid">${editorFields(item, path, kind)}</div></div>
      </article>`;
  }


  function renderProfile() {
    const generalFields = `
      <div class="settings-card" style="max-width:none;margin-bottom:22px">
        <div class="group-heading"><h3>Hero & About text</h3><span>TH / EN</span></div>
        <div class="field-grid">
          ${field("Hero kicker EN", "hero.kicker.en", state.hero.kicker.en)}
          ${field("Hero kicker TH", "hero.kicker.th", state.hero.kicker.th)}
          ${field("Hero title EN", "hero.title.en", state.hero.title.en, true)}
          ${field("Hero title TH", "hero.title.th", state.hero.title.th, true)}
          ${field("Hero lead EN", "hero.lead.en", state.hero.lead.en, true)}
          ${field("Hero lead TH", "hero.lead.th", state.hero.lead.th, true)}
          ${field("Current role EN", "hero.role.en", state.hero.role.en)}
          ${field("Current role TH", "hero.role.th", state.hero.role.th)}
          ${field("About heading EN", "about.heading.en", state.about.heading.en, true)}
          ${field("About heading TH", "about.heading.th", state.about.heading.th, true)}
          ${field("About summary EN", "about.summary.en", state.about.summary.en, true)}
          ${field("About summary TH", "about.summary.th", state.about.summary.th, true)}
        </div>
      </div>
      <section class="catalog-group">
        <div class="group-heading"><h3>Experience</h3><span>${state.experience.length} roles</span></div>
        <div class="item-list" data-group="experience">
          ${state.experience.sort((a,b) => (a.order ?? 999) - (b.order ?? 999)).map((item,index) => catalogItem(item, `experience.${index}`, "experience", "experience")).join("")}
        </div>
      </section>`;
    content.innerHTML = generalFields;
  }

  function renderProjects() {
    content.innerHTML = state.projectGroups.map((group, groupIndex) => `
      <section class="catalog-group">
        <div class="group-heading"><h3>${escapeHTML(group.title.en)}</h3><span>${group.projects.length} items</span></div>
        <div class="item-list" data-group="projects-${groupIndex}">
          ${group.projects.sort((a,b) => (a.order ?? 999) - (b.order ?? 999)).map((item, index) => catalogItem(item, `projectGroups.${groupIndex}.projects.${index}`, "project", `projects-${groupIndex}`)).join("")}
        </div>
      </section>`).join("");
  }

  function renderFlat(collectionName, kind) {
    const list = state[collectionName].sort((a,b) => (a.order ?? 999) - (b.order ?? 999));
    content.innerHTML = `<div class="item-list" data-group="${collectionName}">${list.map((item, index) => catalogItem(item, `${collectionName}.${index}`, kind, collectionName)).join("")}</div>`;
  }

  function collectSources() {
    const rows = [];
    state.projectGroups.forEach((group) => group.projects.forEach((item) => rows.push({ section: group.title.en, item: item.title.en, source: item.source })));
    state.certificates.forEach((item) => rows.push({ section: "Certificate", item: item.title.en, source: item.source }));
    state.activities.forEach((item) => rows.push({ section: "Activity", item: item.title.en, source: item.source }));
    return rows.filter((row) => row.source);
  }

  function renderSources() {
    content.innerHTML = `<table class="source-table">
      <thead><tr><th>Section</th><th>Catalog item</th><th>Source</th><th>ID / Repository</th><th>Link</th></tr></thead>
      <tbody>${collectSources().map((row) => `<tr>
        <td>${escapeHTML(row.section)}</td>
        <td>${escapeHTML(row.item)}</td>
        <td>${escapeHTML(row.source.label || row.source.type || "-")}</td>
        <td><code>${escapeHTML(row.source.id || "-")}</code></td>
        <td>${row.source.url ? `<a href="${escapeHTML(row.source.url)}" target="_blank" rel="noopener noreferrer">Open ↗</a>` : "-"}</td>
      </tr>`).join("")}</tbody>
    </table>`;
  }

  function renderSettings() {
    content.innerHTML = `<div class="settings-card">
      <div class="setting-row"><div><strong>Show phone number</strong><span>แสดงเบอร์โทรในหน้า Contact</span></div><input type="checkbox" data-setting="showPhone" ${state.settings.showPhone ? "checked" : ""}></div>
      <div class="setting-row"><div><strong>Show résumé button</strong><span>แสดงปุ่มดาวน์โหลด Resume ล่าสุด</span></div><input type="checkbox" data-setting="showResume" ${state.settings.showResume ? "checked" : ""}></div>
      <div class="setting-row"><div><strong>Show source labels</strong><span>แสดงชื่อ Google Drive / GitHub ใต้การ์ด</span></div><input type="checkbox" data-setting="showSourceLabels" ${state.settings.showSourceLabels ? "checked" : ""}></div>
      <div class="field-grid" style="margin-top:18px">
        ${field("Email", "contact.email", state.contact.email)}
        ${field("Phone", "contact.phone", state.contact.phone)}
        ${field("LinkedIn URL", "contact.linkedin", state.contact.linkedin, true)}
      </div>
    </div>`;
  }

  function render() {
    [title.textContent, hint.textContent] = tabInfo[activeTab];
    addButton.hidden = ["sources", "settings"].includes(activeTab);
    if (activeTab === "profile") renderProfile();
    if (activeTab === "projects") renderProjects();
    if (activeTab === "certificates") renderFlat("certificates", "certificate");
    if (activeTab === "activities") renderFlat("activities", "activity");
    if (activeTab === "sources") renderSources();
    if (activeTab === "settings") renderSettings();
    bindDragAndDrop();
  }

  function getByPath(path) {
    return path.split(".").reduce((value, key) => value?.[Number.isNaN(Number(key)) ? key : Number(key)], state);
  }

  function setByPath(path, value) {
    const keys = path.split(".");
    const last = keys.pop();
    const parent = keys.reduce((current, key) => current[Number.isNaN(Number(key)) ? key : Number(key)], state);
    parent[Number.isNaN(Number(last)) ? last : Number(last)] = value;
  }

  function removeByPath(path) {
    const keys = path.split(".");
    const index = Number(keys.pop());
    const parent = keys.reduce((current, key) => current[Number.isNaN(Number(key)) ? key : Number(key)], state);
    parent.splice(index, 1);
    parent.forEach((item, i) => item.order = i + 1);
  }

  function bindDragAndDrop() {
    let dragging = null;
    document.querySelectorAll(".catalog-item").forEach((item) => {
      item.addEventListener("dragstart", () => { dragging = item; item.classList.add("dragging"); });
      item.addEventListener("dragend", () => { item.classList.remove("dragging"); dragging = null; applyDomOrder(item.closest(".item-list")); });
    });
    document.querySelectorAll(".item-list").forEach((list) => {
      list.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (!dragging || dragging.dataset.group !== list.dataset.group) return;
        const after = [...list.querySelectorAll(".catalog-item:not(.dragging)")].find((element) => {
          const box = element.getBoundingClientRect();
          return event.clientY < box.top + box.height / 2;
        });
        list.insertBefore(dragging, after || null);
      });
    });
  }

  function applyDomOrder(list) {
    if (!list) return;
    const paths = [...list.querySelectorAll(".catalog-item")].map((item) => item.dataset.path);
    const items = paths.map(getByPath);
    items.forEach((item, index) => item.order = index + 1);
    if (list.dataset.group === "experience") {
      state.experience = items;
    } else if (list.dataset.group.startsWith("projects-")) {
      const groupIndex = Number(list.dataset.group.split("-").pop());
      state.projectGroups[groupIndex].projects = items;
    } else {
      state[list.dataset.group] = items;
    }
    saveDraft("เรียงลำดับแล้ว");
    render();
  }

  content.addEventListener("click", (event) => {
    const item = event.target.closest(".catalog-item");
    const action = event.target.closest("button[data-action]")?.dataset.action;
    if (!item || !action) return;
    if (action === "edit") item.classList.toggle("open");
    if (action === "delete" && confirm("ลบรายการนี้ออกจาก Catalog?")) {
      removeByPath(item.dataset.path);
      saveDraft("ลบรายการแล้ว");
      render();
    }
  });

  content.addEventListener("change", (event) => {
    const item = event.target.closest(".catalog-item");
    if (item && event.target.dataset.toggle) {
      const target = getByPath(item.dataset.path);
      target[event.target.dataset.toggle] = event.target.checked;
      saveDraft("อัปเดตการแสดงผลแล้ว");
      return;
    }
    if (event.target.dataset.path) {
      setByPath(event.target.dataset.path, event.target.value);
      saveDraft("อัปเดตข้อมูลแล้ว");
      return;
    }
    if (event.target.dataset.setting) {
      state.settings[event.target.dataset.setting] = event.target.checked;
      saveDraft("อัปเดต Settings แล้ว");
    }
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      activeTab = button.dataset.tab;
      render();
    });
  });

  addButton.addEventListener("click", () => {
    const template = {
      id: `new-${Date.now()}`,
      visible: true,
      featured: false,
      order: 999,
      title: { en: "New item", th: "รายการใหม่" },
      source: { type: "drive", label: "Google Drive", id: "", url: "" }
    };
    if (activeTab === "profile") {
      state.experience.push({
        id: `experience-${Date.now()}`,
        visible: true,
        order: 999,
        role: { en: "New role", th: "ตำแหน่งใหม่" },
        company: "Company — Location",
        period: "Start — End",
        summary: { en: "", th: "" },
        bullets: []
      });
    }
    if (activeTab === "projects") {
      const groupChoice = Number(prompt("เลือกกลุ่ม: 1 = People Development, 2 = Service Development, 3 = Operation Support", "1")) - 1;
      const groupIndex = Number.isInteger(groupChoice) && groupChoice >= 0 && groupChoice < state.projectGroups.length ? groupChoice : 0;
      template.summary = { en: "", th: "" };
      template.result = { en: "", th: "" };
      template.tags = [];
      state.projectGroups[groupIndex].projects.push(template);
    }
    if (activeTab === "certificates") {
      template.issuer = { en: "", th: "" };
      template.year = new Date().getFullYear().toString();
      state.certificates.push(template);
    }
    if (activeTab === "activities") {
      template.type = { en: "Workshop", th: "Workshop" };
      template.date = "";
      template.summary = { en: "", th: "" };
      state.activities.push(template);
    }
    saveDraft("เพิ่มรายการใหม่แล้ว");
    render();
  });

  document.querySelector("#saveDraft").addEventListener("click", () => saveDraft());
  document.querySelector("#resetDraft").addEventListener("click", () => {
    if (!confirm("ล้าง Draft และกลับไปข้อมูลต้นฉบับ?")) return;
    state = structuredClone(original);
    localStorage.removeItem(STORAGE_KEY);
    render();
    toast("Reset เรียบร้อย");
  });

  document.querySelector("#exportData").addEventListener("click", () => {
    state.meta.updated = new Date().toISOString().slice(0, 10);
    const file = `window.PORTFOLIO_DATA = ${JSON.stringify(state, null, 2)};\n`;
    const blob = new Blob([file], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "portfolio-data.js";
    anchor.click();
    URL.revokeObjectURL(url);
    toast("ดาวน์โหลด portfolio-data.js แล้ว");
  });

  render();
})();
