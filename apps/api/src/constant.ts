export const RESUMES = [
  {
    id: "692bcfd239561eef09d89aa9",
    name: "Professional Classic",
    image: "https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/428/persistent-resource/paris-resume-templates.jpg?v=1656071272",
    html: `<!DOCTYPE html>
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

    <!-- Header -->
    <header id="section-personalInfo" class="flex items-center gap-6 mb-6">
      <img id="profile-image" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60"
           alt="Profile" class="w-24 h-24 object-cover border" />

      <div>
        <h1 id="full-name" class="text-3xl font-serif font-bold">{{firstName}} {{lastName}}</h1>
        <p class="text-sm text-gray-700 mt-1">
          <span id="email">{{email}}</span> |
          <span id="phone">{{phone}}</span>
        </p>
      </div>
    </header>

    <!-- Summary -->
    <section id="section-summary" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Professional Summary</h2>
      <p id="summary-text" class="text-sm text-gray-800 mt-3 leading-relaxed">{{summary}}</p>
    </section>

    <!-- Experience -->
    <section id="section-experience" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Professional Experience</h2>
      <div id="experience-list"></div>
      <div class="experience-item item-template mt-4" data-template="experience">
        <h3 class="font-bold text-sm">
          <span class="exp-company">{{experience.company}}</span>, <span class="exp-job-title">{{experience.jobTitle}}</span>
        </h3>
        <p class="text-xs text-gray-600 mb-2">
          <span class="exp-start-date">{{experience.startDate}}</span> – <span class="exp-end-date">{{experience.endDate}}</span>
        </p>
        <div class="exp-description text-sm text-gray-800">{{experience.description}}</div>
      </div>
    </section>

    <!-- Projects -->
    <section id="section-projects" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Projects</h2>
      <div id="projects-list"></div>
      <div class="project-item item-template mt-3" data-template="projects">
        <h3 class="font-bold text-sm proj-name">{{projects.name}}</h3>
        <p class="text-xs text-gray-600 mb-2">
          <span class="proj-start-date">{{projects.startDate}}</span> – <span class="proj-end-date">{{projects.endDate}}</span>
        </p>
        <div class="proj-description text-sm text-gray-800">{{projects.description}}</div>
      </div>
    </section>

    <!-- Education -->
    <section id="section-education" class="mb-6" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Education</h2>
      <div id="education-list"></div>
      <div class="education-item item-template mt-3" data-template="education">
        <div class="text-sm">
          <p class="font-bold edu-degree">{{education.degree}}</p>
          <p class="text-gray-700">
            <span class="edu-institution">{{education.institution}}</span> — <span class="edu-end-date">{{education.endDate}}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section id="section-skills" style="display: none;">
      <h2 class="text-lg font-serif font-bold border-b border-gray-400 pb-1">Skills</h2>
      <div id="skills-list" class="mt-3 text-sm space-y-2"></div>
      <div class="skill-item item-template" data-template="skills">
        <p><span class="font-bold skill-name">{{skills.name}}</span><span class="skill-level">: {{skills.level}}</span></p>
      </div>
    </section>

  </main>
</body>
</html>`
  },
  {
    id: "692bcfd239561eef09d89aae",
    name: "Two Column Sidebar",
    image: "https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/entry_level-dfd898a364738f428ab7906c33df0be2ff4c669052645d197f6599cf76cc313b.jpg",
    html: `<!DOCTYPE html>
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
    
    <!-- LEFT SIDEBAR (30%) -->
    <aside class="w-1/3 bg-slate-800 text-white p-8">
      <header id="section-personalInfo" class="mb-8">
        <img id="profile-image" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=60"
             alt="Profile" class="w-32 h-32 object-cover rounded-full border-4 border-white mb-4 mx-auto" />
        <h1 id="full-name" class="text-2xl font-bold text-center mb-2">{{firstName}} {{lastName}}</h1>
        <div class="text-sm text-slate-300 space-y-1">
          <p id="email" class="break-all">{{email}}</p>
          <p id="phone">{{phone}}</p>
        </div>
      </header>

      <!-- Skills in Sidebar -->
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

      <!-- Education in Sidebar -->
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

    <!-- RIGHT CONTENT (70%) -->
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
          <p class="text-xs text-gray-500 mb-2">
            <span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span>
          </p>
          <div class="exp-description text-sm text-gray-700">{{experience.description}}</div>
        </div>
      </section>

      <section id="section-projects" class="mb-6" style="display: none;">
        <h2 class="text-xl font-bold text-slate-800 mb-4">Projects</h2>
        <div id="projects-list"></div>
        <div class="project-item item-template mb-4" data-template="projects">
          <h3 class="font-bold text-base proj-name">{{projects.name}}</h3>
          <p class="text-xs text-gray-500 mb-2">
            <span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span>
          </p>
          <div class="proj-description text-sm text-gray-700">{{projects.description}}</div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>`
  },
  {
    id: "692bcfd239561eef09d89aad",
    name: "Modern Gradient",
    image: "https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/helsinki-4dd16bc5e017b8969055dc9dc02348c331d673da6140a0a8a69eaf2befd7b4ba.jpg",
    html: `<!DOCTYPE html>
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
  <main id="resume-root" class="max-w-4xl mx-auto bg-white">
    
    <!-- Gradient Header -->
    <header id="section-personalInfo" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 mb-6">
      <div class="flex items-center gap-6">
        <img id="profile-image" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&auto=format&fit=crop&q=60"
             alt="Profile" class="w-28 h-28 object-cover rounded-lg border-4 border-white shadow-lg" />
        <div>
          <h1 id="full-name" class="text-4xl font-bold mb-2">{{firstName}} {{lastName}}</h1>
          <p class="text-blue-100">
            <span id="email">{{email}}</span> | <span id="phone">{{phone}}</span>
          </p>
        </div>
      </div>
    </header>

    <div class="px-8 pb-8">
      <section id="section-summary" class="mb-6" style="display: none;">
        <div id="summary-text" class="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">{{summary}}</div>
      </section>

      <section id="section-experience" class="mb-6" style="display: none;">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          <span class="w-1 h-8 bg-blue-600 mr-3"></span>Experience
        </h2>
        <div id="experience-list"></div>
        <div class="experience-item item-template mb-5 pl-4 border-l-2 border-blue-200" data-template="experience">
          <h3 class="font-bold text-lg exp-job-title">{{experience.jobTitle}}</h3>
          <p class="text-blue-600 font-semibold exp-company">{{experience.company}}</p>
          <p class="text-sm text-gray-500 mb-2">
            <span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span>
          </p>
          <div class="exp-description text-sm text-gray-700">{{experience.description}}</div>
        </div>
      </section>

      <section id="section-education" class="mb-6" style="display: none;">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          <span class="w-1 h-8 bg-blue-600 mr-3"></span>Education
        </h2>
        <div id="education-list"></div>
        <div class="education-item item-template mb-4 pl-4 border-l-2 border-blue-200" data-template="education">
          <p class="font-bold text-base edu-degree">{{education.degree}}</p>
          <p class="text-blue-600 edu-institution">{{education.institution}}</p>
          <p class="text-sm text-gray-500 edu-end-date">{{education.endDate}}</p>
        </div>
      </section>

      <section id="section-projects" class="mb-6" style="display: none;">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          <span class="w-1 h-8 bg-blue-600 mr-3"></span>Projects
        </h2>
        <div id="projects-list"></div>
        <div class="project-item item-template mb-4 pl-4 border-l-2 border-blue-200" data-template="projects">
          <h3 class="font-bold text-base proj-name">{{projects.name}}</h3>
          <p class="text-sm text-gray-500 mb-2">
            <span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span>
          </p>
          <div class="proj-description text-sm text-gray-700">{{projects.description}}</div>
        </div>
      </section>

      <section id="section-skills" style="display: none;">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
          <span class="w-1 h-8 bg-blue-600 mr-3"></span>Skills
        </h2>
        <div id="skills-list" class="flex flex-wrap gap-2"></div>
        <div class="skill-item item-template" data-template="skills">
          <span class="skill-name bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{{skills.name}}</span>
        </div>
      </section>
    </div>
  </main>
</body>
</html>`
  },
  {
    id: "692bcfd239561eef09d89aaeh",
    name: "Split Layout",
    image: "https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/seoul-f6e799b14048602d802de73b05f37b8b9348e6ee5367f905c94bd4a3c5c2c250.jpg",
    html: `<!DOCTYPE html>
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
  <div id="resume-root" class="max-w-5xl mx-auto bg-white">
    
    <!-- Header -->
    <header id="section-personalInfo" class="bg-emerald-600 text-white p-6">
      <div class="text-center">
        <img id="profile-image" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=60"
             alt="Profile" class="w-24 h-24 object-cover rounded-full border-4 border-white mx-auto mb-3" />
        <h1 id="full-name" class="text-3xl font-bold mb-1">{{firstName}} {{lastName}}</h1>
        <p class="text-emerald-100 text-sm">
          <span id="email">{{email}}</span> | <span id="phone">{{phone}}</span>
        </p>
      </div>
    </header>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-2 gap-6 p-8">
      
      <!-- LEFT COLUMN -->
      <div>
        <section id="section-summary" class="mb-6" style="display: none;">
          <h2 class="text-lg font-bold text-emerald-600 mb-3 pb-1 border-b-2 border-emerald-600">Summary</h2>
          <p id="summary-text" class="text-sm text-gray-700 leading-relaxed">{{summary}}</p>
        </section>

        <section id="section-skills" class="mb-6" style="display: none;">
          <h2 class="text-lg font-bold text-emerald-600 mb-3 pb-1 border-b-2 border-emerald-600">Skills</h2>
          <div id="skills-list" class="space-y-2"></div>
          <div class="skill-item item-template" data-template="skills">
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span class="skill-name text-sm font-medium">{{skills.name}}</span>
              <span class="skill-level text-xs text-gray-500">{{skills.level}}</span>
            </div>
          </div>
        </section>

        <section id="section-education" class="mb-6" style="display: none;">
          <h2 class="text-lg font-bold text-emerald-600 mb-3 pb-1 border-b-2 border-emerald-600">Education</h2>
          <div id="education-list"></div>
          <div class="education-item item-template mb-4" data-template="education">
            <p class="font-bold text-sm edu-degree">{{education.degree}}</p>
            <p class="text-sm text-gray-600 edu-institution">{{education.institution}}</p>
            <p class="text-xs text-gray-500 edu-end-date">{{education.endDate}}</p>
          </div>
        </section>
      </div>

      <!-- RIGHT COLUMN -->
      <div>
        <section id="section-experience" class="mb-6" style="display: none;">
          <h2 class="text-lg font-bold text-emerald-600 mb-3 pb-1 border-b-2 border-emerald-600">Experience</h2>
          <div id="experience-list"></div>
          <div class="experience-item item-template mb-5" data-template="experience">
            <h3 class="font-bold text-sm exp-job-title">{{experience.jobTitle}}</h3>
            <p class="text-sm text-emerald-600 exp-company">{{experience.company}}</p>
            <p class="text-xs text-gray-500 mb-2">
              <span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span>
            </p>
            <div class="exp-description text-sm text-gray-700">{{experience.description}}</div>
          </div>
        </section>

        <section id="section-projects" class="mb-6" style="display: none;">
          <h2 class="text-lg font-bold text-emerald-600 mb-3 pb-1 border-b-2 border-emerald-600">Projects</h2>
          <div id="projects-list"></div>
          <div class="project-item item-template mb-4" data-template="projects">
            <h3 class="font-bold text-sm proj-name">{{projects.name}}</h3>
            <p class="text-xs text-gray-500 mb-2">
              <span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span>
            </p>
            <div class="proj-description text-sm text-gray-700">{{projects.description}}</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: "692bcfd239561eef09d89aa3",
    name: "Minimal Elegant",
    image: "https://resume.io/cdn-cgi/image/width=852,format=auto/assets/templates/specialist_traditional1-e2a33404defff54a1c6427f933fe529a09fc7d4746298b336bd15e2502df81eb.jpg",
    html: `<!DOCTYPE html>
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
  <main id="resume-root" class="max-w-4xl mx-auto bg-white p-12">
    
    <header id="section-personalInfo" class="mb-10 pb-6 border-b">
      <div class="flex items-center gap-6">
        <img id="profile-image" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=60"
             alt="Profile" class="w-20 h-20 object-cover" />
        <div>
          <h1 id="full-name" class="text-4xl font-light tracking-wide mb-1">{{firstName}} {{lastName}}</h1>
          <p class="text-sm text-gray-600">
            <span id="email">{{email}}</span> • <span id="phone">{{phone}}</span>
          </p>
        </div>
      </div>
    </header>

    <section id="section-summary" class="mb-8" style="display: none;">
      <p id="summary-text" class="text-gray-700 leading-relaxed italic pl-4 border-l-2 border-gray-300">{{summary}}</p>
    </section>

    <section id="section-experience" class="mb-8" style="display: none;">
      <h2 class="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Experience</h2>
      <div id="experience-list"></div>
      <div class="experience-item item-template mb-6" data-template="experience">
        <div class="flex justify-between mb-1">
          <h3 class="font-semibold exp-job-title">{{experience.jobTitle}}</h3>
          <span class="text-sm text-gray-500">
            <span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span>
          </span>
        </div>
        <p class="text-sm text-gray-600 mb-2 exp-company">{{experience.company}}</p>
        <div class="exp-description text-sm text-gray-700">{{experience.description}}</div>
      </div>
    </section>

    <section id="section-education" class="mb-8" style="display: none;">
      <h2 class="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Education</h2>
      <div id="education-list"></div>
      <div class="education-item item-template mb-4" data-template="education">
        <div class="flex justify-between mb-1">
          <p class="font-semibold edu-degree">{{education.degree}}</p>
          <span class="text-sm text-gray-500 edu-end-date">{{education.endDate}}</span>
        </div>
        <p class="text-sm text-gray-600 edu-institution">{{education.institution}}</p>
      </div>
    </section>

    <section id="section-projects" class="mb-8" style="display: none;">
      <h2 class="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Projects</h2>
      <div id="projects-list"></div>
      <div class="project-item item-template mb-4" data-template="projects">
        <div class="flex justify-between mb-1">
          <h3 class="font-semibold proj-name">{{projects.name}}</h3>
          <span class="text-sm text-gray-500">
            <span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span>
          </span>
        </div>
        <div class="proj-description text-sm text-gray-700">{{projects.description}}</div>
      </div>
    </section>

    <section id="section-skills" style="display: none;">
      <h2 class="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Skills</h2>
      <div id="skills-list" class="flex flex-wrap gap-3"></div>
      <div class="skill-item item-template" data-template="skills">
        <span class="skill-name text-sm text-gray-700">{{skills.name}}</span>
      </div>
    </section>
  </main>
</body>
</html>`
  },
  {
    id: "692bcfd239561eef09d89a55",
    name: "Bold Creative",
    image: "https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/389/persistent-resource/new-york-resume-templates.jpg?v=1651656959",
    html: `<!DOCTYPE html>
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
    
    <!-- LEFT SIDEBAR -->
    <aside class="w-2/5 bg-gradient-to-b from-orange-500 to-red-500 text-white p-8">
      <header id="section-personalInfo" class="mb-8">
        <img id="profile-image" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=60"
             alt="Profile" class="w-32 h-32 object-cover rounded-lg border-4 border-white mb-4" />
        <h1 id="full-name" class="text-3xl font-bold mb-2">{{firstName}} {{lastName}}</h1>
        <div class="text-sm text-orange-100 space-y-1">
          <p id="email" class="break-all">{{email}}</p>
          <p id="phone">{{phone}}</p>
        </div>
      </header>

      <section id="section-summary" class="mb-6" style="display: none;">
        <h2 class="text-xl font-bold mb-3 border-b-2 border-white pb-2">About</h2>
        <p id="summary-text" class="text-sm leading-relaxed">{{summary}}</p>
      </section>

      <section id="section-skills" class="mb-6" style="display: none;">
        <h2 class="text-xl font-bold mb-3 border-b-2 border-white pb-2">Skills</h2>
        <div id="skills-list" class="space-y-2"></div>
        <div class="skill-item item-template" data-template="skills">
          <div class="mb-2">
            <div class="skill-name text-sm font-bold">{{skills.name}}</div>
            <div class="skill-level text-xs text-orange-200">{{skills.level}}</div>
          </div>
        </div>
      </section>
    </aside>

    <!-- RIGHT CONTENT -->
    <main class="w-3/5 p-8">
      <section id="section-experience" class="mb-6" style="display: none;">
        <h2 class="text-2xl font-bold text-orange-600 mb-4 pb-2 border-b-2 border-orange-600">Experience</h2>
        <div id="experience-list"></div>
        <div class="experience-item item-template mb-5" data-template="experience">
          <h3 class="font-bold text-lg exp-job-title">{{experience.jobTitle}}</h3>
          <p class="text-orange-600 font-semibold exp-company">{{experience.company}}</p>
          <p class="text-sm text-gray-500 mb-2">
            <span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span>
          </p>
          <div class="exp-description text-sm text-gray-700">{{experience.description}}</div>
        </div>
      </section>

      <section id="section-education" class="mb-6" style="display: none;">
        <h2 class="text-2xl font-bold text-orange-600 mb-4 pb-2 border-b-2 border-orange-600">Education</h2>
        <div id="education-list"></div>
        <div class="education-item item-template mb-4" data-template="education">
          <p class="font-bold text-base edu-degree">{{education.degree}}</p>
          <p class="text-orange-600 edu-institution">{{education.institution}}</p>
          <p class="text-sm text-gray-500 edu-end-date">{{education.endDate}}</p>
        </div>
      </section>

      <section id="section-projects" class="mb-6" style="display: none;">
        <h2 class="text-2xl font-bold text-orange-600 mb-4 pb-2 border-b-2 border-orange-600">Projects</h2>
        <div id="projects-list"></div>
        <div class="project-item item-template mb-4" data-template="projects">
          <h3 class="font-bold text-base proj-name">{{projects.name}}</h3>
          <p class="text-sm text-gray-500 mb-2">
            <span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span>
          </p>
          <div class="proj-description text-sm text-gray-700">{{projects.description}}</div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>`
  },
  {
    id: "692bcfd239561eef09d89aa8",
    name: "Compact Professional",
    image: "https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/441/persistent-resource/sydney-resume-templates.jpg?v=1651657428",
    html: `<!DOCTYPE html>
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
    
    <header id="section-personalInfo" class="flex items-center gap-6 mb-6 pb-4 border-b-4 border-gray-900">
      <img id="profile-image" src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=900&auto=format&fit=crop&q=60"
           alt="Profile" class="w-24 h-24 object-cover border-2 border-gray-900" />
      <div>
        <h1 id="full-name" class="text-3xl font-bold uppercase">{{firstName}} {{lastName}}</h1>
        <p class="text-sm text-gray-600 mt-1">
          <span id="email">{{email}}</span> • <span id="phone">{{phone}}</span>
        </p>
      </div>
    </header>

    <section id="section-summary" class="mb-6" style="display: none;">
      <p id="summary-text" class="text-sm text-gray-700 leading-snug bg-gray-50 p-4">{{summary}}</p>
    </section>

    <section id="section-experience" class="mb-6" style="display: none;">
      <h2 class="text-sm font-bold uppercase bg-gray-900 text-white px-3 py-2 mb-3">Experience</h2>
      <div id="experience-list"></div>
      <div class="experience-item item-template mb-4" data-template="experience">
        <div class="flex justify-between items-baseline mb-1">
          <h3 class="font-bold text-sm exp-job-title">{{experience.jobTitle}}</h3>
          <span class="text-xs text-gray-500">
            <span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span>
          </span>
        </div>
        <p class="text-xs text-gray-600 mb-2 exp-company">{{experience.company}}</p>
        <div class="exp-description text-xs text-gray-700">{{experience.description}}</div>
      </div>
    </section>

    <section id="section-education" class="mb-6" style="display: none;">
      <h2 class="text-sm font-bold uppercase bg-gray-900 text-white px-3 py-2 mb-3">Education</h2>
      <div id="education-list"></div>
      <div class="education-item item-template mb-3" data-template="education">
        <div class="flex justify-between items-baseline">
          <p class="font-bold text-sm edu-degree">{{education.degree}}</p>
          <span class="text-xs text-gray-500 edu-end-date">{{education.endDate}}</span>
        </div>
        <p class="text-xs text-gray-600 edu-institution">{{education.institution}}</p>
      </div>
    </section>

    <section id="section-projects" class="mb-6" style="display: none;">
      <h2 class="text-sm font-bold uppercase bg-gray-900 text-white px-3 py-2 mb-3">Projects</h2>
      <div id="projects-list"></div>
      <div class="project-item item-template mb-3" data-template="projects">
        <div class="flex justify-between items-baseline">
          <h3 class="font-bold text-sm proj-name">{{projects.name}}</h3>
          <span class="text-xs text-gray-500">
            <span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span>
          </span>
        </div>
        <div class="proj-description text-xs text-gray-700">{{projects.description}}</div>
      </div>
    </section>

    <section id="section-skills" style="display: none;">
      <h2 class="text-sm font-bold uppercase bg-gray-900 text-white px-3 py-2 mb-3">Skills</h2>
      <div id="skills-list" class="grid grid-cols-3 gap-2"></div>
      <div class="skill-item item-template" data-template="skills">
        <div class="bg-gray-100 px-2 py-1 text-center">
          <span class="skill-name text-xs font-medium">{{skills.name}}</span>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`
  }
]