import { GoogleGenAI } from "@google/genai";
import { generateAICacheKey, getCachedAnalysis, cacheAnalysis } from './ai-cache.service';


let ai: any


/**
 * Initialize AI client with API key
 * @param apikey - Google GenAI API key
 */
export const initAI = (apikey: string) => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: apikey });
  }
  return ai
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
    // 1. Generate Cache Key
    const cacheKey = generateAICacheKey({
      type: 'parse_resume', // Distinct prefix for this operation
      resumeText,
      jobDescription,
      jobTitle,
      company
    });

    // 2. Check Cache
    const cachedResult = await getCachedAnalysis(cacheKey);
    if (cachedResult) {
      console.log(`🚀 Returning cached AI result for: ${cacheKey}`);
      return cachedResult;
    }

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

11. **CRITICAL RULES:**
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
    "linkedin": "string (full URL if present)",
    "github": "string (full URL if present)"
  },
  "summary": {
    "content": "string (2-3 compelling sentences tailored to this job)"
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

    // 3. Cache the success result
    await cacheAnalysis(cacheKey, parsedData);

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
  // 1. Generate Cache Key
  const cacheKey = generateAICacheKey({
    type: 'analyze_resume',
    resumeText
  });

  // 2. Check Cache
  const cachedResult = await getCachedAnalysis(cacheKey);
  if (cachedResult) {
    console.log(`🚀 Returning cached AI Analysis for: ${cacheKey}`);
    return cachedResult;
  }

  const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer. Perform a STRICT analysis of the resume.

Resume Content:
${resumeText}

ANALYSIS REQUIREMENTS (STRICT):

1. **FORMAT**: Check for tables, columns, text boxes, headers/footers, wild formatting.
2. **STRUCTURE**: Verify standard sections (Contact, Summary, Experience, Education, Skills).
3. **CONTACT INFO**:
   - Email (Critical).
   - Phone (Optional/Non-critical).
   - LinkedIn/GitHub (Optional):
     - **ACCEPT PLAIN TEXT**. If the text "LinkedIn" or "GitHub" or a username appears, mark as FOUND.
     - **DO NOT** demand functional URLs.
     - **DO NOT** flag "missing URL" as a weakness if the platform name/handle is visible.
     - Only penalize if there is absolutely NO mention of these platforms.
4. **DATES**: Consistent formats (YYYY-MM), present in Exp/Edu.
5. **KEYWORDS**:
   - Industry terms/action verbs.
   - **MISSING KEYWORDS**: List missing ones in \`keywords.missing\` ONLY. DO NOT subtract score or list as "Weakness".
6. **QUANTIFICATION**: Metrics/numbers in achievements.
7. **CONTENT**: Clarity, length, grammar.
8. **SKILLS**: Tech/Soft skills relevance.
9. **EXPERIENCE**: Bullet points, responsibilities + achievements.
10. **READABILITY**: ATS parsability.

SCORING (Strict, 60-80 range typical):
- Format (15%), Structure (10%), Contact (10%), Keywords (25%), Quantifiable (15%), Content (15%), Skills (10%).

CRITICAL RULES:
- **FALSE POSITIVES**: Do NOT flag missing phone, plain text LinkedIn/GitHub, or partial URLs as errors/weaknesses. Treat as optimizations.
- **OUTPUT**: JSON ONLY. No markdown.

JSON STRUCTURE:
{
  "score": <0-100>,
  "feedback": {
    "strengths": [<4-6 items>],
    "weaknesses": [<4-6 items, NO missing keywords here>],
    "suggestions": [<6-8 items>]
  },
  "keywords": {
    "found": [<8-12 items>],
    "missing": [<6-10 items>]
  },
  "formatting": { "score": <0-100>, "issues": [<array>] },
  "detailedAnalysis": {
    "contactInfo": { "score": <0-100>, "issues": [<array>] },
    "sectionStructure": { "score": <0-100>, "issues": [<array>] },
    "achievements": { "score": <0-100>, "quantifiableCount": <number>, "issues": [<array>] },
    "atsCompatibility": { "score": <0-100>, "criticalIssues": [<array>], "warnings": [<array>] }
  }
}

ADDITIONAL TASK: RESUME FIXING & NORMALIZATION
1. ANALYZE issues.
2. FIX content professionally.
3. NORMALIZE into "fixedData".

MANDATORY FIX RULES:
- APPLY ALL fixes for weaknesses, suggestions, and formatting issues directly in "fixedData".
- **KEYWORD INJECTION**: Identify top **4-5** missing keywords. Naturally integrate them into Experience/Skills. MAX 5 keywords.
- Normalize dates to YYYY-MM.
- Normalize headers.
- Rewrite bullets for impact.

"fixedData": {
  "personalInfo": { "firstName": "", "lastName": "", "email": "", "phone": "", "city": "", "pincode": "", "country": "", "state": "", "jobTitle": "", "summary": "Optimized summary", "linkedin": "", "github": "" },
  "summary": { "content": "Optimized summary" },
  "experience": [{ "jobTitle": "", "company": "", "startDate": "", "endDate": "", "description": "<ul><li>Optimized bullets</li></ul>" }],
  "education": [{ "degree": "", "institution": "", "startDate": "", "endDate": "" }],
  "skills": [{ "name": "", "level": "Beginner|Intermediate|Advanced|Expert" }],
  "languages": [{ "language": "", "proficiency": "" }],
  "achievements": [{ "title": "", "description": "", "date": "" }],
  "certifications": [{ "name": "", "issuer": "", "date": "", "expiryDate": "", "credentialId": "", "url": "" }],
  "awards": [{ "title": "", "issuer": "", "date": "", "description": "" }],
  "publications": [{ "title": "", "publisher": "", "date": "", "url": "", "description": "" }],
  "volunteer": [{ "role": "", "organization": "", "startDate": "", "endDate": "", "currentlyVolunteering": false, "description": "" }],
  "interests": [{ "name": "", "description": "" }],
  "references": [{ "name": "", "jobTitle": "", "company": "", "email": "", "phone": "" }],
  "projects": [{ "name": "", "startDate": "", "endDate": "", "description": "<ul><li>Description</li></ul>" }]
}

Return ONLY the JSON object (Analysis + fixedData keys).`;

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
    const parsedData = JSON.parse(jsonMatch[0]);
    // 3. Cache Result
    await cacheAnalysis(cacheKey, parsedData);
    return parsedData;
  }

  throw new Error('Failed to parse AI response: No valid JSON found');
}


/**
 * Enhance text (fix grammar or improve clarity) using AI
 * @param text - The text to enhance
 * @param action - The action to perform ('fix_grammar' or 'improve')
 * @returns Enhanced string
 */
export const enhanceTextWithAI = async (
  text: string,
  action: 'fix_grammar' | 'improve'
): Promise<string> => {
  try {
    const prompt = action === 'fix_grammar'
      ? `You are an expert English copy editor. Fix any grammatical, spelling, or punctuation errors in the following text. Do not make major changes to the tone or meaning. Only return the corrected text, without any conversational fluff, markdown formatting, or explanations.\n\nText:\n${text}`
      : `You are an expert resume writer and copyeditor. Improve the following text for a professional resume. Make it sound more impactful, concise, and professional without losing the core meaning. Only return the improved text, without any conversational fluff, markdown formatting, or explanations.\n\nText:\n${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error('AI returned empty response');
    }

    return responseText.trim();
  } catch (error) {
    console.error('Text enhancement error:', error);
    throw new Error('Failed to enhance text with AI');
  }
};
