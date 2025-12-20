import express from "express";
import { htmlToPdf } from "@repo/utils-server"

import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json());


const userInfo = {
  "personalInfo": {
    "firstName": "John Bro",
    "lastName": "Doe",
    "jobTitle": "Full Stack Developer",
    "summary": "Experienced Full Stack Developer with 5+ years of experience building scalable web applications and REST APIs.",
    "email": "john.doe@email.com",
    "phone": "+1-555-123-4567",
    "address": "123 Main Street",
    "city": "San Francisco",
    "state": "California",
    "country": "USA",
    "postalCode": "94105",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "portfolio": "https://johndoe.dev"
  },

  "education": [
    {
      "degree": "Bachelor of Technology",
      "fieldOfStudy": "Computer Science",
      "institution": "University of California",
      "location": "Berkeley, CA",
      "startDate": "2015-08",
      "endDate": "2019-05",
      "grade": "3.7 GPA",
      "description": "Focused on software engineering, data structures, and web development."
    }
  ],

  "experience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Solutions Inc.",
      "location": "San Francisco, CA",
      "startDate": "2021-01",
      "endDate": "",
      "currentlyWorking": true,
      "responsibilities": [
        "Decccccccccccccveloped REST APIs using Node.js and Express",
        "Built rescccponsive UI using React and Tailwind CSS",
        "Improved accccpplication performance by 30%",
        "Mentored junior developers"
      ]
    },
    {
      "jobTitle": "Software Developer",
      "company": "Innovate Labs",
      "location": "San Jose, CA",
      "startDate": "2019-06",
      "endDate": "2020-12",
      "currentlyWorking": false,
      "responsibilities": [
        "Designed frontend components using Angular",
        "Integrated third-party APIs",
        "Collaborated with cross-functional teams"
      ]
    }
  ],

  "skills": [
    { "name": "JavaScript", "level": "Expert" },
    { "name": "React", "level": "Advanced" },
    { "name": "Node.js", "level": "Advanced" },
    { "name": "MongoDB", "level": "Intermediate" },
    { "name": "Docker", "level": "Intermediate" }
  ],

  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "A full-featured e-commerce web application with payment integration.",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
      "link": "https://github.com/johndoe/ecommerce-platform"
    },
    {
      "title": "Task Management App",
      "description": "A productivity app to manage daily tasks and deadlines.",
      "technologies": ["Vue.js", "Firebase"],
      "link": "https://taskapp.johndoe.dev"
    }
  ],

  "certifications": [
    {
      "name": "AWS Certified Developer – Associate",
      "organization": "Amazon Web Services",
      "issueDate": "2022-06",
      "expiryDate": "2025-06",
      "credentialUrl": "https://aws.amazon.com/certification/"
    }
  ],

  "languages": [
    { "language": "English", "proficiency": "Native" },
    { "language": "Spanish", "proficiency": "Intermediate" }
  ],

  "achievements": [
    "Employee of the Year – 2022",
    "Winner of Internal Hackathon 2021"
  ],

  "hobbies": [
    "Open-source contribution",
    "Photography",
    "Cycling"
  ],

  "references": [
    {
      "name": "Jane Smith",
      "designation": "Engineering Manager",
      "company": "Tech Solutions Inc.",
      "email": "jane.smith@techsolutions.com",
      "phone": "+1-555-987-6543"
    }
  ],

  "settings": {
    "resumeTemplate": "modern",
    "font": "Roboto",
    "color": "#1a73e8",
    "pageSize": "A4"
  }
}



function generateResumeHTML(userInfo: any) {
  const { personalInfo = {}, experience, education, skills, languages, achievements } = userInfo;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${personalInfo.firstName} ${personalInfo.lastName} - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="font-sans">
  <div class="max-w-4xl mx-auto bg-white">

    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-3xl font-bold">
        ${personalInfo.firstName.toUpperCase()} ${personalInfo.lastName.toUpperCase()}
      </h1>
      <h2 class="text-xl text-gray-600">${personalInfo.jobTitle}</h2>
      <p class="text-gray-500 mt-2">
        ${personalInfo.address}, ${personalInfo.city}, ${personalInfo.state}, ${personalInfo.country} |
        ${personalInfo.phone} | ${personalInfo.email}
      </p>
      <hr class="my-4" />
    </header>

    <!-- Summary -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Summary</h3>
      <p class="text-gray-700">${personalInfo.summary}</p>
    </section>

    <!-- Experience -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Professional Experience</h3>

      ${experience.map((exp: any) => `
        <div class="mb-4">
          <h4 class="font-medium">
            ${exp.jobTitle} – ${exp.company}
          </h4>
          <p class="text-sm text-gray-500">
            ${exp.startDate} – ${exp.currentlyWorking ? "Present" : exp.endDate}
          </p>
          <ul class="list-disc pl-5 mt-1 text-gray-700">
            ${exp.responsibilities.map((r: any) => `<li>${r}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </section>

    <!-- Education -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Education</h3>

      ${education.map((edu: any) => `
        <div class="mb-3">
          <p class="font-medium">
            ${edu.degree} in ${edu.fieldOfStudy}
          </p>
          <p class="text-gray-600">
            ${edu.institution} (${edu.startDate} – ${edu.endDate})
          </p>
          <p class="text-sm text-gray-500">${edu.description}</p>
        </div>
      `).join("")}
    </section>

    <!-- Skills -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Skills</h3>
      <ul class="grid grid-cols-2 gap-2 text-gray-700">
        ${skills.map((skill: any) => `<li>${skill.name} (${skill.level})</li>`).join("")}
      </ul>
    </section>

    <!-- Languages -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Languages</h3>
      <p class="text-gray-700">
        ${languages.map((l: any) => `${l.language} (${l.proficiency})`).join(", ")}
      </p>
    </section>

    <!-- Achievements -->
    <section>
      <h3 class="font-semibold uppercase mb-2">Achievements</h3>
      <ul class="list-disc pl-5 text-gray-700">
        ${achievements.map((a: any) => `<li>${a}</li>`).join("")}
      </ul>
    </section>

  </div>
</body>
</html>`;
}


app.post("/convert-html-to-pdf", async (req, res) => {

  const user = JSON.parse(JSON.stringify(userInfo));
  user.personalInfo.firstName = req.body.firstName || "Avinash";

  console.log({ user: req.body.firstName })
  try {
    const html = generateResumeHTML(user);


    const pdfBuffer = await htmlToPdf(html, "output.pdf");

    // Set response headers
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      // inline = preview in browser, attachment = download
      'Content-Disposition': 'inline; filename="example.pdf"',
    });

    res.send(pdfBuffer);

    // res.json({ message: "PDF generated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "PDF generation failed" });
  }
});


app.get("/", (req, res) => {
  res.json({ message: "TypeScript backend is running!" });
});

app.listen(4000, () => {
  console.log("API server running on http://localhost:4000");
});