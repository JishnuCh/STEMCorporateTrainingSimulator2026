import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || null;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const MODEL_NAME = "gemini-1.5-flash";

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

/* ---------------- SCENARIO ---------------- */

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

/* ---------------- EVALUATION ---------------- */

export async function evaluateDecision({
  scenario,
  decision
}) {
  const fallback = {
    businessImpact: 70,
    peopleLeadership: 70,
    compliance: 70,
    ethics: 70,
    customerImpact: 70,
    adaptability: 70,
    communication: 70,
    feedback: "Solid decision with room for improvement.",
    nextComplication: "A stakeholder challenges your choice."
  };

  const prompt = `
Evaluate this decision in a workplace scenario.

Scenario:
${JSON.stringify(scenario, null, 2)}

Decision:
${JSON.stringify(decision, null, 2)}

Return JSON only:
{
  "businessImpact": number,
  "peopleLeadership": number,
  "compliance": number,
  "ethics": number,
  "customerImpact": number,
  "adaptability": number,
  "communication": number,
  "feedback": "string",
  "nextComplication": "string"
}
`;

  return askGemini(prompt, fallback);
}