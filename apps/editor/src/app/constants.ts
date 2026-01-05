import { FormSchema } from "./FieldRenderer"

export const dummyData = {
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Senior Software Engineer",
    "summary": "Experienced software engineer with 8+ years of expertise in building scalable web applications, leading cross-functional teams, and delivering high-quality products using modern technologies. Passionate about clean code, system architecture, and mentoring junior developers.",
    "email": "john.doe@email.com",
    "phone": "+91 6393177038",
    "city": "Maharajganj",
    "state": "Uttar Pradesh",
    "pincode": "273303",
    "country": "India",
    "linkedin": "https://www.linkedin.com/avinashdev",
    "github": "https://www.github.com/avinashdev"
  },
  "experience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Solutions Inc.",
      "startDate": "2021-01",
      "endDate": "",
      "description": "Led development of enterprise web applications using React and Node.js. Optimized system performance by 30%, mentored 5 junior developers, and collaborated with product teams to deliver new features. Implemented CI/CD pipelines and improved code quality through testing."
    },
    {
      "jobTitle": "Software Engineer",
      "company": "Digital Labs",
      "startDate": "2018-06",
      "endDate": "2020-12",
      "description": "Developed REST APIs and microservices, implemented responsive UI components using React, and improved code quality through unit testing and peer reviews. Reduced API response time by 40% through optimization."
    }
  ],
  "education": [
    {
      "degree": "Master of Science in Computer Science",
      "institution": "Stanford University",
      "startDate": "2016-09",
      "endDate": "2018-05"
    },
    {
      "degree": "Bachelor of Technology in Computer Engineering",
      "institution": "University of California, Berkeley",
      "startDate": "2012-08",
      "endDate": "2016-05"
    }
  ],
  "projects": [
    {
      "name": "Resume Builder Platform",
      "startDate": "2023-03",
      "endDate": "2023-08",
      "description": "Built a dynamic resume builder with multiple templates, real-time preview, and PDF export using React, Next.js, and Tailwind CSS. Implemented drag-and-drop functionality and template customization features."
    },
    {
      "name": "E-Commerce Dashboard",
      "startDate": "2022-01",
      "endDate": "2022-05",
      "description": "Designed and developed an admin dashboard with analytics, order management, and role-based access control using React, TypeScript, and Chart.js. Integrated with REST APIs and implemented real-time updates."
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "level": "Expert"
    },
    {
      "name": "TypeScript",
      "level": "Advanced"
    },
    {
      "name": "React",
      "level": "Expert"
    },
    {
      "name": "Node.js",
      "level": "Advanced"
    },
    {
      "name": "Next.js",
      "level": "Advanced"
    },
    {
      "name": "Tailwind CSS",
      "level": "Advanced"
    },
    {
      "name": "MongoDB",
      "level": "Intermediate"
    },
    {
      "name": "PostgreSQL",
      "level": "Intermediate"
    },
    {
      "name": "Docker",
      "level": "Intermediate"
    },
    {
      "name": "AWS",
      "level": "Intermediate"
    }
  ],
  "certifications": [
    {
      "name": "Microsoft Excel",
      "issuer": "Microsoft",
      "date": "2026-11",
      "expiryDate": "2026-12",
      "credentialId": "63dcdc44nfejfsfdfdvk"
    }
  ],
  "languages": [
    {
      "language": "Hindi ",
      "proficiency": "Native"
    },
    {
      "language": "English",
      "proficiency": "Advanced"
    },
    {
      "language": "French",
      "proficiency": "Basic"
    }
  ],
  "awards": [
    {
      "title": "Employee Of the Year",
      "issuer": "Satschel",
      "date": "2026-11"
    },
    {
      "title": "Performace of Excellence",
      "issuer": "Compliance Innovation",
      "date": "2026-12"
    },
    {
      "title": "Unsung Hero",
      "issuer": "Speckyfox Technologies Pvt. Ltd",
      "date": "2026-12"
    }
  ],
  "customSections": [
    {
      "id": "languages",
      "label": "Languages",
      "icon": "🌍",
      "items": [
        {
          "id": "languages-0",
          "fields": {
            "language": {
              "label": "Language",
              "value": "Hindi ",
              "type": "text"
            },
            "proficiency": {
              "label": "Proficiency",
              "value": "Native",
              "type": "select"
            }
          }
        },
        {
          "id": "languages-1",
          "fields": {
            "language": {
              "label": "Language",
              "value": "English",
              "type": "text"
            },
            "proficiency": {
              "label": "Proficiency",
              "value": "Advanced",
              "type": "select"
            }
          }
        },
        {
          "id": "languages-2",
          "fields": {
            "language": {
              "label": "Language",
              "value": "French",
              "type": "text"
            },
            "proficiency": {
              "label": "Proficiency",
              "value": "Basic",
              "type": "select"
            }
          }
        }
      ],
      "fieldDefinitions": {
        "language": {
          "label": "Language",
          "type": "text"
        },
        "proficiency": {
          "label": "Proficiency",
          "type": "select",
          "options": [
            "Native",
            "Fluent",
            "Advanced",
            "Intermediate",
            "Basic"
          ]
        }
      }
    },
    {
      "id": "achievements",
      "label": "Achievements",
      "icon": "🏆",
      "items": [
        {
          "id": "achievements-0",
          "fields": {
            "title": {
              "label": "Achievement Title",
              "value": "Hounred By St Joseph School",
              "type": "text"
            },
            "date": {
              "label": "Date",
              "value": "2019-01",
              "type": "month"
            },
            "organization": {
              "label": "Organization",
              "value": "Babu Banarasi Das University",
              "type": "text"
            },
            "description": {
              "label": "Description",
              "value": "oftware engineer with 8+ years of expertise in building scalable web applications, leading cross-functional teams, and delivering high-quality products using modern technologies. Passionate about clean code, system architecture, and mentoring junior developers.",
              "type": "richtext"
            }
          }
        }
      ],
      "fieldDefinitions": {
        "title": {
          "label": "Achievement Title",
          "type": "text"
        },
        "date": {
          "label": "Date",
          "type": "month"
        },
        "organization": {
          "label": "Organization",
          "type": "text"
        },
        "description": {
          "label": "Description",
          "type": "richtext"
        }
      }
    },
    {
      "id": "interests",
      "label": "Interests & Hobbies",
      "icon": "🎯",
      "items": [
        {
          "id": "interests-0",
          "fields": {
            "name": {
              "label": "Interest/Hobby",
              "value": "PLaying Chess",
              "type": "text"
            }
          }
        },
        {
          "id": "interests-1",
          "fields": {
            "name": {
              "label": "Interest/Hobby",
              "value": "Playing Cricket",
              "type": "text"
            }
          }
        }
      ],
      "fieldDefinitions": {
        "name": {
          "label": "Interest/Hobby",
          "type": "text"
        }
      }
    },
    {
      "id": "awards",
      "label": "Awards & Honors",
      "icon": "🥇",
      "items": [
        {
          "id": "awards-0",
          "fields": {
            "title": {
              "label": "Award Title",
              "value": "Employee Of the Year",
              "type": "text"
            },
            "issuer": {
              "label": "Awarded By",
              "value": "Satschel",
              "type": "text"
            },
            "date": {
              "label": "Date",
              "value": "2026-11",
              "type": "month"
            }
          }
        },
        {
          "id": "awards-1",
          "fields": {
            "title": {
              "label": "Award Title",
              "value": "Performace of Excellence",
              "type": "text"
            },
            "issuer": {
              "label": "Awarded By",
              "value": "Compliance Innovation",
              "type": "text"
            },
            "date": {
              "label": "Date",
              "value": "2026-12",
              "type": "month"
            }
          }
        },
        {
          "id": "awards-2",
          "fields": {
            "title": {
              "label": "Award Title",
              "value": "Unsung Hero",
              "type": "text"
            },
            "issuer": {
              "label": "Awarded By",
              "value": "Speckyfox Technologies Pvt. Ltd",
              "type": "text"
            },
            "date": {
              "label": "Date",
              "value": "2026-12",
              "type": "month"
            }
          }
        }
      ],
      "fieldDefinitions": {
        "title": {
          "label": "Award Title",
          "type": "text"
        },
        "issuer": {
          "label": "Awarded By",
          "type": "text"
        },
        "date": {
          "label": "Date",
          "type": "month"
        },
        "description": {
          "label": "Description",
          "type": "richtext"
        }
      }
    },
    {
      "id": "certifications",
      "label": "Certifications",
      "icon": "📜",
      "items": [
        {
          "id": "certifications-0",
          "fields": {
            "name": {
              "label": "Certification Name",
              "value": "Microsoft Excel",
              "type": "text"
            },
            "issuer": {
              "label": "Issuing Organization",
              "value": "Microsoft",
              "type": "text"
            },
            "date": {
              "label": "Issue Date",
              "value": "2026-11",
              "type": "month"
            },
            "expiryDate": {
              "label": "Expiry Date",
              "value": "2026-12",
              "type": "month"
            },
            "credentialId": {
              "label": "Credential ID",
              "value": "63dcdc44nfejfsfdfdvk",
              "type": "text"
            }
          }
        }
      ],
      "fieldDefinitions": {
        "name": {
          "label": "Certification Name",
          "type": "text"
        },
        "issuer": {
          "label": "Issuing Organization",
          "type": "text"
        },
        "date": {
          "label": "Issue Date",
          "type": "month"
        },
        "expiryDate": {
          "label": "Expiry Date",
          "type": "month"
        },
        "credentialId": {
          "label": "Credential ID",
          "type": "text"
        }
      }
    },
    {
      "id": "publications",
      "label": "Publications",
      "icon": "📚",
      "items": [
        {
          "id": "publications-0",
          "fields": {
            "title": {
              "label": "Publication Title",
              "value": "E Book Shop",
              "type": "text"
            },
            "publisher": {
              "label": "Publisher",
              "value": "Avinash Mani",
              "type": "text"
            },
            "date": {
              "label": "Publication Date",
              "value": "2026-06",
              "type": "month"
            },
            "url": {
              "label": "URL",
              "value": "https://www.sheltershymphoney.com/2bhk-flat",
              "type": "text"
            }
          }
        }
      ],
      "fieldDefinitions": {
        "title": {
          "label": "Publication Title",
          "type": "text"
        },
        "publisher": {
          "label": "Publisher",
          "type": "text"
        },
        "date": {
          "label": "Publication Date",
          "type": "month"
        },
        "url": {
          "label": "URL",
          "type": "text"
        },
        "description": {
          "label": "Description",
          "type": "richtext"
        }
      }
    },
    {
      "id": "references",
      "label": "References",
      "icon": "👤",
      "items": [
        {
          "id": "references-0",
          "fields": {
            "name": {
              "label": "Name",
              "value": "Prateek Singh",
              "type": "text"
            },
            "title": {
              "label": "Title",
              "value": "Senior Product Designer",
              "type": "text"
            },
            "company": {
              "label": "Company",
              "value": "Compliance Innovation",
              "type": "text"
            },
            "email": {
              "label": "Email",
              "value": "avinashtiwari0555999@gmail.com",
              "type": "email"
            },
            "phone": {
              "label": "Phone",
              "value": "06393177038",
              "type": "text"
            }
          }
        }
      ],
      "fieldDefinitions": {
        "name": {
          "label": "Name",
          "type": "text"
        },
        "title": {
          "label": "Title",
          "type": "text"
        },
        "company": {
          "label": "Company",
          "type": "text"
        },
        "email": {
          "label": "Email",
          "type": "email"
        },
        "phone": {
          "label": "Phone",
          "type": "text"
        }
      }
    }
  ],
  "achievements": [
    {
      "title": "Hounred By St Joseph School",
      "date": "2019-01",
      "organization": "Babu Banarasi Das University",
      "description": "oftware engineer with 8+ years of expertise in building scalable web applications, leading cross-functional teams, and delivering high-quality products using modern technologies. Passionate about clean code, system architecture, and mentoring junior developers."
    }
  ],
  "interests": [
    {
      "name": "PLaying Chess"
    },
    {
      "name": "Playing Cricket"
    }
  ],
  "publications": [
    {
      "title": "E Book Shop",
      "publisher": "Avinash Mani",
      "date": "2026-06",
      "url": "https://www.sheltershymphoney.com/2bhk-flat"
    }
  ],
  "references": [
    {
      "name": "Prateek Singh",
      "title": "Senior Product Designer",
      "company": "Compliance Innovation",
      "email": "avinashtiwari0555999@gmail.com",
      "phone": "06393177038"
    }
  ],
  "order": [
    "personalInfo",
    "experience",
    "education",
    "projects",
    "skills",
    "languages",
    "achievements",
    "interests",
    "awards",
    "certifications",
    "publications",
    "references"
  ]
}

