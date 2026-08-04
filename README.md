# Siripak Chattanupakorn — Professional Portfolio V2.3

เว็บไซต์ Portfolio แบบ Static Site สำหรับ GitHub Pages ธีม Professional Blue รองรับภาษาอังกฤษและภาษาไทย

## สิ่งที่เพิ่มใน V2.2

- Hero เปลี่ยนรูปโปรไฟล์เป็นกรอบวงกลม พร้อม Area Focus แบบมืออาชีพ
- Projects แบ่งเหลือ 2 กลุ่มหลัก: People Development และ Service Development
- เพิ่ม Project ที่พบจาก Siripak-Workshop Training, Work Summaries และโฟลเดอร์กิจกรรมที่เกี่ยวข้อง
- เรียง Project ได้สองแบบ: Impact first และ Latest first
- เพิ่ม University Coursework และ Work Summaries
- เพิ่ม STEP FORWARD แยกเป็นแถวประกาศนียบัตร พร้อมภาพ Preview
- ปรับคำแปลภาษาไทยใหม่ให้เป็นภาษาธุรกิจที่เป็นธรรมชาติ
- Catalog Manager รองรับ Projects, Technical Certificates, STEP FORWARD, Coursework, Work Summaries และ Activities
- มี Workflow สำหรับ Sync ข้อมูลใหม่จาก Google Drive อัตโนมัติ

## เปิดดูในเครื่อง

เปิด Terminal ที่โฟลเดอร์นี้แล้วรัน:

```bash
python -m http.server 8000
```

จากนั้นเปิด:

```text
http://localhost:8000
```

Catalog Manager:

```text
http://localhost:8000/catalog.html
```

## Deploy ด้วย GitHub Pages

1. อัปโหลดไฟล์ทั้งหมดไปยัง Repository โดยให้ `index.html` อยู่ที่ root
2. ไปที่ `Settings → Pages`
3. เลือก `Source: GitHub Actions`
4. เปิดแท็บ `Actions` และรอ Workflow `Deploy portfolio to GitHub Pages` ทำงานเสร็จ

ทุกครั้งที่ Push เข้า branch `main` เว็บไซต์จะ Deploy ใหม่อัตโนมัติ

## แก้ข้อมูลแบบง่าย

เปิด `catalog.html` แล้วแก้ข้อมูล ลากเรียง เปิด/ปิด Visible หรือ Highlight จากนั้นกด:

```text
Download portfolio-data.js
```

นำไฟล์ที่ได้ไปแทนที่:

```text
data/portfolio-data.js
```

แล้ว Commit และ Push ขึ้น GitHub

## Sync จาก Google Drive อัตโนมัติ

เว็บไซต์ Static ไม่สามารถอ่าน Google Drive ส่วนตัวโดยตรงจาก Browser ได้ จึงมี GitHub Action ชื่อ:

```text
.github/workflows/sync-drive.yml
```

Workflow จะอ่าน:

- `Siripak-Workshop Training`
- `STEPFORWARD`

แล้วสร้างข้อมูลเพิ่มใน:

```text
data/drive-feed.js
assets/drive-sync/
```

### ตั้งค่า Google Drive Service Account

1. สร้าง Project ใน Google Cloud
2. เปิด Google Drive API
3. สร้าง Service Account และดาวน์โหลด JSON Key
4. แชร์สองโฟลเดอร์ Drive ให้ Email ของ Service Account เป็น Viewer
5. ใน GitHub Repository ไปที่ `Settings → Secrets and variables → Actions`
6. เพิ่ม Secret ชื่อ:

```text
GOOGLE_DRIVE_CREDENTIALS
```

7. วาง JSON Key ทั้งหมดเป็นค่า Secret
8. ไปที่ `Actions → Sync portfolio from Google Drive → Run workflow`

ระบบจะตรวจทุกวันเวลา 08:15 น. ตามเวลาไทย และ Commit รายการใหม่ให้อัตโนมัติ

รายการที่ Sync อัตโนมัติจะใช้ข้อความเบื้องต้นก่อน ควรเปิด Catalog Manager เพื่อปรับ Impact และคำแปลให้เหมาะกับ Portfolio

## โครงสร้างสำคัญ

```text
index.html                         หน้า Portfolio
styles.css                        รูปแบบเว็บไซต์
script.js                         Render, ภาษา, Slider และ Sort
catalog.html / catalog.js         ระบบจัดการ Content

data/portfolio-data.js           ข้อมูลหลักที่แก้ด้วย Catalog
data/drive-feed.js                ข้อมูลใหม่จาก Drive Sync

scripts/sync-drive.mjs            Script อ่าน Google Drive
.github/workflows/deploy.yml      Deploy GitHub Pages
.github/workflows/sync-drive.yml  Sync Google Drive

SOURCE_MAP.md                     ตารางเชื่อมโยง Source
drive-source-map.csv              Source Map สำหรับ Excel
```

## ความเป็นส่วนตัว

ก่อนเปิดเว็บไซต์สาธารณะ ควรตรวจว่าลิงก์ Drive เชื่อมเฉพาะเอกสารที่อนุญาตให้เปิดเผย และไม่ควรใส่บัตรประชาชน ทะเบียนบ้าน Transcript ฉบับเต็ม หรือข้อมูลส่วนบุคคลที่ไม่จำเป็น


## Public link privacy

The public website does not display Google Drive links, Drive IDs, file IDs, folder IDs, or source-detail footers. Certificate previews sourced from Drive are rendered as non-clickable images. Internal source metadata remains in the data files only for catalog management and optional Drive Sync.

Settings in `data/portfolio-data.js`:

```js
settings: {
  hideGoogleDriveLinks: true,
  showSourceDetails: false
}
```


## Update v2.4 AI Portfolio
- Added bilingual AI Portfolio section
- Added AI tool usage cards and AI-supported work examples
- Updated People Development and Service Development project covers
- Kept Google Drive detail links hidden from the public portfolio

## Update v2.5 AI competency and project covers

- Expanded AI-supported output gallery to 9 visual examples.
- Added competency-level indicators for all AI tools.
- Added UTH Daily Medical Equipment Check Dashboard.
- Updated People Development covers for New Staff Training, Staff Guideline, Leadership Journey and Competency Training.
- Updated Service Development covers for Infusion Pump Rental, NEBB, LINE OA, Check Stock, Car Booking and Service CSI.
- Public Google Drive links and Drive IDs remain hidden.
