import express from "express";
import { htmlToPdf } from "@repo/utils-server"

import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json());




function generateResumeHTML(userInfo: any) {
  const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], achievements = [] } = userInfo;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${personalInfo.firstName || ''} ${personalInfo.lastName || ''} - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="font-sans">
  <div class="max-w-4xl mx-auto bg-white">

    <!-- Header -->
    <header class="text-center mb-6">
      <h1 class="text-3xl font-bold">
        ${personalInfo.firstName?.toUpperCase() || ''} ${personalInfo.lastName?.toUpperCase() || ''}
      </h1>
      <h2 class="text-xl text-gray-600">${personalInfo.jobTitle || ''}</h2>
      <p class="text-gray-500 mt-2">
        ${personalInfo.address || ''} , ${personalInfo.city || ''}, ${personalInfo.state || ''}, ${personalInfo.country || ''} |
        ${personalInfo.phone || ''} | ${personalInfo.email || ''}
      </p>
      <hr class="my-4" />
    </header>

    <!-- Summary -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Summary</h3>
      <p class="text-gray-700">${personalInfo.summary || ''}</p>
    </section>

    <!-- Experience -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Professional Experience</h3>

      ${experience?.map((exp: any) => `
        <div class="mb-4">
          <h4 class="font-medium">
            ${exp.jobTitle || ''} – ${exp.company || ''}
          </h4>
          <p class="text-sm text-gray-500">
            ${exp.startDate || ''} – ${exp.currentlyWorking ? "Present" : exp.endDate || ''}
          </p>
          <ul class="list-disc pl-5 mt-1 text-gray-700">
            ${exp.responsibilities?.map((r: any) => `<li>${r}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </section>

    <!-- Education -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Education</h3>

      ${education?.map((edu: any) => `
        <div class="mb-3">
          <p class="font-medium">
            ${edu.degree || ''} in ${edu.fieldOfStudy || ''}
          </p>
          <p class="text-gray-600">
            ${edu.institution || ''} (${edu.startDate || ''} – ${edu.endDate || ''})
          </p>
          <p class="text-sm text-gray-500">${edu.description || ''}</p>
        </div>
      `).join("")}
    </section>

    <!-- Skills -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Skills</h3>
      <ul class="grid grid-cols-2 gap-2 text-gray-700">
        ${skills?.map((skill: any) => `<li>${skill.name || ''} (${skill.level || ''})</li>`).join("")}
      </ul>
    </section>

    <!-- Languages -->
    <section class="mb-6">
      <h3 class="font-semibold uppercase mb-2">Languages</h3>
      <p class="text-gray-700">
        ${languages?.map((l: any) => `${l.language || ''} (${l.proficiency || ''})`).join(", ")}
      </p>
    </section>

    <!-- Achievements -->
    <section>
      <h3 class="font-semibold uppercase mb-2">Achievements</h3>
      <ul class="list-disc pl-5 text-gray-700">
        ${achievements?.map((a: any) => `<li>${a}</li>`).join("")}
      </ul>
    </section>

  </div>
</body>
</html>`;
}


app.post("/convert-html-to-pdf", async (req, res) => {

  const user = JSON.parse(JSON.stringify(req.body));
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