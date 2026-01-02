import { GoogleGenAI } from "@google/genai";



let ai = new GoogleGenAI({ apiKey: "AIzaSyCMPVoO7ZAtATO0OWB7rG-dmpf0TWFc2Vg" });

/**
 * Initialize the AI client
 * @param apiKey - Google API key
 */
export const initAI = (apiKey: string) => {
  // ai = new GoogleGenAI({ apiKey });
}

/**
 * Parse resume text and tailor it to job description using AI
 * @param resumeText - Extracted text from the resume PDF
 * @param jobDescription - Job description to tailor the resume for
 * @param jobTitle - Optional job title
 * @param company - Optional company name
 * @returns Structured resume data in JSON format
 */
export const parseResumeWithAI = async (
  resumeText: string,
  jobDescription: string,
  jobTitle?: string,
  company?: string
): Promise<any> => {
  try {
    const prompt = `You are an expert resume parser and ATS optimization specialist. Your task is to:

1. Extract all information from the provided resume text
2. Tailor the resume content to match the job description to increase chances of getting shortlisted
3. Optimize keywords and phrases to pass ATS (Applicant Tracking Systems)
4. Return the data in a strict JSON format

**RESUME TEXT:**
${resumeText}

**JOB DESCRIPTION:**
${jobDescription}

${jobTitle ? `**JOB TITLE:** ${jobTitle}` : ''}
${company ? `**COMPANY:** ${company}` : ''}

**INSTRUCTIONS:**

1. **Extract Personal Information:**
   - firstName, lastName, email, phone
   - LinkedIn and GitHub URLs if present
   - If job title in resume doesn't match the target job, suggest the target job title
   - Create a compelling summary (2-3 sentences) that highlights relevant experience for THIS specific job

2. **Tailor Work Experience:**
   - Extract all work experiences with jobTitle, company, startDate, endDate (format: YYYY-MM)
   - Rewrite descriptions to emphasize skills and achievements relevant to the job description
   - Use action verbs and quantify achievements where possible
   - Include keywords from the job description naturally
   - Keep descriptions concise but impactful (3-5 bullet points per role)

3. **Extract Education:**
   - degree, institution, startDate, endDate (format: YYYY-MM)
   - Include relevant coursework if it matches job requirements

4. **Optimize Skills:**
   - Extract technical and soft skills
   - Prioritize skills mentioned in the job description
   - Assign proficiency levels: "Beginner", "Intermediate", "Advanced", or "Expert"
   - Include both skills from resume AND relevant skills from job description that the candidate likely has

5. **Extract Projects (if any):**
   - name, startDate, endDate, description
   - Highlight projects relevant to the job description

6. **Extract Languages:**
   - language language, proficiency level (Native, Fluent, Proficient, Intermediate, Basic)

7. **Extract Achievements:**
   - title, description, date
   - Include notable accomplishments, awards received, recognition

8. **Extract Certifications:**
   - name, issuer, date, expiryDate (if applicable), credentialId, url
   - Professional certifications, licenses, courses completed

9. **Extract Awards & Honors:**
   - title, issuer, date, description
   - Academic awards, professional honors, recognitions

10. **Extract Publications:**
    - title, publisher, date, url, description
    - Research papers, articles, books, blog posts

11. **Extract Volunteer Experience:**
    - role, organization, startDate, endDate, currentlyVolunteering, description
    - Community service, non-profit work, volunteering roles

12. **Extract Interests & Hobbies:**
    - name, description
    - Personal interests that might be relevant professionally

13. **Extract References:**
    - name, jobTitle, company, email, phone
    - Professional references (only if explicitly mentioned)

**CRITICAL RULES:**
- Return ONLY valid JSON, no markdown, no explanations
- Use the exact field names specified
- All dates must be in YYYY-MM format
- Ensure descriptions are ATS-friendly (clear, keyword-rich, no special characters)
- Make the resume compelling for THIS specific job
- Keep all factual information accurate, only enhance presentation
- If a section is not present in the resume, return an empty array

**REQUIRED JSON STRUCTURE:**
{
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "jobTitle": "string (use target job title if appropriate)",
    "summary": "string (2-3 compelling sentences tailored to this job)",
    "linkedin": "string (full URL if present)",
    "github": "string (full URL if present)"
  },
  "experience": [
    {
      "jobTitle": "string",
      "company": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty string for current",
      "description": "string (HTML formatted with <ul><li> for bullet points, tailored to job description)"
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM"
    }
  ],
  "skills": [
    {
      "name": "string",
      "level": "Beginner|Intermediate|Advanced|Expert"
    }
  ],
  "languages": [
    {
      "language": "string",
      "proficiency": "Native|Fluent|Proficient|Intermediate|Basic"
    }
  ],
  "achievements": [
    {
      "title": "string",
      "description": "string",
      "date": "YYYY-MM"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "YYYY-MM",
      "expiryDate": "YYYY-MM or empty",
      "credentialId": "string or empty",
      "url": "string or empty"
    }
  ],
  "awards": [
    {
      "title": "string",
      "issuer": "string",
      "date": "YYYY-MM",
      "description": "string"
    }
  ],
  "publications": [
    {
      "title": "string",
      "publisher": "string",
      "date": "YYYY-MM",
      "url": "string or empty",
      "description": "string"
    }
  ],
  "volunteer": [
    {
      "role": "string",
      "organization": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty",
      "currentlyVolunteering": boolean,
      "description": "string"
    }
  ],
  "interests": [
    {
      "name": "string",
      "description": "string (brief explanation)"
    }
  ],
  "references": [
    {
      "name": "string",
      "jobTitle": "string",
      "company": "string",
      "email": "string",
      "phone": "string"
    }
  ],
  "projects": [
    {
      "name": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty string",
      "description": "string (HTML formatted, highlight relevance to job)"
    }
  ]
}

Return ONLY the JSON object, nothing else.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error('AI returned empty response');
    }

    // Clean the response - remove markdown code blocks if present
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    // Parse the JSON
    const parsedData = JSON.parse(cleanedText);

    return parsedData;
  } catch (error) {
    console.error('AI Resume Parsing Error:', error);
    throw new Error('Failed to parse resume with AI: ' + (error as Error).message);
  }
};



/**
 * Analyze resume with AI - Strict ATS Checker
 */
export async function analyzeResumeWithAI(resumeText: string): Promise<any> {
  const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer and career coach. Perform a STRICT and COMPREHENSIVE analysis of the following resume.

Resume Content:
${resumeText}

CRITICAL ANALYSIS REQUIREMENTS:

Perform detailed checks across ALL of the following areas and be STRICT in your evaluation:

1. **FORMAT COMPATIBILITY** (Critical for ATS):
   - Check if content suggests use of tables, columns, or text boxes (ATS often can't parse these)
   - Detect potential headers/footers that ATS may skip
   - Identify if special formatting (graphs, charts, images) is mentioned
   - Check for non-standard characters that may cause parsing errors

2. **SECTION STRUCTURE**:
   - Verify presence of standard sections: Contact Info, Summary/Objective, Experience, Education, Skills
   - Check if section headers use standard names (not creative alternatives)
   - Validate logical order and completeness

3. **CONTACT INFORMATION QUALITY**:
   - Ensure email, phone number are clearly present
   - Check for LinkedIn profile or professional links
   - Verify location/address information

4. **DATE FORMATTING**:
   - Check for consistent date formats across all sections
   - Ensure dates are clearly present for experience and education
   - Flag inconsistent or missing dates

5. **KEYWORDS AND INDUSTRY TERMS**:
   - Identify relevant industry-specific keywords and technical skills
   - Check for action verbs (led, managed, developed, implemented, etc.)
   - Assess keyword density and natural integration
   - Identify commonly expected keywords that are MISSING for the industry

6. **QUANTIFIABLE ACHIEVEMENTS**:
   - Count presence of numbers, percentages, and metrics
   - Assess if accomplishments are measurable
   - Check for impact-driven language

7. **CONTENT QUALITY**:
   - Evaluate clarity and conciseness
   - Check for appropriate length (not too short or too verbose)
   - Assess professional language use
   - Identify any spelling/grammar issues evident in the text

8. **SKILLS SECTION**:
   - Verify presence of both technical and soft skills
   - Check if skills are relevant and current
   - Assess organization and presentation

9. **EXPERIENCE DESCRIPTIONS**:
   - Check if roles have clear, descriptive bullet points
   - Verify presence of responsibilities AND achievements
   - Assess if descriptions are ATS-friendly (no excessive jargon or special characters)

10. **OVERALL ATS READABILITY**:
    - Assess overall parsability by standard ATS systems
    - Check for red flags that would cause ATS rejection
    - Evaluate professional presentation

SCORING CRITERIA (Be strict - most resumes should score 60-80):
- Format Compatibility (15%): Clean, parsable format without tables/columns
- Section Structure (10%): Standard sections with clear headers
- Contact Information (10%): Complete and professional
- Keywords (25%): Industry-specific terms and action verbs
- Quantifiable Achievements (15%): Numbers, metrics, impact
- Content Quality (15%): Clear, professional, error-free
- Skills Section (10%): Relevant, organized, comprehensive

Provide your analysis in this JSON format:
{
  "score": <number between 0-100, be STRICT>,
  "feedback": {
    "strengths": [<array of 4-6 specific strength points with examples>],
    "weaknesses": [<array of 4-6 specific weakness points with examples>],
    "suggestions": [<array of 6-8 actionable improvement suggestions>]
  },
  "keywords": {
    "found": [<array of 8-12 important keywords/skills found>],
    "missing": [<array of 6-10 commonly expected keywords that are missing>]
  },
  "formatting": {
    "score": <number between 0-100>,
    "issues": [<array of specific formatting issues, be detailed>]
  },
  "detailedAnalysis": {
    "contactInfo": {
      "score": <number 0-100>,
      "issues": [<array of issues>]
    },
    "sectionStructure": {
      "score": <number 0-100>,
      "issues": [<array of issues>]
    },
    "achievements": {
      "score": <number 0-100>,
      "quantifiableCount": <number of quantifiable achievements found>,
      "issues": [<array of issues>]
    },
    "atsCompatibility": {
      "score": <number 0-100>,
      "criticalIssues": [<array of ATS-breaking issues>],
      "warnings": [<array of potential issues>]
    }
  }
}

BE STRICT AND THOROUGH. Most resumes have issues. Provide specific, actionable feedback with examples from the resume text when possible.

Return ONLY the JSON object, nothing else.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const responseText = response.text;

  if (!responseText) {
    throw new Error('AI returned empty response');
  }

  // Clean the response - remove markdown code blocks if present
  let cleanedText = responseText.trim();
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
  }

  // Extract JSON from response
  const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  throw new Error('Failed to parse AI response');
}