export const ResumeFormSchema: FormSchema = {
  personalInfo: {
    label: "Personal Info",
    type: "object",
    isCollapsible: false,
    fields: {
      jobTitle: { label: "Job Title", type: "text", className: "w-full" },
      firstName: { label: "First Name", type: "text", className: "w-[calc(50%-4px)]" },
      lastName: { label: "Last Name", type: "text", className: "w-[calc(50%-4px)]" },
      email: { label: "Email", type: "email", className: "w-[calc(50%-4px)]" },
      phone: { label: "Phone", type: "text", className: "w-[calc(50%-4px)]" },
      city: { label: "City", type: "text", className: "w-[calc(50%-4px)]" },
      state: { label: "State", type: 'text', className: "w-[calc(50%-4px)]" },
      pincode: { label: "Pincode", type: "text", className: "w-[calc(50%-4px)]" },
      country: { label: "Country", type: "text", className: "w-[calc(50%-4px)]" },
      linkedin: { label: "LinkedIn URL", type: "text", className: "w-[calc(50%-4px)]", description: "Your LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)" },
      github: { label: "GitHub URL", type: "text", className: "w-[calc(50%-4px)]", description: "Your GitHub profile URL (e.g., https://github.com/yourname)" },
      summary: { label: "Short Bio", type: "richtext", className: "w-full", description: "Be concise.Write 2-4 shorts and energetic sentences to intreset the recruiter! Mention role,experience and most importantly your biigest achievements best qualities and skills. See Examples for help " }
    }
  },
  experience: {
    label: "Employment History",
    type: "array",
    isCollapsible: true,
    item: {
      jobTitle: { label: "Job Title", type: "text", className: "w-[calc(50%-4px)]" },
      company: { label: "Employer", type: "text", className: "w-[calc(50%-4px)]" },
      startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
      endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" },
      description: { label: "Description", type: "richtext", className: "w-full" }
    }
  },
  education: {
    label: "Education",
    type: "array",
    isCollapsible: true,
    item: {
      degree: { label: "Degree", type: "text", className: "w-[calc(50%-4px)]" },
      institution: { label: "Institution", type: "text", className: "w-[calc(50%-4px)]" },
      startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
      endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" },
      description: { label: "Description", type: "richtext", className: "w-full" }
    }
  },
  projects: {
    label: "Projects",
    type: "array",
    isCollapsible: true,
    item: {
      name: { label: "Project Name", type: "text", className: "w-[calc(50%-4px)]" },
      companyName: { label: "Company Name", type: "text", className: "w-[calc(50%-4px)]" },
      startDate: { label: "Start Date", type: "month", className: "w-[calc(50%-4px)]" },
      endDate: { label: "End Date", type: "month", className: "w-[calc(50%-4px)]" },
      description: { label: "Description", type: "richtext", className: "w-full" }
    }
  },
  skills: {
    label: "Skills",
    type: "array",
    isCollapsible: true,
    item: {
      name: { label: "Skill Name", type: "text", className: "w-[calc(50%-4px)]" },
      level: {
        label: "Level",
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced", "Expert"],
        className: "w-[calc(50%-4px)]"
      }
    }
  }
}