import { scoringModel } from "./schema.js";

export function scoreDecision({ decisionText, analysis }) {
  const baseScores = {
    businessImpact: analysis?.businessImpact ?? 60,
    peopleLeadership: analysis?.peopleLeadership ?? 60,
    compliance: analysis?.compliance ?? 60,
    ethics: analysis?.ethics ?? 60,
    customerImpact: analysis?.customerImpact ?? 60,
    adaptability: analysis?.adaptability ?? 60,
    communication: analysis?.communication ?? 60
  };

  const weightedScore = Object.entries(scoringModel.weights).reduce(
    (sum, [key, weight]) => sum + baseScores[key] * weight,
    0
  );

  const strengths = [];
  const gaps = [];

  Object.entries(baseScores).forEach(([key, value]) => {
    if (value >= 75) strengths.push(key);
    if (value <= 55) gaps.push(key);
  });

  return {
    overall: Math.round(weightedScore),
    categoryScores: baseScores,
    strengths,
    gaps,
    feedback:
      analysis?.feedback ||
      "Your decision balanced some priorities well, but there is room to improve how you align people, performance, and policy."
  };
}

export function calculateStateImpact(score) {
  return {
    trust: score.categoryScores.peopleLeadership > 70 ? 8 : -3,
    morale: score.categoryScores.peopleLeadership > 70 ? 6 : -4,
    complianceRisk: score.categoryScores.compliance > 70 ? -8 : 7,
    customerSatisfaction: score.categoryScores.customerImpact > 70 ? 7 : -5,
    productivity: score.categoryScores.businessImpact > 70 ? 5 : -2,
    reputation: score.categoryScores.ethics > 70 ? 6 : -6,
    stress: score.categoryScores.adaptability > 70 ? -4 : 5
  };
}

export function labelPerformance(score) {
  if (score.overall >= 85) return "Boardroom Ready";
  if (score.overall >= 70) return "Strong";
  if (score.overall >= 55) return "Developing";
  return "At Risk";
}