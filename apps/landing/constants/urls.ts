import { ENV } from "@/app/env";

export const URLS = {
    EDITOR_DASHBOARD: ENV.EDITOR_URL,
    EDITOR: ENV.EDITOR_URL + "/editor",
    EDITOR_TAILOR: ENV.EDITOR_URL + "/tailor",
    EDITOR_COVER_LETTER: ENV.EDITOR_URL + "/cover-letter",
    EDITOR_ATS_CHECKER: ENV.EDITOR_URL + "/ats-check",
    AI_INTERVIEW_GUIDE: ENV.EDITOR_URL + "/ai-interview-guide",
    AI_INTERVIEW: ENV.INTERVIEW_URL
}