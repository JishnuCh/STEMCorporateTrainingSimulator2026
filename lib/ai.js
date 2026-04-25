import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || null;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const MODEL_NAME = "gemini-1.5-flash"; // safer + widely supported

function extractJson(text) {
  if (!text) return "{}";

  const cleaned = String(text)
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  return match ? match[0] : cleaned;
}

function safeJsonParse(text, fallback) {
  try {
    return JSON.parse(extractJson(text));
  } catch {
    return fallback;
  }
}

async function askGemini(prompt, fallback) {
  if (!genAI) {
    console.warn("No API key, using fallback");
    return fallback;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return safeJsonParse(text, fallback);
  } catch (err) {
    console.error("Gemini error:", err);
    return fallback;
  }
}

export async function generateScenario({ companyProfile, role }) {
  const fallback = {
    title: "Fallback Scenario",
    scene: "A technical issue appears during a critical deadline.",
    characters: [],
    objectives: [],
    options: []
  };

  const prompt = `
Create a STEM workplace scenario.

Return JSON only:
{
  "title": "string",
  "scene": "string",
  "characters": [],
  "objectives": [],
  "options": []
}
`;

  return askGemini(prompt, fallback);
}