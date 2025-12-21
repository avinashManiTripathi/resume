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
    order: Array<"profile" | "summary" | "experience" | "education" | "skills">;
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
}

/* ---------- INJECT FUNCTION ---------- */

export const inject = (data: ResumeData): void => {
    /* ---------- PROFILE ---------- */
    const p = data.personalInfo;

    const fullName = document.getElementById("full-name") as HTMLElement;
    const jobTitle = document.getElementById("job-title") as HTMLElement;
    const summaryText = document.getElementById("summary-text") as HTMLElement;
    const contactInfo = document.getElementById("contact-info") as HTMLElement;

    fullName.textContent = `${p.firstName} ${p.lastName}`;
    jobTitle.textContent = p.jobTitle;
    summaryText.textContent = p.summary;
    contactInfo.textContent = `${p.phone} | ${p.email}`;

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
        profile: document.getElementById("section-profile"),
        // summary: document.getElementById("section-summary"),
        // experience: document.getElementById("section-experience"),
        // education: document.getElementById("section-education"),
        // skills: document.getElementById("section-skills")
    };

    data.order?.forEach((key) => {
        const section = map[key];
        if (section) root.appendChild(section);
    });
};

