# Siripak Chattanupakorn — Portfolio V2

เว็บไซต์ Portfolio แบบ Static สำหรับ GitHub Pages ธีม Navy Blue แบบ Professional รองรับภาษาไทย/อังกฤษ และใช้ระบบ Catalog เพื่อจัดการผลงานโดยไม่ต้องแก้โครงหน้าเว็บ

## โครงสร้างไฟล์

```text
siripak-portfolio-v2/
├── .github/workflows/deploy.yml
├── assets/
│   ├── profile.png
│   ├── SIRIPAK-CHATTANUPAKORN-Resume.pdf
│   └── ...
├── data/
│   └── portfolio-data.js       # ข้อมูลทั้งหมดที่แสดงบนเว็บ
├── catalog.html                # หน้าจัดการ Catalog
├── catalog.css
├── catalog.js
├── drive-source-map.csv        # ตารางเชื่อมโยง Drive/GitHub
├── SOURCE_MAP.md
├── index.html
├── styles.css
├── script.js
├── 404.html
└── README.md
```

## 1) วิธีเลือกว่าจะโชว์อะไรและเรียงอะไรก่อน

เปิดไฟล์:

```text
catalog.html
```

ในหน้า Catalog Manager สามารถ:

- แก้ Hero, About และ Experience ในแท็บ `Profile & Experience`
- ลากการ์ดขึ้น/ลงเพื่อเปลี่ยนลำดับ
- เปิดหรือปิด `Visible`
- เลือก `Highlight`
- แก้ชื่อและรายละเอียดทั้ง TH/EN
- แก้ Source URL และ Google Drive ID
- เพิ่มหรือลบ Project, Certificate และ Activity
- เปิดแท็บ `Drive / Source Map` เพื่อตรวจว่าแต่ละรายการเชื่อมกับไฟล์หรือโฟลเดอร์ใด

เมื่อแก้เสร็จ กด:

```text
Download portfolio-data.js
```

นำไฟล์ที่ดาวน์โหลดไปแทนที่:

```text
data/portfolio-data.js
```

จากนั้น Commit ขึ้น GitHub เว็บจะ Deploy ใหม่อัตโนมัติ

> GitHub Pages เป็นเว็บไซต์ Static จึงไม่สามารถกด Save แล้วเขียนเข้า Repository โดยตรงได้โดยไม่เพิ่มระบบ Login/Backend หน้า Catalog นี้จึงใช้วิธี Export ไฟล์ ซึ่งปลอดภัยและดูแลง่ายกว่า

## 2) วิธีแก้ข้อมูลแบบเร็ว

### วิธีที่ง่ายที่สุด

ใช้ `catalog.html` ตามขั้นตอนด้านบน

### วิธีแก้โดยตรง

เปิดไฟล์:

```text
data/portfolio-data.js
```

แต่ละรายการมีตัวควบคุมหลัก:

```javascript
{
  visible: true,      // false = ไม่แสดงบนเว็บไซต์
  featured: true,     // true = แสดงเป็นผลงานเด่น
  order: 1,           // ตัวเลขน้อยแสดงก่อน
  title: {
    en: "English title",
    th: "ชื่อภาษาไทย"
  },
  source: {
    type: "drive",
    label: "Google Drive · Folder name",
    id: "GOOGLE_DRIVE_FILE_OR_FOLDER_ID",
    url: "https://drive.google.com/..."
  }
}
```

## 3) วิธีดูว่าแต่ละการ์ดเชื่อมกับ Drive อะไร

มี 3 วิธี:

1. เปิด `catalog.html` แล้วเลือก `Drive / Source Map`
2. เปิด `SOURCE_MAP.md`
3. เปิด `drive-source-map.csv` ด้วย Excel หรือ Google Sheets

ในหน้าเว็บสาธารณะ แต่ละ Project / Certificate / Activity จะแสดงชื่อ Source ด้านล่างการ์ด และกดเปิดเอกสารต้นทางได้

## 4) ข้อมูล Resume ล่าสุด

เว็บไซต์ใช้ Resume ล่าสุดจากไฟล์:

```text
assets/SIRIPAK-CHATTANUPAKORN-Resume.pdf
```

เนื้อหาหลักที่อัปเดตแล้ว:

- Current role: Executive, Service Transformation — Jan 2026 to Present
- Coordinating 8+ concurrent healthcare projects
- CES Hub and LINE OA workflow improvement
- 40% YoY revenue-growth contribution
- Mini MBA in Biomedical Engineering
- Bachelor of Biomedical Engineering, Mahidol University
- TOEIC 915

เมื่อต้องการเปลี่ยน Resume ให้แทนที่ไฟล์เดิมโดยใช้ชื่อเดิม เพื่อไม่ต้องแก้ลิงก์ในเว็บไซต์

## 5) ภาษาไทยและอังกฤษ

ปุ่ม `EN / TH` อยู่ด้านขวาบนของเว็บไซต์ ระบบจำภาษาล่าสุดด้วย Browser Local Storage

ข้อความทั้งหมดอยู่ใน `data/portfolio-data.js` เป็นคู่:

```javascript
title: {
  en: "Project Portfolio Coordination",
  th: "การประสานพอร์ตโครงการ"
}
```

## 6) โครงสร้างหน้าเว็บไซต์

1. About — Key success, ability, focus areas และ education
2. Experience
3. Projects
   - People Development
   - Service Development
   - Operation Support
4. Certificates & External Activities
5. Contact

Project แต่ละหมวดเป็น Horizontal Slider มีปุ่มเลื่อนซ้าย/ขวา และรองรับการ Swipe บนมือถือ

## 7) Deploy ขึ้น GitHub Pages

### อัปโหลดผ่านเว็บไซต์ GitHub

1. สร้าง Public Repository เช่น `siripak-portfolio`
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมด รวม `.github`
3. Commit เข้า Branch `main`
4. ไปที่ `Settings → Pages`
5. เลือก `Source: GitHub Actions`
6. เปิดแท็บ `Actions` และรอ Workflow เป็นสีเขียว

URL จะมีรูปแบบ:

```text
https://YOUR-USERNAME.github.io/siripak-portfolio/
```

### อัปเดตผ่าน Command Line

```bash
git add .
git commit -m "Update portfolio catalog"
git push
```

GitHub Actions จะ Deploy ใหม่โดยอัตโนมัติ

## 8) Preview ในเครื่อง

แนะนำให้รัน Local Server:

```bash
python -m http.server 8000
```

เปิด:

```text
http://localhost:8000/
http://localhost:8000/catalog.html
```

## 9) Privacy และ Google Drive

ก่อนเผยแพร่ ให้ตั้ง Share เฉพาะไฟล์หรือโฟลเดอร์ที่ต้องการเปิดเผยเป็น:

```text
Anyone with the link → Viewer
```

ไม่ควรเชื่อมบัตรประชาชน ทะเบียนบ้าน เอกสารเงินเดือน หรือเอกสารภายในที่มีข้อมูลลูกค้า/บริษัท

## V2.1 visual update

- Hero uses the bilingual name and a concise professional key message.
- Every project supports an `image` field in `data/portfolio-data.js`.
- Project cards display Impact before the project description and show the source type/ID.
- Certificate cards display a local certificate preview image.
- Catalog Manager includes fields for project and certificate preview images.

Example:

```javascript
image: "assets/project-example.jpg"
```

Place the image in `assets/`, update the path through `catalog.html`, download the revised data file, and replace `data/portfolio-data.js`.
