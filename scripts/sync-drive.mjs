import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataFile = path.join(root, "data", "portfolio-data.js");
const feedFile = path.join(root, "data", "drive-feed.js");
const assetDirectory = path.join(root, "assets", "drive-sync");

const credentialsText = process.env.GOOGLE_DRIVE_CREDENTIALS;
if (!credentialsText) {
  throw new Error("Missing GOOGLE_DRIVE_CREDENTIALS. Add the service-account JSON as a GitHub Actions secret.");
}

const credentials = JSON.parse(credentialsText);
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"]
});
const drive = google.drive({ version: "v3", auth });

const rawData = await fs.readFile(dataFile, "utf8");
const portfolio = JSON.parse(rawData.replace(/^window\.PORTFOLIO_DATA\s*=\s*/, "").replace(/;\s*$/, ""));
const workshopFolderId = portfolio.driveSync?.workshopFolderId;
const stepForwardFolderId = portfolio.driveSync?.stepForwardFolderId;
if (!workshopFolderId || !stepForwardFolderId) throw new Error("Drive sync folder IDs are not configured.");

await fs.mkdir(assetDirectory, { recursive: true });

const knownProjectSourceIds = new Set(
  portfolio.projectGroups.flatMap((group) => group.projects.map((item) => item.source?.id).filter(Boolean))
);
const knownCertificateSourceIds = new Set(
  [...(portfolio.certificates || []), ...(portfolio.stepForwardCertificates || [])]
    .map((item) => item.source?.id)
    .filter(Boolean)
);

async function listChildren(folderId) {
  const files = [];
  let pageToken;
  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken, files(id,name,mimeType,modifiedTime,createdTime,webViewLink)",
      orderBy: "modifiedTime desc",
      pageSize: 1000,
      pageToken
    });
    files.push(...(response.data.files || []));
    pageToken = response.data.nextPageToken;
  } while (pageToken);
  return files;
}

function slug(value) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9ก-๙]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "drive-item";
}

function parseDateFromName(name, fallback) {
  const match = name.match(/(?:^|\s)(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})/);
  if (!match) return (fallback || "").slice(0, 10);
  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function classifyProject(name) {
  const peoplePattern = /(staff|workshop|ฝึกงาน|intern|visit|onsite|engage|engagement|customer training|reskill|training program|crew leader|team|leadership)/i;
  return peoplePattern.test(name) ? "people-development" : "service-development";
}

function genericCopy(groupId) {
  if (groupId === "people-development") {
    return {
      summary: {
        en: "New people-development item synchronized from Siripak-Workshop Training.",
        th: "รายการพัฒนาบุคลากรใหม่ที่ซิงก์จากโฟลเดอร์ Siripak-Workshop Training"
      },
      result: {
        en: "Added automatically for review; update the impact statement in Catalog Manager.",
        th: "เพิ่มอัตโนมัติเพื่อรอตรวจสอบ โดยสามารถปรับข้อความผลกระทบใน Catalog Manager"
      },
      tags: [{ en: "People Development", th: "การพัฒนาบุคลากร" }, { en: "Drive Sync", th: "ซิงก์จาก Drive" }]
    };
  }
  return {
    summary: {
      en: "New service-development item synchronized from Siripak-Workshop Training.",
      th: "รายการพัฒนาบริการใหม่ที่ซิงก์จากโฟลเดอร์ Siripak-Workshop Training"
    },
    result: {
      en: "Added automatically for review; update the impact statement in Catalog Manager.",
      th: "เพิ่มอัตโนมัติเพื่อรอตรวจสอบ โดยสามารถปรับข้อความผลกระทบใน Catalog Manager"
    },
    tags: [{ en: "Service Development", th: "การพัฒนาบริการ" }, { en: "Drive Sync", th: "ซิงก์จาก Drive" }]
  };
}

