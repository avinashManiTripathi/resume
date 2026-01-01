import { Template, TemplateType, TemplateCategory } from '../models';

// Script to seed 10 professional resume templates into MongoDB

const templates = [
  {
    name: "Professional Classic",
    type: TemplateType.PROFESSIONAL,
    category: TemplateCategory.GENERAL,
    description: "Clean and professional layout with traditional formatting. Perfect for corporate and business roles.",
    isPremium: false,
    isActive: true,
    sortOrder: 1,
    tags: ["professional", "classic", "traditional", "ats-friendly", "corporate"],
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{firstName}} {{lastName}} - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print { body { margin: 0; padding: 0; } }
    .item-template { display: none; }
  </style>
</head>
<body>
  <main id="resume-root" class="max-w-4xl mx-auto bg-white p-8">
    <header id="section-personalInfo" class="flex items-center gap-6 mb-6">
      <img id="profile-image" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60" alt="Profile" class="w-24 h-24 object-cover border" />
      <div>
        <h1 id="full-name" class="text-3xl font-serif font-bold">{{firstName}} {{lastName}}</h1>
        <p class="text-sm text-gray-700 mt-1"><span id="email">{{email}}</span> | <span id="phone">{{phone}}</span></p>
      </div>
    </header>
    <section id="section-summary" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Professional Summary</h2>
      <p id="summary-text" class="text-sm text-gray-800 mt-3 leading-relaxed">{{summary}}</p>
    </section>
    <section id="section-experience" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Professional Experience</h2>
      <div id="experience-list"></div>
      <div class="experience-item item-template mt-4" data-template="experience">
        <h3 class="font-bold text-sm"><span class="exp-company">{{experience.company}}</span>, <span class="exp-job-title">{{experience.jobTitle}}</span></h3>
        <p class="text-xs text-gray-600 mb-2"><span class="exp-start-date">{{experience.startDate}}</span> – <span class="exp-end-date">{{experience.endDate}}</span></p>
        <div class="exp-description text-sm text-gray-800">{{experience.description}}</div>
      </div>
    </section>
    <section id="section-projects" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Projects</h2>
      <div id="projects-list"></div>
      <div class="project-item item-template mt-3" data-template="projects">
        <h3 class="font-bold text-sm proj-name">{{projects.name}}</h3>
        <p class="text-xs text-gray-600 mb-2"><span class="proj-start-date">{{projects.startDate}}</span> – <span class="proj-end-date">{{projects.endDate}}</span></p>
        <div class="proj-description text-sm text-gray-800">{{projects.description}}</div>
      </div>
    </section>
    <section id="section-education" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Education</h2>
      <div id="education-list"></div>
      <div class="education-item item-template mt-3" data-template="education">
        <div class="text-sm">
          <p class="font-bold edu-degree">{{education.degree}}</p>
          <p class="text-gray-700"><span class="edu-institution">{{education.institution}}</span> — <span class="edu-end-date">{{education.endDate}}</span></p>
        </div>
      </div>
    </section>
    <section id="section-skills" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Skills</h2>
      <div id="skills-list" class="mt-3 text-sm space-y-2"></div>
      <div class="skill-item item-template" data-template="skills">
        <p><span class="font-bold skill-name">{{skills.name}}</span><span class="skill-level">: {{skills.level}}</span></p>
      </div>
    </section>
  </main>
</body>
</html>`,
    thumbnail: "https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/428/persistent-resource/paris-resume-templates.jpg?v=1656071272"
  },

  {
    name: "Modern Sidebar",
    type: TemplateType.MODERN,
    category: TemplateCategory.TECH,
    description: "Modern two-column layout with dark sidebar. Ideal for tech and creative professionals.",
    isPremium: false,
    isActive: true,
    sortOrder: 2,
    tags: ["modern", "two-column", "sidebar", "tech", "creative"],
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{firstName}} {{lastName}} - Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print { body { margin: 0; padding: 0; } }
    .item-template { display: none; }
  </style>
</head>
<body>
  <div id="resume-root" class="max-w-5xl mx-auto bg-white flex">
    <aside class="w-1/3 bg-slate-800 text-white p-8">
      <header id="section-personalInfo" class="mb-8">
        <img id="profile-image" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=60" alt="Profile" class="w-32 h-32 object-cover rounded-full border-4 border-white mb-4 mx-auto" />
        <h1 id="full-name" class="text-2xl font-bold text-center mb-2">{{firstName}} {{lastName}}</h1>
        <div class="text-sm text-slate-300 space-y-1">
          <p id="email" class="break-all">{{email}}</p>
          <p id="phone">{{phone}}</p>
        </div>
      </header>
      <section id="section-skills" class="mb-6" style="display: none;">
        <h2 class="text-lg font-bold mb-3 border-b border-slate-600 pb-2">Skills</h2>
        <div id="skills-list" class="space-y-2"></div>
        <div class="skill-item item-template" data-template="skills">
          <div class="mb-2">
            <div class="skill-name text-sm font-medium">{{skills.name}}</div>
            <div class="skill-level text-xs text-slate-400">{{skills.level}}</div>
          </div>
        </div>
      </section>
      <section id="section-education" class="mb-6" style="display: none;">
        <h2 class="text-lg font-bold mb-3 border-b border-slate-600 pb-2">Education</h2>
        <div id="education-list"></div>
        <div class="education-item item-template mb-4" data-template="education">
          <p class="font-bold text-sm edu-degree">{{education.degree}}</p>
          <p class="text-xs text-slate-300 edu-institution">{{education.institution}}</p>
          <p class="text-xs text-slate-400 edu-end-date">{{education.endDate}}</p>
        </div>
      </section>
    </aside>
    <main class="w-2/3 p-8">
      <section id="section-summary" class="mb-6" style="display: none;">
        <h2 class="text-xl font-bold text-slate-800 mb-3">About Me</h2>
        <p id="summary-text" class="text-sm text-gray-700 leading-relaxed">{{summary}}</p>
      </section>
      <section id="section-experience" class="mb-6" style="display: none;">
        <h2 class="text-xl font-bold text-slate-800 mb-4">Experience</h2>
        <div id="experience-list"></div>
        <div class="experience-item item-template mb-5" data-template="experience">
          <h3 class="font-bold text-base exp-job-title">{{experience.jobTitle}}</h3>
          <p class="text-sm text-slate-600 exp-company mb-1">{{experience.company}}</p>
          <p class="text-xs text-gray-500 mb-2"><span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span></p>
          <div class="exp-description text-sm text-gray-700">{{experience.description}}</div>
        </div>
      </section>
      <section id="section-projects" class="mb-6" style="display: none;">
        <h2 class="text-xl font-bold text-slate-800 mb-4">Projects</h2>
        <div id="projects-list"></div>
        <div class="project-item item-template mb-4" data-template="projects">
          <h3 class="font-bold text-base proj-name">{{projects.name}}</h3>
          <p class="text-xs text-gray-500 mb-2"><span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span></p>
          <div class="proj-description text-sm text-gray-700">{{projects.description}}</div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>`,
    thumbnail: "https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/entry_level-dfd898a364738f428ab7906c33df0be2ff4c669052645d197f6599cf76cc313b.jpg"
  }
];

// Add 8 more templates here following the same structure...

export async function seedTemplates() {
  try {
    console.log('🌱 Seeding templates...');

    // Clear existing templates (optional)
    // await Template.deleteMany({});

    for (const templateData of templates) {
      const existing = await Template.findOne({ name: templateData.name });
      if (!existing) {
        await Template.create(templateData);
        console.log(`✅ Created template: ${templateData.name}`);
      } else {
        console.log(`⏭️  Template already exists: ${templateData.name}`);
      }
    }

    console.log('🎉 Template seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  const { database } = require('../config/database');

  database.connect()
    .then(() => seedTemplates())
    .then(() => process.exit(0))
    .catch((error: unknown) => {
      console.error('Error seeding templates:', error);
      process.exit(1);
    });
}

seedTemplates();
