import { ResumeData } from '../types/resume.types';

export class TemplateService {
  /**
   * Generate HTML for resume header section
   */
  private generateHeader(personalInfo: ResumeData['personalInfo']): string {
    if (!personalInfo) return '';

    return `
      <header class="text-center mb-6">
        <h1 class="text-3xl font-bold">
          ${personalInfo.firstName?.toUpperCase() || ''} ${personalInfo.lastName?.toUpperCase() || ''}
        </h1>
        <h2 class="text-xl text-gray-600">${personalInfo.jobTitle || ''}</h2>
        <p class="text-gray-500 mt-2">
          ${personalInfo.address || ''} ${personalInfo.city ? `, ${personalInfo.city}` : ''} ${personalInfo.state ? `, ${personalInfo.state}` : ''} ${personalInfo.country ? `, ${personalInfo.country}` : ''} ${personalInfo.phone || personalInfo.email ? '|' : ''}
          ${personalInfo.phone || ''} ${personalInfo.email ? `| ${personalInfo.email}` : ''}
        </p>
        <hr class="my-4" />
      </header>
    `;
  }

  /**
   * Generate HTML for summary section
   */
  private generateSummary(summary?: string): string {
    if (!summary) return '';

    return `
      <section class="mb-6">
        <h3 class="font-semibold uppercase mb-2">Summary</h3>
        <p class="text-gray-700">${summary}</p>
      </section>
    `;
  }

