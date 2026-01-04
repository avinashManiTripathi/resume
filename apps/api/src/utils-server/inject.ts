/* ---------- TYPES ---------- */

interface PersonalInfo {
    firstName: string;
    lastName: string;
    jobTitle: string;
    summary: string;
    email: string;
    phone: string;
}

interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string;
}

interface Education {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
}

interface Skill {
    name: string;
    level: string;
}

interface ResumeData {
    order: Array<"personalInfo" | "summary" | "experience" | "education" | "skills" | "projects">;
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
}

/* ---------- INJECT FUNCTION ---------- */

export const inject = (data: ResumeData): void => {
    /* ---------- PROFILE ---------- */
    const p = data.personalInfo;

    const fullName = document.getElementById("full-name");
    const jobTitle = document.getElementById("job-title");
    const summaryText = document.getElementById("summary-text");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    if (fullName) fullName.textContent = `${p.firstName} ${p.lastName}`;
    if (jobTitle) jobTitle.textContent = p.jobTitle;
    if (summaryText) summaryText.textContent = p.summary;
    if (email) email.textContent = p.email;
    if (phone) phone.textContent = p.phone;

    /* ---------- EXPERIENCE ---------- */
    // const exp = document.getElementById("experience-list") as HTMLElement;
    // exp.innerHTML = "";

    // data.experience?.forEach((e) => {
    //     const div = document.createElement("div");
    //     div.className = "mb-4";
    //     div.innerHTML = `
    //   <h4 class="font-medium">${e.jobTitle} – ${e.company}</h4>
    //   <p class="text-sm text-gray-500">
    //     ${e.startDate} – ${e.endDate ?? "Present"}
    //   </p>
    // `;
    //     exp.appendChild(div);
    // });

    /* ---------- EDUCATION ---------- */
    // const edu = document.getElementById("education-list") as HTMLElement;
    // edu.innerHTML = "";

    // data.education?.forEach((e) => {
    //     const div = document.createElement("div");
    //     div.innerHTML = `
    //   <p class="font-medium">${e.degree}</p>
    //   <p class="text-gray-600">
    //     ${e.institution} (${e.startDate} – ${e.endDate})
    //   </p>
    // `;
    //     edu.appendChild(div);
    // });

    /* ---------- SKILLS ---------- */
    // const skills = document.getElementById("skills-list") as HTMLUListElement;
    // skills.innerHTML = "";

    // data.skills?.forEach((s) => {
    //     const li = document.createElement("li");
    //     li.textContent = `${s.name} (${s.level})`;
    //     skills.appendChild(li);
    // });

    /* ---------- ORDER ENGINE ---------- */
    const root = document.getElementById("resume-root") as HTMLElement;

    const map: Record<string, HTMLElement | null> = {
        summary: document.getElementById("section-summary"),
        experience: document.getElementById("section-experience"),
        education: document.getElementById("section-education"),
        skills: document.getElementById("section-skills"),
        projects: document.getElementById("section-projects"),
        languages: document.getElementById("section-languages"),
        interests: document.getElementById("section-interests"),
        achievements: document.getElementById("section-achievements"),
        certifications: document.getElementById("section-certifications"),
        awards: document.getElementById("section-awards"),
        publications: document.getElementById("section-publications"),
        volunteer: document.getElementById("section-volunteer"),
        references: document.getElementById("section-references")
    };

    // Only reorder content sections, keep personalInfo (header) at the top
    data.order?.forEach((key) => {
        // Skip personalInfo as it should always stay at the top
        if (key === 'personalInfo') return;

        const section = map[key];
        if (section) root.appendChild(section);
    });
};

