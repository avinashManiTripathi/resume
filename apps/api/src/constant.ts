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

    <!-- Tailwind (optional – safe to keep) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Nunito", sans-serif;
            color: #1f2937;
            background: #ffffff;
        }

        @media print {
            body {
                margin: 0;
            }
        }

        .item-template {
            display: none;
        }

        main {
            max-width: 900px;
            margin: 0 auto;
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        header {
            display: flex;
            gap: 24px;
            align-items: center;
        }

        header img {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid #e5e7eb;
        }

        h1 {
            font-size: 32px;
            font-weight: 800;
            margin: 0;
        }

        h3 {
            margin: 4px 0;
            font-weight: 700;
        }

        p {
            margin: 4px 0;
            font-size: 14px;
        }

        section {
            width: 100%;
        }

        section h2 {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 6px;
            margin-bottom: 12px;
        }

        ul {
            margin: 6px 0 0 18px;
            padding: 0;
        }

        li {
            margin-bottom: 6px;
            font-size: 14px;
        }

        .text-muted {
            color: #6b7280;
            font-size: 13px;
        }

        a {
            color: #2563eb;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <main id="resume-root">
        <!-- Header -->
        <header id="section-personalInfo">
          <img id="profile-image" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60" alt="Profile" class="w-24 h-24 rounded-full object-cover border" />
            <div>
                <h1 id="full-name" class="text-3xl  font-bold">{{firstName}} {{lastName}}</h1>
                <h3 id="job-title">{{jobTitle}}</h3>

                <p class="text-muted">
                
                    <span id="address">Seoul, South Korea</span> ·
                    <span id="email">{{email}}</span> ·
                    <span id="phone">{{phone}}</span>
                    <a id="linkedin-link" href="#" target="_blank" style="display:none;">LinkedIn</a>
                    <a id="github-link" href="#" target="_blank" style="display:none;">GitHub</a>

                </p>
            </div>
        </header>

        <!-- Summary -->
        <section id="section-summary" style="display:none;">
            <h2>Professional Summary</h2>
            <p id="summary-text">{{summary}}</p>
        </section>

        <!-- Experience -->
        <section id="section-experience" style="display:none;">
            <h2>Professional Experience</h2>
           <div id="experience-list" class="flex flex-col gap-4"></div>

            <div class="experience-item item-template" data-template="experience">
                <h3 class="font-bold">
                    <span class="exp-company">{{experience.company}}</span>,
                    <span class="exp-job-title">{{experience.jobTitle}}</span>
                </h3>
                <p class="text-muted">
                    <span class="exp-start-date">{{experience.startDate}}</span> –
                    <span class="exp-end-date">{{experience.endDate}}</span>
                </p>
                <div class="exp-description"></div>
            </div>
        </section>

        <!-- Projects -->
        <section id="section-projects" style="display:none;">
            <h2>Projects</h2>
            <div id="projects-list" class="flex flex-col gap-4"></div>

            <div class="project-item item-template" data-template="projects">
                <h3 class="proj-name font-bold">{{projects.name}}</h3>
                <p class="text-muted">
                    <span class="proj-start-date">{{projects.startDate}}</span> –
                    <span class="proj-end-date">{{projects.endDate}}</span>
                </p>
                <ul class="proj-description"></ul>
            </div>
        </section>

        <!-- Education -->
        <section id="section-education" style="display:none;">
            <h2>Education</h2>
            <div id="education-list" class="flex flex-col gap-4 "></div>

            <div class="education-item item-template" data-template="education">
                <p class="font-bold edu-degree">{{education.degree}}</p>
                <p class="text-muted">
                    <span class="edu-institution">{{education.institution}}</span> —
                    <span class="edu-end-date">{{education.endDate}}</span>
                </p>
            </div>
        </section>

        <!-- Skills -->
        <section id="section-skills" style="display:none;">
            <h2>Skills</h2>
            <div id="skills-list" class="flex flex-wrap items-center [&>div:not(:last-child)]:after:content-[',\xA0']"></div>

            <div class="skill-item item-template" data-template="skills">
                <span class="skill-name">{{skills.name}}</span>
            </div>
        </section>

        <!-- Languages -->
        <section id="section-languages" style="display:none;">
            <h2>Languages</h2>
            <div id="languages-list" class="flex flex-col gap-4 "></div>

            <div class="language-item item-template" data-template="languages">
                <p>
                    <strong class="lang-name font-bold">{{language.language}}</strong> —
                    <span class="lang-proficiency">{{language.proficiency}}</span>
                </p>
            </div>
        </section>

        <!-- Certifications -->
        <section id="section-certifications" style="display:none;">
            <h2>Certifications</h2>
            <div id="certifications-list" class="flex flex-col gap-4 "></div>

            <div class="certification-item item-template" data-template="certifications">
                <h3 class="cert-name font-bold">{{certification.name}}</h3>
                <p class="text-muted">
                    <span class="cert-issuer">{{certification.issuer}}</span> ·
                    <span class="cert-date">{{certification.date}}</span>
                </p>
            </div>
        </section>

        <!-- Awards -->
        <section id="section-awards" style="display:none;">
            <h2>Awards & Honors</h2>
            <div id="awards-list"></div>

            <div class="award-item item-template" data-template="awards">
                <h3 class="award-title font-bold">{{award.title}}</h3>
                <p class="text-muted">
                    <span class="award-issuer">{{award.issuer}}</span> ·
                    <span class="award-date">{{award.date}}</span>
                </p>
                <p class="award-description">{{award.description}}</p>
            </div>
        </section>

        <!-- Achievements -->
        <section id="section-achievements" style="display:none;">
            <h2>Key Achievements</h2>
            <div id="achievements-list" class="flex flex-col gap-4 "></div>

            <div class="achievement-item item-template" data-template="achievements">
                <h3 class="achievement-title font-bold">{{achievement.title}}</h3>
                <p class="text-muted achievement-date">{{achievement.date}}</p>
                <p class="achievement-description">{{achievement.description}}</p>
            </div>
        </section>

        <!-- Publications -->
        <section id="section-publications" style="display:none;">
            <h2>Publications</h2>
            <div id="publications-list" class="flex flex-col gap-4"></div>

            <div class="publication-item item-template" data-template="publications">
                <h3 class="pub-title font-bold">{{publication.title}}</h3>
                <p class="text-muted">
                    <span class="pub-publisher">{{publication.publisher}}</span> ·
                    <span class="pub-date">{{publication.date}}</span>
                </p>
                <p class="pub-description">{{publication.description}}</p>
            </div>
        </section>

        <!-- Volunteer -->
        <section id="section-volunteer" style="display:none;">
            <h2>Volunteer Experience</h2>
            <div id="volunteer-list" class="flex flex-col gap-4"></div>

            <div class="volunteer-item item-template" data-template="volunteer">
                <h3 class="font-bold">
                    <span class="vol-organization">{{volunteer.organization}}</span>,
                    <span class="vol-role">{{volunteer.role}}</span>
                </h3>
                <p class="text-muted">
                    <span class="vol-start-date">{{volunteer.startDate}}</span> –
                    <span class="vol-end-date">{{volunteer.endDate}}</span>
                </p>
                <p class="vol-description">{{volunteer.description}}</p>
            </div>
        </section>

        <!-- Interests -->
        <section id="section-interests" style="display:none;">
            <h2>Interests & Hobbies</h2>
            <div id="interests-list" class="flex flex-wrap items-center [&>div:not(:last-child)]:after:content-[',\xA0']"></div>
            <div class="interest-item item-template" data-template="interests">
                <span class="interest-name">{{interest.name}}</span>
            </div>
        </section>

        <!-- References -->
        <section id="section-references" style="display:none;">
            <h2>References</h2>
            <div id="references-list" class="flex flex-col gap-4"></div>

            <div class="reference-item item-template" data-template="references">
                <h3 class="ref-name font-bold">{{reference.name}}</h3>
                <p class="text-muted ref-job-title">{{reference.jobTitle}}</p>
                <p class="text-muted ref-company">{{reference.company}}</p>
                <p class="text-muted">
                    <span class="ref-email">{{reference.email}}</span> ·
                    <span class="ref-phone">{{reference.phone}}</span>
                </p>
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

    <!-- Tailwind (optional – safe to keep) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Nunito", sans-serif;
            color: #1f2937;
            background: #ffffff;
        }

        @media print {
            body {
                margin: 0;
            }
        }

        .item-template {
            display: none;
        }

        main {
            max-width: 900px;
            margin: 0 auto;
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        header {
            display: flex;
            gap: 24px;
            align-items: center;
        }

        header img {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid #e5e7eb;
        }

        h1 {
            font-size: 32px;
            font-weight: 800;
            margin: 0;
        }

        h3 {
            margin: 4px 0;
            font-weight: 700;
        }

        p {
            margin: 4px 0;
            font-size: 14px;
        }

        section {
            width: 100%;
        }

        section h2 {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 6px;
            margin-bottom: 12px;
        }

        ul {
            margin: 6px 0 0 18px;
            padding: 0;
        }

        li {
            margin-bottom: 6px;
            font-size: 14px;
        }

        .text-muted {
            color: #6b7280;
            font-size: 13px;
        }

        a {
            color: #2563eb;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <main id="resume-root">

        <!-- Header -->
        <header id="section-personalInfo">
            <div>
                <h1 id="full-name" class="text-3xl  font-bold">{{firstName}} {{lastName}}</h1>
                <h3 id="job-title">{{jobTitle}}</h3>

                <p class="text-muted">
                
                    <span id="address">Seoul, South Korea</span> ·
                    <span id="email">{{email}}</span> ·
                    <span id="phone">{{phone}}</span>
                    <a id="linkedin-link" href="#" target="_blank" style="display:none;">LinkedIn</a>
                    <a id="github-link" href="#" target="_blank" style="display:none;">GitHub</a>

                </p>
            </div>
        </header>

        <!-- Summary -->
        <section id="section-summary" style="display:none;">
            <h2>Professional Summary</h2>
            <p id="summary-text">{{summary}}</p>
        </section>

        <!-- Experience -->
        <section id="section-experience" style="display:none;">
            <h2>Professional Experience</h2>
           <div id="experience-list" class="flex flex-col gap-4"></div>

            <div class="experience-item item-template" data-template="experience">
                <h3 class="font-bold">
                    <span class="exp-company">{{experience.company}}</span>,
                    <span class="exp-job-title">{{experience.jobTitle}}</span>
                </h3>
                <p class="text-muted">
                    <span class="exp-start-date">{{experience.startDate}}</span> –
                    <span class="exp-end-date">{{experience.endDate}}</span>
                </p>
                <div class="exp-description"></div>
            </div>
        </section>

        <!-- Projects -->
        <section id="section-projects" style="display:none;">
            <h2>Projects</h2>
            <div id="projects-list" class="flex flex-col gap-4"></div>

            <div class="project-item item-template" data-template="projects">
                <h3 class="proj-name font-bold">{{projects.name}}</h3>
                <p class="text-muted">
                    <span class="proj-start-date">{{projects.startDate}}</span> –
                    <span class="proj-end-date">{{projects.endDate}}</span>
                </p>
                <ul class="proj-description"></ul>
            </div>
        </section>

        <!-- Education -->
        <section id="section-education" style="display:none;">
            <h2>Education</h2>
            <div id="education-list" class="flex flex-col gap-4 "></div>

            <div class="education-item item-template" data-template="education">
                <p class="font-bold edu-degree">{{education.degree}}</p>
                <p class="text-muted">
                    <span class="edu-institution">{{education.institution}}</span> —
                    <span class="edu-end-date">{{education.endDate}}</span>
                </p>
            </div>
        </section>

        <!-- Skills -->
        <section id="section-skills" style="display:none;">
            <h2>Skills</h2>
            <div id="skills-list" class="flex flex-wrap items-center [&>div:not(:last-child)]:after:content-[',\xA0']"></div>

            <div class="skill-item item-template" data-template="skills">
                <span class="skill-name">{{skills.name}}</span>
            </div>
        </section>

        <!-- Languages -->
        <section id="section-languages" style="display:none;">
            <h2>Languages</h2>
            <div id="languages-list" class="flex flex-col gap-4 "></div>

            <div class="language-item item-template" data-template="languages">
                <p>
                    <strong class="lang-name font-bold">{{language.language}}</strong> —
                    <span class="lang-proficiency">{{language.proficiency}}</span>
                </p>
            </div>
        </section>

        <!-- Certifications -->
        <section id="section-certifications" style="display:none;">
            <h2>Certifications</h2>
            <div id="certifications-list" class="flex flex-col gap-4 "></div>

            <div class="certification-item item-template" data-template="certifications">
                <h3 class="cert-name font-bold">{{certification.name}}</h3>
                <p class="text-muted">
                    <span class="cert-issuer">{{certification.issuer}}</span> ·
                    <span class="cert-date">{{certification.date}}</span>
                </p>
            </div>
        </section>

        <!-- Awards -->
        <section id="section-awards" style="display:none;">
            <h2>Awards & Honors</h2>
            <div id="awards-list"></div>

            <div class="award-item item-template" data-template="awards">
                <h3 class="award-title font-bold">{{award.title}}</h3>
                <p class="text-muted">
                    <span class="award-issuer">{{award.issuer}}</span> ·
                    <span class="award-date">{{award.date}}</span>
                </p>
                <p class="award-description">{{award.description}}</p>
            </div>
        </section>

        <!-- Achievements -->
        <section id="section-achievements" style="display:none;">
            <h2>Key Achievements</h2>
            <div id="achievements-list" class="flex flex-col gap-4 "></div>

            <div class="achievement-item item-template" data-template="achievements">
                <h3 class="achievement-title font-bold">{{achievement.title}}</h3>
                <p class="text-muted achievement-date">{{achievement.date}}</p>
                <p class="achievement-description">{{achievement.description}}</p>
            </div>
        </section>

        <!-- Publications -->
        <section id="section-publications" style="display:none;">
            <h2>Publications</h2>
            <div id="publications-list" class="flex flex-col gap-4"></div>

            <div class="publication-item item-template" data-template="publications">
                <h3 class="pub-title font-bold">{{publication.title}}</h3>
                <p class="text-muted">
                    <span class="pub-publisher">{{publication.publisher}}</span> ·
                    <span class="pub-date">{{publication.date}}</span>
                </p>
                <p class="pub-description">{{publication.description}}</p>
            </div>
        </section>

        <!-- Volunteer -->
        <section id="section-volunteer" style="display:none;">
            <h2>Volunteer Experience</h2>
            <div id="volunteer-list" class="flex flex-col gap-4"></div>

            <div class="volunteer-item item-template" data-template="volunteer">
                <h3 class="font-bold">
                    <span class="vol-organization">{{volunteer.organization}}</span>,
                    <span class="vol-role">{{volunteer.role}}</span>
                </h3>
                <p class="text-muted">
                    <span class="vol-start-date">{{volunteer.startDate}}</span> –
                    <span class="vol-end-date">{{volunteer.endDate}}</span>
                </p>
                <p class="vol-description">{{volunteer.description}}</p>
            </div>
        </section>

        <!-- Interests -->
        <section id="section-interests" style="display:none;">
            <h2>Interests & Hobbies</h2>
            <div id="interests-list" class="flex flex-wrap items-center [&>div:not(:last-child)]:after:content-[',\xA0']"></div>
            <div class="interest-item item-template" data-template="interests">
                <span class="interest-name">{{interest.name}}</span>
            </div>
        </section>

        <!-- References -->
        <section id="section-references" style="display:none;">
            <h2>References</h2>
            <div id="references-list" class="flex flex-col gap-4"></div>

            <div class="reference-item item-template" data-template="references">
                <h3 class="ref-name font-bold">{{reference.name}}</h3>
                <p class="text-muted ref-job-title">{{reference.jobTitle}}</p>
                <p class="text-muted ref-company">{{reference.company}}</p>
                <p class="text-muted">
                    <span class="ref-email">{{reference.email}}</span> ·
                    <span class="ref-phone">{{reference.phone}}</span>
                </p>
            </div>
        </section>

    </main>
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

    <!-- Tailwind (optional – safe to keep) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Nunito", sans-serif;
            color: #1f2937;
            background: #ffffff;
        }

        @media print {
            body {
                margin: 0;
            }
        }

        .item-template {
            display: none;
        }

        main {
            max-width: 900px;
            margin: 0 auto;
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        header {
            display: flex;
            gap: 24px;
            align-items: center;
        }

        header img {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid #e5e7eb;
        }

        h1 {
            font-size: 32px;
            font-weight: 800;
            margin: 0;
        }

        h3 {
            margin: 4px 0;
            font-weight: 700;
        }

        p {
            margin: 4px 0;
            font-size: 14px;
        }

        section {
            width: 100%;
        }

        section h2 {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 6px;
            margin-bottom: 12px;
        }

        ul {
            margin: 6px 0 0 18px;
            padding: 0;
        }

        li {
            margin-bottom: 6px;
            font-size: 14px;
        }

        .text-muted {
            color: #6b7280;
            font-size: 13px;
        }

        a {
            color: #2563eb;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <main id="resume-root">
        <!-- Header -->
        <header id="section-personalInfo" class="flex item-center text-center justify-center">
            <div>
                <h1 id="full-name" class="text-3xl  font-bold">{{firstName}} {{lastName}}</h1>
                <h3 id="job-title">{{jobTitle}}</h3>

                <p class="text-muted">
                
                    <span id="address">Seoul, South Korea</span> ·
                    <span id="email">{{email}}</span> ·
                    <span id="phone">{{phone}}</span>
                    <a id="linkedin-link" href="#" target="_blank" style="display:none;">LinkedIn</a>
                    <a id="github-link" href="#" target="_blank" style="display:none;">GitHub</a>

                </p>
            </div>
        </header>

        <!-- Summary -->
        <section id="section-summary" style="display:none;">
            <h2>Professional Summary</h2>
            <p id="summary-text">{{summary}}</p>
        </section>

        <!-- Experience -->
        <section id="section-experience" style="display:none;">
            <h2>Professional Experience</h2>
           <div id="experience-list" class="flex flex-col gap-4"></div>

            <div class="experience-item item-template" data-template="experience">
                <h3 class="font-bold">
                    <span class="exp-company">{{experience.company}}</span>,
                    <span class="exp-job-title">{{experience.jobTitle}}</span>
                </h3>
                <p class="text-muted">
                    <span class="exp-start-date">{{experience.startDate}}</span> –
                    <span class="exp-end-date">{{experience.endDate}}</span>
                </p>
                <div class="exp-description"></div>
            </div>
        </section>

        <!-- Projects -->
        <section id="section-projects" style="display:none;">
            <h2>Projects</h2>
            <div id="projects-list" class="flex flex-col gap-4"></div>

            <div class="project-item item-template" data-template="projects">
                <h3 class="proj-name font-bold">{{projects.name}}</h3>
                <p class="text-muted">
                    <span class="proj-start-date">{{projects.startDate}}</span> –
                    <span class="proj-end-date">{{projects.endDate}}</span>
                </p>
                <ul class="proj-description"></ul>
            </div>
        </section>

        <!-- Education -->
        <section id="section-education" style="display:none;">
            <h2>Education</h2>
            <div id="education-list" class="flex flex-col gap-4 "></div>

            <div class="education-item item-template" data-template="education">
                <p class="font-bold edu-degree">{{education.degree}}</p>
                <p class="text-muted">
                    <span class="edu-institution">{{education.institution}}</span> —
                    <span class="edu-end-date">{{education.endDate}}</span>
                </p>
            </div>
        </section>

        <!-- Skills -->
        <section id="section-skills" style="display:none;">
            <h2>Skills</h2>
            <div id="skills-list" class="flex flex-wrap items-center [&>div:not(:last-child)]:after:content-[',\xA0']"></div>

            <div class="skill-item item-template" data-template="skills">
                <span class="skill-name">{{skills.name}}</span>
            </div>
        </section>

        <!-- Languages -->
        <section id="section-languages" style="display:none;">
            <h2>Languages</h2>
            <div id="languages-list" class="flex flex-col gap-4 "></div>

            <div class="language-item item-template" data-template="languages">
                <p>
                    <strong class="lang-name font-bold">{{language.language}}</strong> —
                    <span class="lang-proficiency">{{language.proficiency}}</span>
                </p>
            </div>
        </section>

        <!-- Certifications -->
        <section id="section-certifications" style="display:none;">
            <h2>Certifications</h2>
            <div id="certifications-list" class="flex flex-col gap-4 "></div>

            <div class="certification-item item-template" data-template="certifications">
                <h3 class="cert-name font-bold">{{certification.name}}</h3>
                <p class="text-muted">
                    <span class="cert-issuer">{{certification.issuer}}</span> ·
                    <span class="cert-date">{{certification.date}}</span>
                </p>
            </div>
        </section>

        <!-- Awards -->
        <section id="section-awards" style="display:none;">
            <h2>Awards & Honors</h2>
            <div id="awards-list"></div>

            <div class="award-item item-template" data-template="awards">
                <h3 class="award-title font-bold">{{award.title}}</h3>
                <p class="text-muted">
                    <span class="award-issuer">{{award.issuer}}</span> ·
                    <span class="award-date">{{award.date}}</span>
                </p>
                <p class="award-description">{{award.description}}</p>
            </div>
        </section>

        <!-- Achievements -->
        <section id="section-achievements" style="display:none;">
            <h2>Key Achievements</h2>
            <div id="achievements-list" class="flex flex-col gap-4 "></div>

            <div class="achievement-item item-template" data-template="achievements">
                <h3 class="achievement-title font-bold">{{achievement.title}}</h3>
                <p class="text-muted achievement-date">{{achievement.date}}</p>
                <p class="achievement-description">{{achievement.description}}</p>
            </div>
        </section>

        <!-- Publications -->
        <section id="section-publications" style="display:none;">
            <h2>Publications</h2>
            <div id="publications-list" class="flex flex-col gap-4"></div>

            <div class="publication-item item-template" data-template="publications">
                <h3 class="pub-title font-bold">{{publication.title}}</h3>
                <p class="text-muted">
                    <span class="pub-publisher">{{publication.publisher}}</span> ·
                    <span class="pub-date">{{publication.date}}</span>
                </p>
                <p class="pub-description">{{publication.description}}</p>
            </div>
        </section>

        <!-- Volunteer -->
        <section id="section-volunteer" style="display:none;">
            <h2>Volunteer Experience</h2>
            <div id="volunteer-list" class="flex flex-col gap-4"></div>

            <div class="volunteer-item item-template" data-template="volunteer">
                <h3 class="font-bold">
                    <span class="vol-organization">{{volunteer.organization}}</span>,
                    <span class="vol-role">{{volunteer.role}}</span>
                </h3>
                <p class="text-muted">
                    <span class="vol-start-date">{{volunteer.startDate}}</span> –
                    <span class="vol-end-date">{{volunteer.endDate}}</span>
                </p>
                <p class="vol-description">{{volunteer.description}}</p>
            </div>
        </section>

        <!-- Interests -->
        <section id="section-interests" style="display:none;">
            <h2>Interests & Hobbies</h2>
            <div id="interests-list" class="flex flex-wrap items-center [&>div:not(:last-child)]:after:content-[',\xA0']"></div>
            <div class="interest-item item-template" data-template="interests">
                <span class="interest-name">{{interest.name}}</span>
            </div>
        </section>

        <!-- References -->
        <section id="section-references" style="display:none;">
            <h2>References</h2>
            <div id="references-list" class="flex flex-col gap-4"></div>

            <div class="reference-item item-template" data-template="references">
                <h3 class="ref-name font-bold">{{reference.name}}</h3>
                <p class="text-muted ref-job-title">{{reference.jobTitle}}</p>
                <p class="text-muted ref-company">{{reference.company}}</p>
                <p class="text-muted">
                    <span class="ref-email">{{reference.email}}</span> ·
                    <span class="ref-phone">{{reference.phone}}</span>
                </p>
            </div>
        </section>

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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif']
          }
        }
      }
    }
  </script>
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
            <ul class="exp-description text-sm text-gray-700 list-disc ml-5"></ul>
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
            <ul class="proj-description text-sm text-gray-700 list-disc ml-5"></ul>
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif']
          }
        }
      }
    }
  </script>
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
        <ul class="exp-description text-sm text-gray-700 list-disc ml-5"></ul>
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
        <ul class="proj-description text-sm text-gray-700 list-disc ml-5"></ul>
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif']
          }
        }
      }
    }
  </script>
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
          <ul class="exp-description text-sm text-gray-700 list-disc ml-5"></ul>
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
          <ul class="proj-description text-sm text-gray-700 list-disc ml-5"></ul>
        </div>
      </section>
    </main>
  </div>