  /**
   * Generate HTML for experience section
   */
  private generateExperience(experience: ResumeData['experience']): string {
    if (!experience || experience.length === 0) return '';

    return `
      <section class="mb-6">
        <h3 class="font-semibold uppercase mb-2">Professional Experience</h3>
        ${experience.map((exp) => `
          <div class="mb-4">
            <h4 class="font-medium">
              ${exp.jobTitle || ''} ${exp.company ? `– ${exp.company}` : ''}
            </h4>
            <p class="text-sm text-gray-500">
              ${exp.startDate || ''} ${exp.endDate || exp.currentlyWorking ? `– ${exp.currentlyWorking ? 'Present' : exp.endDate || ''}` : ''}
            </p>
            ${exp.description ? `<div class="mt-1 text-gray-700">${exp.description}</div>` : ''}
            ${exp.responsibilities && exp.responsibilities.length > 0 ? `
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                ${exp.responsibilities.map((r) => `<li>${r}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
    `;
  }

  /**
   * Generate HTML for education section
   */
  private generateEducation(education: ResumeData['education']): string {
    if (!education || education.length === 0) return '';

    return `
      <section class="mb-6">
        <h3 class="font-semibold uppercase mb-2">Education</h3>
        ${education.map((edu) => `
          <div class="mb-3">
            <p class="font-medium">
              ${edu.degree || ''} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
            </p>
            <p class="text-gray-600">
              ${edu.institution || ''} ${edu.startDate || edu.endDate ? `(${edu.startDate || ''} – ${edu.endDate || ''})` : ''}
            </p>
            ${edu.description ? `<p class="text-sm text-gray-500">${edu.description}</p>` : ''}
          </div>
        `).join('')}
      </section>
    `;
  }

  /**
   * Generate HTML for skills section
   */
  private generateSkills(skills: ResumeData['skills']): string {
    if (!skills || skills.length === 0) return '';

    return `
      <section class="mb-6">
        <h3 class="font-semibold uppercase mb-2">Skills</h3>
        <ul class="grid grid-cols-2 gap-2 text-gray-700">
          ${skills.map((skill) => `<li>${skill.name || ''} ${skill.level ? `(${skill.level})` : ''}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  /**
   * Generate HTML for languages section
   */
  private generateLanguages(languages: ResumeData['languages']): string {
    if (!languages || languages.length === 0) return '';

    return `
      <section class="mb-6">
        <h3 class="font-semibold uppercase mb-2">Languages</h3>
        <p class="text-gray-700">
          ${languages.map((l) => `${l.language || ''} ${l.proficiency ? `(${l.proficiency})` : ''}`).join(', ')}
        </p>
      </section>
    `;
  }

  /**
   * Generate HTML for achievements section
   */
  private generateAchievements(achievements: ResumeData['achievements']): string {
    if (!achievements || achievements.length === 0) return '';

    return `
      <section class="mb-6">
        <h3 class="font-semibold uppercase mb-2">Achievements</h3>
        <ul class="list-disc pl-5 text-gray-700">
          ${achievements.map((a) => `<li>${a}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  /**
   * Generate complete HTML document for resume
   */
  public generateResumeHTML(userInfo: any) {
    const { personalInfo = {}, experience = [], education = [], skills = [], languages = [], achievements = [] } = userInfo;


    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="">
  <main class="max-w-4xl mx-auto bg-white px-10 py-8">
    <!-- Header -->
    <header class="flex items-center gap-6 mb-6"  id="section-profile">
      <img
        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        alt="Profile"
        class="w-24 h-24 object-cover border"
      />

      <div>
        <h1 class="text-3xl font-serif font-bold" id="full-name">Edward Smith</h1>
        <h2 class="text-lg font-serif font-medium " id="job-title">
        Professional Summary
       </h2>
        <p class="text-sm text-gray-700 mt-1" id="contact-info">
          Market Street 12, New York |
          example@gmail.com |
          (412) 479-6342 |
          in/cbloomberg
        </p>
      </div>
    </header>

    <!-- Section -->
    <section class="mb-6">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">
        Professional Summary
      </h2>
      <p class="text-sm text-gray-800 mt-3 leading-relaxed" id="summary-text">
        Experienced and driven Financial Analyst with an impressive background
        of managing multi-million dollar budgets while providing analysis and
        account support within product development departments. Worked to reduce
        business expenses and develop logical and advantageous operating plan
        budgets. Experience creating quarterly accruals based on trends and
        forecasted expenses.
      </p>
    </section>

    <!-- Experience -->
    <section class="mb-6">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">
        Professional Experience
      </h2>

      <!-- Job -->
      <div class="mt-4">
        <h3 class="font-bold text-sm">
          Apple, Engineer, Cupertino, US
        </h3>
        <p class="text-xs text-gray-600 mb-2">May 2015 – Present</p>

        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Created budgets and ensured labor and material costs were decreased by 15 percent.</li>
          <li>Created financial reports on completed projects.</li>
          <li>Generated financial statements including cash flow charts and balance sheets.</li>
          <li>Created analysis and performance reports for management teams.</li>
          <li>Introduced software to enhance department communication.</li>
          <li>Assessed new development projects generating over $4.5M in revenue.</li>
        </ul>
      </div>

      <!-- Job -->
      <div class="mt-5">
        <h3 class="font-bold text-sm">
          GEO Corp., Engineer, Berlin, Germany
        </h3>
        <p class="text-xs text-gray-600 mb-2">Oct 2013 – Apr 2015</p>

        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Prepared reports, ad-hoc analysis, and revenue forecasts.</li>
          <li>Analyzed supplier contracts, reducing budgets by 6%.</li>
          <li>Presented weekly labor finance reports to management.</li>
        </ul>
      </div>

      <!-- Job -->
      <div class="mt-5">
        <h3 class="font-bold text-sm">
          Cisco Enterprises, Engineer, Berlin, Germany
        </h3>
        <p class="text-xs text-gray-600 mb-2">Nov 2010 – Sept 2013</p>

        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Produced financial forecasts and cash flow analysis.</li>
          <li>Negotiated supplier contracts.</li>
          <li>Delivered weekly financial performance reports.</li>
        </ul>
      </div>
    </section>

    <!-- Consultancy -->
    <section class="mb-6">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">
        Consultancy
      </h2>

      <div class="mt-3">
        <h3 class="font-bold text-sm">
          Independent Startup Consultant, Early-Stage Startup
        </h3>
        <p class="text-xs text-gray-600 mb-2">May 2015 – Present</p>

        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Worked with 3 global founders to launch MVPs using no-code methodologies.</li>
          <li>Flashfeed, media creation platform; SharedHomes rental platform.</li>
        </ul>
      </div>
    </section>

    <!-- Education -->
    <section class="mb-6">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">
        Education
      </h2>

      <div class="mt-3 text-sm">
        <p class="font-bold">Bachelor in Computer Engineering</p>
        <p class="text-gray-700">University of Arizona — 2013</p>
      </div>
    </section>

    <!-- Skills -->
    <section>
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">
        Expert-Level Skills
      </h2>

      <div class="mt-3 text-sm space-y-2">
        <p>
          <span class="font-bold">Leadership:</span>
          Speaking, Fundraising, Product Development, Communication,
          Partnerships, International Marketing
        </p>
        <p>
          <span class="font-bold">Front End:</span>
          HTML, CSS, Bootstrap, Webflow
        </p>
        <p>
          <span class="font-bold">Design:</span>
          Photoshop, Illustrator, Sketch
        </p>
        <p>
          <span class="font-bold">Fields of Interest:</span>
          Early-Stage Fundraising, Global Entrepreneurship, Web Design, Growth
        </p>
      </div>
    </section>

  </main>
</body>
</html>
`
    //     return `<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //   <meta charset="UTF-8" />
    //   <title>${personalInfo.firstName || ''} ${personalInfo.lastName || ''} - Resume</title>
    //   <script src="https://cdn.tailwindcss.com"></script>
    // </head>

    // <body class="font-sans">
    //   <div class="max-w-4xl mx-auto bg-white">

    //     <!-- Header -->
    //     <header class="text-center mb-6">
    //       <h1 class="text-3xl font-bold">
    //         ${personalInfo.firstName?.toUpperCase() || ''} ${personalInfo.lastName?.toUpperCase() || ''}
    //       </h1>
    //       <h2 class="text-xl text-gray-600">${personalInfo.jobTitle || ''}</h2>
    //       <p class="text-gray-500 mt-2">
    //         ${personalInfo.address || ''} , ${personalInfo.city || ''}, ${personalInfo.state || ''}, ${personalInfo.country || ''} |
    //         ${personalInfo.phone || ''} | ${personalInfo.email || ''}
    //       </p>
    //       <hr class="my-4" />
    //     </header>

    //     <!-- Summary -->
    //     <section class="mb-6">
    //       <h3 class="font-semibold uppercase mb-2">Summary</h3>
    //       <p class="text-gray-700">${personalInfo.summary || ''}</p>
    //     </section>

    //     <!-- Experience -->
    //     <section class="mb-6">
    //       <h3 class="font-semibold uppercase mb-2">Professional Experience</h3>

    //       ${experience?.map((exp: any) => `
    //         <div class="mb-4">
    //           <h4 class="font-medium">
    //             ${exp.jobTitle || ''} – ${exp.company || ''}
    //           </h4>
    //           <p class="text-sm text-gray-500">
    //             ${exp.startDate || ''} – ${exp.currentlyWorking ? "Present" : exp.endDate || ''}
    //           </p>
    //           <ul class="list-disc pl-5 mt-1 text-gray-700">
    //             ${exp.responsibilities?.map((r: any) => `<li>${r}</li>`).join("")}
    //           </ul>
    //         </div>
    //       `).join("")}
    //     </section>

    //     <!-- Education -->
    //     <section class="mb-6">
    //       <h3 class="font-semibold uppercase mb-2">Education</h3>

    //       ${education?.map((edu: any) => `
    //         <div class="mb-3">
    //           <p class="font-medium">
    //             ${edu.degree || ''} in ${edu.fieldOfStudy || ''}
    //           </p>
    //           <p class="text-gray-600">
    //             ${edu.institution || ''} (${edu.startDate || ''} – ${edu.endDate || ''})
    //           </p>
    //           <p class="text-sm text-gray-500">${edu.description || ''}</p>
    //         </div>
    //       `).join("")}
    //     </section>

    //     <!-- Skills -->
    //     <section class="mb-6">
    //       <h3 class="font-semibold uppercase mb-2">Skills</h3>
    //       <ul class="grid grid-cols-2 gap-2 text-gray-700">
    //         ${skills?.map((skill: any) => `<li>${skill.name || ''} (${skill.level || ''})</li>`).join("")}
    //       </ul>
    //     </section>

    //     <!-- Languages -->
    //     <section class="mb-6">
    //       <h3 class="font-semibold uppercase mb-2">Languages</h3>
    //       <p class="text-gray-700">
    //         ${languages?.map((l: any) => `${l.language || ''} (${l.proficiency || ''})`).join(", ")}
    //       </p>
    //     </section>

    //     <!-- Achievements -->
    //     <section>
    //       <h3 class="font-semibold uppercase mb-2">Achievements</h3>
    //       <ul class="list-disc pl-5 text-gray-700">
    //         ${achievements?.map((a: any) => `<li>${a}</li>`).join("")}
    //       </ul>
    //     </section>

    //   </div>
    // </body>
    // </html>`;
  }

}
