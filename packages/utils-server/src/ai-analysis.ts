import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: 'AIzaSyATXJG5bmetauJKiOHKt8hNlYot3DpSZAU' });

export const AIAnalysis = async (
    prompt: string = "Explain Node.js in simple terms"
) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text
    } catch (error) {
        console.log({ error })
    }
};

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

**CRITICAL RULES:**
- Return ONLY valid JSON, no markdown, no explanations
- Use the exact field names specified
- All dates must be in YYYY-MM format
- Ensure descriptions are ATS-friendly (clear, keyword-rich, no special characters)
- Make the resume compelling for THIS specific job
- Keep all factual information accurate, only enhance presentation

**REQUIRED JSON STRUCTURE:**
{
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "jobTitle": "string (use target job title if appropriate)",
    "summary": "string (2-3 compelling sentences tailored to this job)"
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

