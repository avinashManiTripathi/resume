

export const coverLetterTemplates = [
  {
    id: "professional-standard",
    name: "Professional Standard",
    category: "professional",
    image: "/images/templates/resume-classic.png",
    description:
      "Clean and professional format ideal for corporate roles, finance, consulting, and traditional industries.",
    previewText:
      "Dear Hiring Manager, I am writing to express my strong interest...",
    supportedFields: [
      "fullName",
      "email",
      "phone",
      "jobTitle",
      "companyName",
      "experience",
      "customParagraph"
    ],
    templateBody: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: "Times New Roman", Times, serif;
      color: #333;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }

    .header {
      border-bottom: 2px solid #333;
      padding-bottom: 20px;
      margin-bottom: 40px;
    }

    h1 {
      font-size: 28px;
      font-weight: bold;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .contact-info {
      margin-top: 5px;
      font-size: 14px;
      color: #555;
    }

    .recipient {
      margin-bottom: 40px;
    }

    .body-content {
      font-size: 11pt;
    }

    .signature {
      margin-top: 40px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 id="fullName"></h1>
    <div class="contact-info">
      <span id="email"></span> • <span id="phone"></span>
    </div>
  </div>

  <div class="recipient">
    <p style="margin:0;font-weight:bold;">Hiring Manager</p>
    <p style="margin:0;" id="companyName"></p>
  </div>

  <div class="body-content">
    <p id="greeting"></p>
    <div id="mainBody"></div>
    <p id="closing"></p>
    <div class="signature" id="signOff"></div>
  </div>

  <script>
    window.hydrate = function (data) {
      document.getElementById("fullName").textContent =
        data.personalInfo.fullName;
      document.getElementById("email").textContent =
        data.personalInfo.email;
      document.getElementById("phone").textContent =
        data.personalInfo.phone;
      document.getElementById("companyName").textContent =
        data.recipientInfo.companyName;

      document.getElementById("greeting").textContent =
        data.content.greeting;
      document.getElementById("mainBody").innerHTML =
        data.content.bodyHTML;
      document.getElementById("closing").textContent =
        data.content.closing;
      document.getElementById("signOff").textContent =
        data.content.signOff;
    };
  </script>
</body>
</html>
`
  },

  {
    id: "modern-creative",
    name: "Modern Creative",
    category: "creative",
    image: "/images/templates/resume-modern.png",
    description:
      "Contemporary and engaging format perfect for creative roles and startups.",
    previewText: "Hello Team! I'm excited to apply...",
    supportedFields: [
      "fullName",
      "email",
      "phone",
      "jobTitle",
      "companyName",
      "experience",
      "skills",
      "customParagraph"
    ],
    templateBody: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #2d3748;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 4px solid #4299e1;
      padding-bottom: 20px;
      margin-bottom: 50px;
    }

    h1 {
      font-size: 32px;
      font-weight: 800;
      margin: 0;
      color: #2b6cb0;
    }

    .role {
      margin-top: 5px;
      font-size: 16px;
      color: #718096;
    }

    .contact {
      text-align: right;
      font-size: 13px;
      color: #718096;
    }

    .greeting {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 1.5em;
    }

    .signature {
      margin-top: 40px;
      font-size: 16px;
      font-weight: bold;
      color: #2b6cb0;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 id="fullName"></h1>
      <p class="role" id="jobTitle"></p>
    </div>

    <div class="contact">
      <p id="email" style="margin:0;"></p>
      <p id="phone" style="margin-top:2px;"></p>
    </div>
  </div>

  <div class="body-content">
    <p class="greeting" id="greeting"></p>
    <div id="mainBody"></div>
    <p id="closing" style="margin-top:2em;"></p>
    <div class="signature" id="signOff"></div>
  </div>

  <script>
    window.hydrate = function (data) {
      document.getElementById("fullName").textContent =
        data.personalInfo.fullName;
      document.getElementById("jobTitle").textContent =
        data.personalInfo.jobTitle;
      document.getElementById("email").textContent =
        data.personalInfo.email;
      document.getElementById("phone").textContent =
        data.personalInfo.phone;

      document.getElementById("greeting").textContent =
        data.content.greeting;
      document.getElementById("mainBody").innerHTML =
        data.content.bodyHTML;
      document.getElementById("closing").textContent =
        data.content.closing;
      document.getElementById("signOff").textContent =
        data.content.signOff;
    };
  </script>
</body>
</html>
`
  }
];