async function downloadFirstImage(folderId) {
  const children = await listChildren(folderId);
  const image = children.find((file) => file.mimeType?.startsWith("image/"));
  if (!image) return null;
  const extension = image.mimeType === "image/png" ? ".png" : image.mimeType === "image/webp" ? ".webp" : ".jpg";
  const relative = `assets/drive-sync/${image.id}${extension}`;
  const outputPath = path.join(root, relative);
  try {
    const response = await drive.files.get({ fileId: image.id, alt: "media" }, { responseType: "arraybuffer" });
    await fs.writeFile(outputPath, Buffer.from(response.data));
    return relative;
  } catch (error) {
    console.warn(`Could not download preview ${image.name}: ${error.message}`);
    return null;
  }
}

const projects = [];
for (const file of await listChildren(workshopFolderId)) {
  if (file.mimeType !== "application/vnd.google-apps.folder" || knownProjectSourceIds.has(file.id)) continue;
  const groupId = classifyProject(file.name);
  const copy = genericCopy(groupId);
  const image = await downloadFirstImage(file.id);
  projects.push({
    id: `drive-${slug(file.name)}-${file.id.slice(-6)}`,
    groupId,
    visible: true,
    featured: false,
    order: 900,
    date: parseDateFromName(file.name, file.modifiedTime),
    title: { en: file.name, th: file.name },
    ...copy,
    source: {
      type: "drive",
      label: "Google Drive · Auto Sync",
      id: file.id,
      url: file.webViewLink || `https://drive.google.com/drive/folders/${file.id}`
    },
    image: image || "assets/project-dashboard.jpg",
    imageAlt: { en: `Preview of ${file.name}`, th: `ภาพตัวอย่าง ${file.name}` }
  });
}
projects.sort((a, b) => b.date.localeCompare(a.date));
projects.forEach((item, index) => { item.order = 900 + index; });

const stepForwardCertificates = [];
for (const file of await listChildren(stepForwardFolderId)) {
  if (!file.mimeType?.startsWith("image/") || knownCertificateSourceIds.has(file.id)) continue;
  const extension = file.mimeType === "image/png" ? ".png" : file.mimeType === "image/webp" ? ".webp" : ".jpg";
  const relative = `assets/drive-sync/cert-${file.id}${extension}`;
  const outputPath = path.join(root, relative);
  try {
    const response = await drive.files.get({ fileId: file.id, alt: "media" }, { responseType: "arraybuffer" });
    await fs.writeFile(outputPath, Buffer.from(response.data));
  } catch (error) {
    console.warn(`Could not download certificate ${file.name}: ${error.message}`);
    continue;
  }
  const cleanName = file.name
    .replace(/\.(png|jpe?g|webp)$/i, "")
    .replace(/^Siripak-Chattanupakorn[_-]/i, "")
    .replace(/^(Class|Course)-[^-]+-/i, "")
    .replaceAll("_", " ");
  stepForwardCertificates.push({
    id: `drive-cert-${file.id}`,
    visible: true,
    featured: false,
    order: 900,
    title: { en: cleanName, th: cleanName },
    issuer: { en: "STEP FORWARD · Auto Sync", th: "STEP FORWARD · ซิงก์อัตโนมัติ" },
    year: "STEP FORWARD",
    source: {
      type: "drive",
      label: "Google Drive · STEP FORWARD",
      id: file.id,
      url: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`
    },
    image: relative,
    imageAlt: { en: `Certificate preview: ${cleanName}`, th: `ภาพตัวอย่างประกาศนียบัตร: ${cleanName}` }
  });
}
stepForwardCertificates.forEach((item, index) => { item.order = 900 + index; });

const feed = {
  projects,
  stepForwardCertificates,
  generatedAt: new Date().toISOString()
};
await fs.writeFile(feedFile, `window.DRIVE_FEED = ${JSON.stringify(feed, null, 2)};\n`, "utf8");
console.log(`Drive sync complete: ${projects.length} new projects, ${stepForwardCertificates.length} new STEP FORWARD certificates.`);
