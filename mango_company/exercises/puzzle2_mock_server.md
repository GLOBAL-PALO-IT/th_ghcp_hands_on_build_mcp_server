# 🧩 Puzzle 2: ตั้งค่า Mock HTTP Server

## 📖 เป้าหมาย
ตั้งค่า **Mock HTTP Server** เพื่อจำลอง API ของ Mango Company บน `localhost:3000`
Tool ทั้งหมดใน MCP Server จะเรียก API นี้เพื่อดึงข้อมูล

## 🔧 ทำไมต้องมี Mock Server?

Mango Company MCP Server ต่างจาก Weather Checker ตรงที่ไม่ได้ใช้ public API บน internet
แต่ใช้ **HTTP Remote API** บน localhost — ดังนั้นต้องรัน Mock Server ก่อนเพื่อจำลองข้อมูล

---

## ✏️ ส่วนที่ 1: สร้างไฟล์ `mock-server.js`

สร้างไฟล์ `mock-server.js` ที่ **root ของโฟลเดอร์ `mango_company/`** แล้ววางโค้ดนี้:

```javascript
const http = require('http');

const mockData = {
  codeReviews: [
    { id: 'CR001', title: 'Review Authentication System', author: 'Alice', date: '2024-03-01' },
    { id: 'CR002', title: 'Review Database Design', author: 'Bob', date: '2024-03-02' },
    { id: 'CR003', title: 'Review API Endpoints', author: 'Charlie', date: '2024-03-03' },
  ],
  projects: {
    java: {
      name: 'Java Backend Service',
      description: 'Main backend API service built with Spring Boot',
      folders: ['src', 'config', 'models', 'controllers', 'services', 'tests'],
      files: ['pom.xml', 'application.properties', 'Main.java', 'WebConfig.java'],
    },
    react: {
      name: 'React Frontend App',
      description: 'Main user-facing React application',
      folders: ['src', 'public', 'tests', 'components', 'hooks', 'pages'],
      files: ['App.tsx', 'index.tsx', 'package.json', 'tsconfig.json'],
    },
    flutter: {
      name: 'Flutter Mobile App',
      description: 'Cross-platform mobile application',
      folders: ['lib', 'test', 'assets', 'android', 'ios'],
      files: ['main.dart', 'pubspec.yaml', 'pubspec.lock'],
    },
  },
  teamMembers: {
    john_dev: {
      id: 'T001',
      name: 'John Developer',
      role: 'Senior React Developer',
      email: 'john@mangodev.com',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      projects: ['Frontend App', 'Admin Dashboard'],
    },
    alice_backend: {
      id: 'T002',
      name: 'Alice Backend',
      role: 'Java Backend Engineer',
      email: 'alice@mangodev.com',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      projects: ['API Service', 'Payment System'],
    },
    bob_mobile: {
      id: 'T003',
      name: 'Bob Mobile',
      role: 'Flutter Developer',
      email: 'bob@mangodev.com',
      skills: ['Flutter', 'Dart', 'iOS', 'Android'],
      projects: ['Mobile App', 'Offline Sync'],
    },
  },
};

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/api/code-reviews') {
    res.writeHead(200);
    res.end(JSON.stringify({
      result: 'success',
      data: mockData.codeReviews,
    }));
  } else if (req.url.startsWith('/api/projects/')) {
    const language = req.url.split('/').pop().toLowerCase();
    const project = mockData.projects[language];
    if (project) {
      res.writeHead(200);
      res.end(JSON.stringify({
        result: 'success',
        language: language,
        structure: project,
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ result: 'error', message: 'Language not found' }));
    }
  } else if (req.url.startsWith('/api/team/')) {
    const member = req.url.split('/').pop().toLowerCase();
    const memberData = mockData.teamMembers[member];
    if (memberData) {
      res.writeHead(200);
      res.end(JSON.stringify({
        result: 'success',
        member: memberData,
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ result: 'error', message: 'Member not found' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ result: 'error', message: 'Endpoint not found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Mock Mango Company API running on http://localhost:${PORT}`);
});
```

---

## ✏️ ส่วนที่ 2: รัน Mock Server

เปิด **Terminal ใหม่** (แยกจาก terminal ที่ใช้ build MCP Server) แล้วรัน:

```bash
cd mango_company
node mock-server.js
```

ควรเห็น output:
```
Mock Mango Company API running on http://localhost:3000
```

> ⚠️ **สำคัญ:** ต้องเปิด Mock Server ทิ้งไว้ตลอดขณะทำ Puzzle 3-5 เพราะ MCP Tool จะเรียก API จาก server นี้

---

## ✏️ ส่วนที่ 3: ทดสอบ API Endpoints

เปิด **Terminal อีกหน้าต่าง** แล้วทดสอบด้วย `curl`:

```bash
# ทดสอบ List Code Reviews
curl http://localhost:3000/api/code-reviews

# ทดสอบ Get Project Structure (React)
curl http://localhost:3000/api/projects/react

# ทดสอบ Get Team Member
curl http://localhost:3000/api/team/john_dev
```

---

## ✅ ตรวจสอบ

- [ ] สร้างไฟล์ `mock-server.js` แล้ว
- [ ] รัน `node mock-server.js` แล้วเห็นข้อความ `Mock Mango Company API running on http://localhost:3000`
- [ ] ทดสอบ `curl http://localhost:3000/api/code-reviews` แล้วได้ JSON กลับมา
- [ ] ทดสอบ `curl http://localhost:3000/api/projects/react` แล้วได้ JSON กลับมา
- [ ] ทดสอบ `curl http://localhost:3000/api/team/john_dev` แล้วได้ JSON กลับมา

> 🎉 ถ้า API ทั้ง 3 endpoints ตอบกลับมาถูกต้อง แสดงว่า Mock Server พร้อมแล้ว! ไปต่อ Puzzle 3

---

## 📡 API Endpoints สรุป

| Endpoint | คำอธิบาย | ตัวอย่าง |
|----------|----------|----------|
| `GET /api/code-reviews` | ดึงรายการ Code Review ทั้งหมด | `curl http://localhost:3000/api/code-reviews` |
| `GET /api/projects/{language}` | ดึงโครงสร้าง Project ตามภาษา | `curl http://localhost:3000/api/projects/react` |
| `GET /api/team/{member}` | ดึงข้อมูลสมาชิกทีม | `curl http://localhost:3000/api/team/john_dev` |

---

## 💡 Hints

<details>
<summary>Hint 1: Mock Server ไม่รัน?</summary>

ตรวจสอบว่า:
1. อยู่ในโฟลเดอร์ `mango_company/`
2. ไฟล์ชื่อ `mock-server.js` (ไม่ใช่ `.ts`)
3. ไม่มี process อื่นใช้ port 3000 อยู่ (ลอง `lsof -i :3000`)

</details>

<details>
<summary>Hint 2: curl ไม่ได้ผล?</summary>

ตรวจสอบว่า Mock Server ยังรันอยู่ในอีก terminal
ถ้าปิดไปแล้ว ให้รัน `node mock-server.js` ใหม่

</details>
