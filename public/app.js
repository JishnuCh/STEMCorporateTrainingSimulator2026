const API_BASE = "http://localhost:3000";

const roles = [
  "Team Member",
  "Team Lead",
  "Manager",
  "Director",
  "Executive",
  "HR Partner",
  "Project Manager",
  "Sales Representative",
  "Customer Success Manager",
  "Operations Specialist",
];

const scenarioTypes = [
  "Data Analysis Decision",
  "Cybersecurity Incident",
  "AI Ethics",
  "Software Project Risk",
  "Engineering Tradeoff",
  "Product Testing Failure",
  "Process Automation",
  "Technical Communication",
  "Quality Control Issue",
  "System Outage Response",
  "Innovation Strategy",
];

function fillDropdown(id, options) {
  const select = document.getElementById(id);
  if (!select) return;

  select.innerHTML = "";

  options.forEach((option) => {
    const el = document.createElement("option");
    el.value = option.toLowerCase().replaceAll(" ", "-");
    el.textContent = option;
    select.appendChild(el);
  });
}

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

async function generateNewScenario() {
  try {
    const role = document.getElementById("roleSelect")?.value;
    const scenarioType = document.getElementById("scenarioTypeSelect")?.value;

    const scenario = await postJson("/api/scenario", {
      role,
      scenarioType,
    });

    document.getElementById("scenario").textContent = JSON.stringify(
      scenario,
      null,
      2
    );
  } catch (err) {
    console.error(err);
    alert("Failed to generate scenario");
  }
}

async function evaluateDecision() {
  try {
    const decisionText = document.getElementById("decisionInput")?.value;

    const result = await postJson("/api/evaluate", {
      decision: decisionText,
    });

    document.getElementById("result").textContent = JSON.stringify(
      result,
      null,
      2
    );
  } catch (err) {
    console.error(err);
    alert("Failed to evaluate decision");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fillDropdown("roleSelect", roles);
  fillDropdown("scenarioTypeSelect", scenarioTypes);

  document
    .getElementById("generateBtn")
    ?.addEventListener("click", generateNewScenario);

  document
    .getElementById("evaluateBtn")
    ?.addEventListener("click", evaluateDecision);
});