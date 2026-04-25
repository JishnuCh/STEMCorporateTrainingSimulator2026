// Always point to your Express server
const API_BASE = "http://localhost:3000";
import { something } from "./memory.js";
import { something } from "./scenarioTemplates.js";
import { something } from "./schema.js";
import { something } from "./scoring.js";
// Helper for POST requests
async function postJson(url, data) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data || {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} - ${text}`);
  }

  return res.json();
}

// Generate scenario
async function generateNewScenario() {
  try {
    const scenario = await postJson("/api/scenario", {});

    console.log("Scenario:", scenario);

    // Example: update UI
    const el = document.getElementById("scenario");
    if (el) {
      el.textContent = JSON.stringify(scenario, null, 2);
    }

  } catch (err) {
    console.error(err);
    alert("Failed to generate scenario");
  }
}

// Evaluate decision
async function evaluateDecision(decisionData) {
  try {
    const result = await postJson("/api/evaluate", decisionData);

    console.log("Evaluation:", result);

    const el = document.getElementById("result");
    if (el) {
      el.textContent = JSON.stringify(result, null, 2);
    }

  } catch (err) {
    console.error(err);
    alert("Failed to evaluate decision");
  }
}

// Hook up button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  if (btn) {
    btn.addEventListener("click", generateNewScenario);
  }
});