</body>
</html>`
  },
  {
    id: "692bcfddd39561eef09d89aa8",
    name: "Compact Professional",
    image: "https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/441/persistent-resource/sydney-resume-templates.jpg?v=1651657428",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{firstName}} {{lastName}} - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif']
          }
        }
      }
    }
  </script>
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
        <ul class="exp-description text-xs text-gray-700 list-disc ml-4"></ul>
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
        <ul class="proj-description text-xs text-gray-700 list-disc ml-4"></ul>
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
  },
  {
    id: "692bcfd239561eef09d89aa8",
    name: "Modern Professional",
    image: "https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/428/persistent-resource/paris-resume-templates.jpg?v=1656071272",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{firstName}} {{lastName}} - Resume</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif']
          }
        }
      }
    }
  </script>

  <style>
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
    }
    
    .item-template {
      display: none;
    }
    
    /* Add comma after each skill except the last one */
    #skills-list .skill-item:not(:last-child)::after {
      content: ",";
      margin-left: 2px;
    }
  </style>
</head>

<body class="bg-gray-100">

  <main id="resume-root" class="max-w-5xl mx-auto bg-white p-10 flex gap-x-10">

    <!-- LEFT COLUMN -->
    <section class="flex-1">

      <!-- HEADER -->
      <header id="section-personalInfo" class="mb-8">
        <h1 id="full-name" class="text-4xl font-serif font-bold text-red-700 mb-1">
          {{firstName}} {{lastName}}
        </h1>
        <p class="text-sm text-gray-700">
          <span id="email">{{email}}</span> · <span id="phone">{{phone}}</span>
        </p>
      </header>

      <!-- SUMMARY -->
      <section id="section-summary" class="mb-8" style="display: none;">
        <h2 class="text-lg font-serif font-bold border-b border-gray-300 pb-1 mb-3">
          Professional Summary
        </h2>
        <p id="summary-text" class="text-sm text-gray-800 leading-relaxed">
          {{summary}}
        </p>
      </section>

      <!-- EXPERIENCE -->
      <section id="section-experience" class="mb-8" style="display: none;">
        <h2 class="text-lg font-serif font-bold border-b border-gray-300 pb-1 mb-4">
          Professional Experience
        </h2>

        <div id="experience-list"></div>

        <div class="experience-item item-template mt-5" data-template="experience">
          <h3 class="font-bold text-sm">
            <span class="exp-company">{{experience.company}}</span>,
            <span class="exp-job-title">{{experience.jobTitle}}</span>
          </h3>
          <p class="text-xs text-gray-600 mb-2">
            <span class="exp-start-date">{{experience.startDate}}</span> –
            <span class="exp-end-date">{{experience.endDate}}</span>
          </p>
          <ul class="exp-description text-sm text-gray-800 leading-relaxed list-disc ml-5">
          </ul>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="section-projects" class="mb-8" style="display: none;">
        <h2 class="text-lg font-serif font-bold border-b border-gray-300 pb-1 mb-4">
          Projects
        </h2>

        <div id="projects-list"></div>

        <div class="project-item item-template mt-4" data-template="projects">
          <h3 class="font-bold text-sm proj-name">
            {{projects.name}}
          </h3>
          <p class="text-xs text-gray-600 mb-2">
            <span class="proj-start-date">{{projects.startDate}}</span> –
            <span class="proj-end-date">{{projects.endDate}}</span>
          </p>
          <ul class="proj-description text-sm text-gray-800 leading-relaxed list-disc ml-5">
          </ul>
        </div>
      </section>

      <!-- EDUCATION -->
      <section id="section-education" class="mb-8" style="display: none;">
        <h2 class="text-lg font-serif font-bold border-b border-gray-300 pb-1 mb-4">
          Education
        </h2>

        <div id="education-list"></div>

        <div class="education-item item-template mt-4" data-template="education">
          <p class="font-bold text-sm edu-degree">
            {{education.degree}}
          </p>
          <p class="text-sm text-gray-700">
            <span class="edu-institution">{{education.institution}}</span> —
            <span class="edu-end-date">{{education.endDate}}</span>
          </p>
        </div>
      </section>

    </section>

    <!-- RIGHT COLUMN -->
    <aside class="w-1/3">

      <!-- PROFILE IMAGE -->
      <div class="mb-8 flex justify-center">
        <img
          id="profile-image"
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60"
          alt="Profile"
          class="w-32 h-32 object-cover border"
        />
      </div>

      <!-- SKILLS -->
      <section id="section-skills" style="display: none;">
        <h2 class="text-lg font-serif font-bold border-b border-gray-300 pb-1 mb-4">
          Skills
        </h2>

        <div id="skills-list" class="space-y-2 text-sm"></div>

        <div class="skill-item item-template" data-template="skills">
          <p>
            <span class="font-bold skill-name">{{skills.name}}</span>
            <span class="skill-level">: {{skills.level}}</span>
          </p>
        </div>
      </section>

    </aside>

  </main>

</body>
</html>
`

  },
  {
    id: "692bcfd239561eef09d89ats",
    name: "ATS Professional",
    image: "https://s3.resume.io/cdn-cgi/image/width=852,format=auto/uploads/local_template_image/image/441/persistent-resource/sydney-resume-templates.jpg?v=1651657428",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{firstName}} {{lastName}} - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    @media print { 
      body { margin: 0; padding: 0; }
      @page { margin: 0.5in; }
    }
    .item-template { display: none; }
    
    body {
      font-family: 'Poppins', Arial, Helvetica, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000000;
      background-color: #ffffff;
      max-width: 8.5in;
      margin: 0 auto;
      padding: 0.5in;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
      font-weight: bold;
    }
    
    h1 {
      font-size: 18pt;
      margin-bottom: 4pt;
      text-transform: uppercase;
      letter-spacing: 1pt;
    }
    
    h2 {
      font-size: 12pt;
      margin-top: 12pt;
      margin-bottom: 6pt;
      padding-bottom: 2pt;
      border-bottom: 1pt solid #000000;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    
    h3 {
      font-size: 11pt;
      margin-top: 8pt;
      margin-bottom: 2pt;
    }
    
    p, ul, li {
      margin: 0;
      padding: 0;
    }
    
    ul {
      margin-left: 20pt;
      margin-top: 4pt;
      margin-bottom: 8pt;
    }
    
    li {
      margin-bottom: 3pt;
      line-height: 1.3;
    }
    
    .contact-info {
      text-align: center;
      margin-bottom: 12pt;
      font-size: 10pt;
    }
    
    .section {
      margin-bottom: 12pt;
      display: block;
      width: 100%;
    }
    
    .job-header {
      margin-bottom: 2pt;
    }
    
    .job-title {
      font-weight: bold;
      font-size: 11pt;
    }
    
    .company-name {
      font-weight: bold;
    }
    
    .date-range {
      font-style: italic;
      font-size: 10pt;
      color: #333333;
    }
    
    .skills-list {
      margin-left: 0;
      list-style: none;
    }
    
    .skills-list li {
      margin-bottom: 4pt;
    }
    
    .skill-category {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="resume-root">
    
    <!-- HEADER -->
    <header id="section-personalInfo">
      <h1 id="full-name">{{firstName}} {{lastName}}</h1>
      <div class="contact-info">
        <span id="email">{{email}}</span> | <span id="phone">{{phone}}</span>
      </div>
    </header>

    <!-- PROFESSIONAL SUMMARY -->
    <section id="section-summary" class="section" style="display: none;">
      <h2>PROFESSIONAL SUMMARY</h2>
      <p id="summary-text">{{summary}}</p>
    </section>

    <!-- CORE SKILLS -->
    <section id="section-skills" class="section" style="display: none;">
      <h2>CORE SKILLS</h2>
      <ul id="skills-list" class="skills-list"></ul>
      <li class="skill-item item-template" data-template="skills">
        <span class="skill-name">{{skills.name}}</span>: <span class="skill-level">{{skills.level}}</span>
      </li>
    </section>

    <!-- PROFESSIONAL EXPERIENCE -->
    <section id="section-experience" class="section" style="display: none;">
      <h2>PROFESSIONAL EXPERIENCE</h2>
      <div id="experience-list"></div>
      <div class="experience-item item-template" data-template="experience">
        <div class="job-header">
          <h3 class="job-title exp-job-title">{{experience.jobTitle}}</h3>
          <p><span class="company-name exp-company">{{experience.company}}</span> | <span class="date-range"><span class="exp-start-date">{{experience.startDate}}</span> - <span class="exp-end-date">{{experience.endDate}}</span></span></p>
        </div>
        <ul class="exp-description" style="margin-left: 20pt; list-style-type: disc;"></ul>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="section-projects" class="section" style="display: none;">
      <h2>KEY PROJECTS</h2>
      <div id="projects-list"></div>
      <div class="project-item item-template" data-template="projects">
        <div class="job-header">
          <h3 class="proj-name">{{projects.name}}</h3>
          <p class="date-range"><span class="proj-start-date">{{projects.startDate}}</span> - <span class="proj-end-date">{{projects.endDate}}</span></p>
        </div>
        <ul class="proj-description" style="margin-left: 20pt; list-style-type: disc;"></ul>
      </div>
    </section>

    <!-- EDUCATION -->
    <section id="section-education" class="section" style="display: none;">
      <h2>EDUCATION</h2>
      <div id="education-list"></div>
      <div class="education-item item-template" data-template="education">
        <h3 class="edu-degree">{{education.degree}}</h3>
        <p><span class="edu-institution">{{education.institution}}</span> | <span class="date-range edu-end-date">{{education.endDate}}</span></p>
      </div>
    </section>

    <!-- CERTIFICATIONS -->
    <section id="section-certifications" class="section" style="display: none;">
      <h2>CERTIFICATIONS</h2>
      <div id="certifications-list"></div>
      <div class="certification-item item-template" data-template="certifications">
        <h3 class="cert-name">{{certifications.name}}</h3>
        <p><span class="cert-issuer">{{certifications.issuer}}</span> | <span class="date-range cert-date">{{certifications.date}}</span></p>
      </div>
    </section>

  </div>
</body>
</html>`
  }
]


