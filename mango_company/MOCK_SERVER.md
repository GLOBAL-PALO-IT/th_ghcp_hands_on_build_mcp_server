# 🌐 Mock HTTP Server for Mango Company Data

นี่คือเซิร์ฟเวอร์ mock ที่ใช้สำหรับทำการทดสอบ MCP Server Mango Company

## วิธีใช้

### 1. สร้างไฟล์ `mock-server.js` ที่ root ของโปรเจกต์

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

### 2. รันเซิร์ฟเวอร์
```bash
node mock-server.js
```

Output:
```
Mock Mango Company API running on http://localhost:3000
```

## API Endpoints

### GET /api/code-reviews
ดึงรายการ Code Review ทั้งหมด

**Response:**
```json
{
  "result": "success",
  "data": [
    {
      "id": "CR001",
      "title": "Review Authentication System",
      "author": "Alice",
      "date": "2024-03-01"
    }
  ]
}
```

### GET /api/projects/{language}
ดึงโครงสร้าง Project ตามภาษา (java, react, flutter)

**Response:**
```json
{
  "result": "success",
  "language": "react",
  "structure": {
    "name": "React Frontend App",
    "description": "Main user-facing React application",
    "folders": ["src", "public", "tests", "components", "hooks"],
    "files": ["App.tsx", "index.tsx", "package.json"]
  }
}
```

### GET /api/team/{member}
ดึงข้อมูลสมาชิกทีม (john_dev, alice_backend, bob_mobile)

**Response:**
```json
{
  "result": "success",
  "member": {
    "id": "T001",
    "name": "John Developer",
    "role": "Senior React Developer",
    "email": "john@mangodev.com",
    "skills": ["React", "TypeScript", "Node.js"],
    "projects": ["Frontend App", "Admin Dashboard"]
  }
}
```

## ทดสอบ Endpoints

```bash
# List code reviews
curl http://localhost:3000/api/code-reviews

# Get React project structure
curl http://localhost:3000/api/projects/react

# Get Java project structure
curl http://localhost:3000/api/projects/java

# Get team member
curl http://localhost:3000/api/team/john_dev
```
