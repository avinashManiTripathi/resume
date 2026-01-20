export interface CoverLetterTemplate {
    _id: string;
    name: string;
    category?: string;
    image: string;
    description: string;
    previewText: string;
    templateBody: string | string[];
    supportedFields: string[];
}

export const coverLetterTemplates = [
    {
        _id: "professional-standard",
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
        _id: "modern-creative",
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
    },
    {
        _id: "executive-bold",
        name: "Executive Bold",
        category: "professional",
        image: "/images/templates/cover-letter-executive.png",
        description: "Commanding design for senior leadership roles, featuring bold typography and clean separation.",
        previewText: "Dear Hiring Manager, Drawn to the strategic goals...",
        supportedFields: [
            "fullName", "email", "phone", "jobTitle", "companyName", "experience", "customParagraph"
        ],
        templateBody: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      padding: 0;
      margin: 0;
      background: #fff;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .page {
      max-width: 800px;
      margin: 0 auto;
      padding: 60px 50px;
      color: #111;
      line-height: 1.6;
    }
    .header { margin-bottom: 40px; }
    h1 {
      font-size: 36px;
      font-weight: 800;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      color: #000;
      line-height: 1.1;
    }
    .sub-head {
      margin-top: 10px;
      font-size: 16px;
      color: #3B82F6; /* Blue-500 refined */
      font-weight: 600;
      text-transform: capitalize;
      letter-spacing: 0.5px;
    }
    .contact-bar {
      margin-top: 15px;
      font-size: 13px;
      color: #374151; /* Gray-700 */
      font-weight: 500;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
    }
    .contact-item { display: flex; align-items: center; gap: 6px; }
    
    .divider-thick {
      border-top: 3px solid #000;
      margin-top: 40px;
      margin-bottom: 15px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
      color: #000;
    }

    .divider-thin {
      border-top: 2px solid #000; /* Matching bottom line of header in reference */
      margin-bottom: 40px;
    }

    .body-content {
      font-size: 14px;
      color: #374151;
      text-align: justify;
      line-height: 1.7;
    }
    
    .signature {
      margin-top: 50px;
    }
    .sign-name {
      font-weight: bold;
      color: #000;
      margin-bottom: 2px;
      font-size: 16px;
    }
    .sign-role {
      font-size: 14px;
      color: #6B7280;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1 id="fullName"></h1>
      <div class="sub-head">
        <span id="jobTitle"></span>
        <span style="color:#2563EB; margin:0 5px;">|</span>
        <span id="jobField1">Business Transformation</span>
        <span style="color:#2563EB; margin:0 5px;">|</span>
        <span id="jobField2">Global Expansion</span>
      </div>
      <div class="contact-bar">
        <div class="contact-item">📞 <span id="phone"></span></div>
        <div class="contact-item">✉️ <span id="email"></span></div>
        <!-- Placeholder logic for visual balance -->
        <div class="contact-item">🔗 <span>linkedin.com</span></div>
        <div class="contact-item">📍 <span>San Francisco, CA</span></div>
      </div>
    </div>

    <!-- The thick divider line -->
    <div style="border-bottom: 3px solid #000; padding-bottom: 5px; margin-bottom: 40px;">
        <div class="section-title" style="margin-bottom: 0;">COVER LETTER</div>
    </div>

    <div class="body-content">
      <p style="margin-bottom: 1.5em; font-size:15px; color:#111;">Dear Hiring Manager,</p>
      <div id="mainBody"></div>
      <p id="closing" style="margin-top: 2em;"></p>
      <div class="signature">
        <div class="sign-name" id="signOff"></div>
        <div class="sign-role" id="signRole"></div>
        
        <!-- Bottom footer mimicking reference -->
        <div style="margin-top: 60px; font-size: 12px; color: #6B7280; border-top: 1px solid #E5E7EB; padding-top: 20px;">
            <span id="footerText">Seasoned Executive | Business Transformation | Global Expansion</span>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.hydrate = function (data) {
      document.getElementById("fullName").textContent = data.personalInfo.fullName;
      const title = data.personalInfo.jobTitle || "Professional";
      document.getElementById("jobTitle").textContent = title;
      // Using static placeholders for the pipe-separated values as they aren't in standard data, 
      // but in a real app we'd split skills or use a tagline field.
      // Keeping dynamic for user input fields
      document.getElementById("email").textContent = data.personalInfo.email;
      document.getElementById("phone").textContent = data.personalInfo.phone;
      
      // Update footer text
      document.getElementById("footerText").textContent = title + " | Business Transformation | Global Expansion";

      document.getElementById("mainBody").innerHTML = data.content.bodyHTML;
      document.getElementById("closing").textContent = data.content.closing;
      document.getElementById("signOff").textContent = data.content.signOff;
      document.getElementById("signRole").textContent = title;
    };
  </script>
</body>
</html>
`
    },
    {
        _id: "creative-zigzag",
        name: "Pattern Chic",
        category: "creative",
        image: "/images/templates/cover-letter-creative.png",
        description: "Modern layout with a stylish geometric header pattern, perfect for design and media roles.",
        previewText: "Dear Hiring Team, I recognized a platform...",
        supportedFields: [
            "fullName", "email", "phone", "jobTitle", "companyName", "experience", "customParagraph"
        ],
        templateBody: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #fff;
      font-family: 'Arial', sans-serif;
    }
    .page-container {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      min-height: 100vh;
      position: relative;
    }
    
    /* Zig Zag Pattern Background - Using SVG for stricter control over appearance */
    .pattern-header {
      width: 100%;
      height: 180px;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L40 0 L40 40 Z' fill='%23f3f4f6'/%3E%3Cpath d='M0 0 L20 20 L0 40 Z' fill='%23f3f4f6'/%3E%3C/svg%3E"); 
      /* Simple placeholder pattern that looks geometric */
      background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #f3f4f6 10px, #f3f4f6 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #f3f4f6 10px, #f3f4f6 20px);
      background-position: top right;
      opacity: 0.6;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 0;
    }
    
    .content-wrapper {
      position: relative;
      z-index: 1;
      padding: 60px 50px;
    }

    .header {
      margin-bottom: 40px;
    }
    
    h1 {
      font-size: 38px;
      font-weight: 800;
      margin: 0;
      color: #111827; /* Gray-900 */
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.2;
    }
    
    .role {
      font-size: 18px;
      color: #06B6D4; /* Cyan-500 from reference */
      font-weight: 500;
      margin-top: 5px;
      margin-bottom: 12px;
    }
    
    .contact-info {
      font-size: 13px;
      color: #6B7280;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 5px;
    }
    
    .contact-item { display: flex; align-items: center; gap: 5px; }

    .divider {
      border-top: 1px solid #D1D5DB; /* Gray-300 */
      margin: 30px 0;
    }

    .section-label {
      font-size: 13px;
      text-transform: uppercase;
      color: #4B5563; /* Gray-600 */
      letter-spacing: 1.5px;
      margin-bottom: 5px;
      font-weight: 600;
    }

    .body-content {
      font-size: 14px;
      color: #374151;
      text-align: justify;
      line-height: 1.8;
    }
    
    .signature {
      margin-top: 50px;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="pattern-header"></div>
    <div class="content-wrapper">
      <div class="header">
        <h1 id="fullName"></h1>
        <div class="role" id="jobTitle"></div>
        <div class="contact-info">
          <div class="contact-item">📞 <span id="phone"></span></div>
          <div class="contact-item">✉️ <span id="email"></span></div>
          <div class="contact-item">🔗 <span>linkedin.com</span></div>
          <div class="contact-item">📍 <span>Ursa, IL</span></div>
        </div>
      </div>
      
      <!-- Double line style roughly mimicking reference -->
      <div class="divider"></div>
      <div class="section-label">COVER LETTER</div>
      <div class="divider"></div>

      <div class="body-content">
        <p style="margin-bottom: 1.5em; color: #111;">Dear Hiring Manager,</p>
        <div id="mainBody"></div>
        <p id="closing" style="margin-top: 2em;"></p>
        <div class="signature">
          <p id="signOff" style="font-weight:bold; margin-bottom: 5px;"></p>
          <p id="signRole" style="font-weight:normal; font-size:14px; color:#6B7280; margin:0;"></p>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.hydrate = function (data) {
      document.getElementById("fullName").textContent = data.personalInfo.fullName;
      document.getElementById("jobTitle").textContent = data.personalInfo.jobTitle || "Digital Journalism Student";
      document.getElementById("email").textContent = data.personalInfo.email;
      document.getElementById("phone").textContent = data.personalInfo.phone;
      
      document.getElementById("mainBody").innerHTML = data.content.bodyHTML;
      document.getElementById("closing").textContent = data.content.closing;
      document.getElementById("signOff").textContent = data.content.signOff;
      document.getElementById("signRole").textContent = data.personalInfo.jobTitle;
    };
  </script>
</body>
</html>
`
    },
    {
        _id: "minimal-yellow",
        name: "Minimal Box",
        category: "modern",
        image: "/images/templates/cover-letter-minimal.png",
        description: "Distinctive minimal design with a signature yellow accent box, ideal for standing out.",
        previewText: "Dear Hiring Manager, I am writing to express...",
        supportedFields: [
            "fullName", "email", "phone", "jobTitle", "companyName", "experience", "customParagraph"
        ],
        templateBody: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: 'Verdana', sans-serif; /* Closest web safe match to reference geometric sans */
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background: #fff;
    }
    
    .page {
      max-width: 800px;
      margin: 0 auto;
      padding: 60px 50px;
      position: relative;
    }

    .yellow-box {
      position: absolute;
      top: 0;
      right: 50px; /* Aligned with content right edge */
      background-color: #FCD34D; /* More accurate Yellow */
      color: #fff;
      font-weight: bold;
      font-size: 24px;
      padding: 20px 35px;
      letter-spacing: 1px;
    }

    .header {
      margin-top: 40px;
      margin-bottom: 40px;
      text-align: center;
    }
    
    h1 {
      font-size: 32px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 20px;
      color: #1F2937;
    }
    
    .contact-bar {
      font-size: 13px;
      color: #374151; /* Gray-700 */
      display: flex;
      justify-content: center;
      gap: 25px;
      margin-bottom: 20px;
      font-weight: 500;
    }
    
    .contact-item { display: flex; align-items: center; gap: 8px; }

    .divider {
      width: 100%;
      height: 1px;
      background: #E5E7EB; /* Gray-200 */
      margin-bottom: 40px;
    }

    .company-info {
      font-weight: bold;
      margin-bottom: 30px;
      font-size: 15px;
      color: #111;
    }

    .body-content {
      font-size: 13px;
      color: #4B5563; /* Gray-600 */
      text-align: justify;
      line-height: 1.9;
    }
    
    .signature {
      margin-top: 50px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="yellow-box">CV</div>
    
    <div class="header">
      <h1 id="fullName"></h1>
      <div class="contact-bar">
        <div class="contact-item">🏠 <span id="address">London, UK</span></div>
        <div class="contact-item">✉️ <span id="email"></span></div>
        <div class="contact-item">📞 <span id="phone"></span></div>
      </div>
    </div>
  
    <div class="divider"></div>
  
    <div class="company-info">
        <div id="companyName" style="text-transform: uppercase; margin-bottom: 5px;"></div>
        <!-- Placeholder logic as per reference -->
        <div style="font-weight:normal; color:#6B7280; font-size:12px;">London, UK, 21 December 2023</div>
    </div>
  
    <div class="body-content">
      <p style="margin-bottom: 1.5em; color:#111;">Dear Hiring Manager,</p>
      <div id="mainBody"></div>
      <p id="closing" style="margin-top: 2em;"></p>
      <div class="signature">
        <p style="margin-bottom:5px;">Sincerely,</p>
        <p id="signOff" style="font-weight: bold; color:#111;"></p>
      </div>
    </div>
  </div>

  <script>
    window.hydrate = function (data) {
      document.getElementById("fullName").textContent = data.personalInfo.fullName;
      document.getElementById("email").textContent = data.personalInfo.email;
      document.getElementById("phone").textContent = data.personalInfo.phone;
      document.getElementById("companyName").textContent = data.recipientInfo.companyName || "HSBC";
      
      document.getElementById("mainBody").innerHTML = data.content.bodyHTML;
      document.getElementById("closing").textContent = data.content.closing;
      document.getElementById("signOff").textContent = data.content.signOff;
    };
  </script>
</body>
</html>
`
    }
] as CoverLetterTemplate[];

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = coverLetterTemplates;

export function getTemplateById(id: string): CoverLetterTemplate | undefined {
    return COVER_LETTER_TEMPLATES.find(template => template._id === id);
}

export function isValidTemplateId(id: string): boolean {
    return COVER_LETTER_TEMPLATES.some(template => template._id === id);
}
