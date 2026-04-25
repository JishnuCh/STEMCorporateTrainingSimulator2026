export const universalScenarioTemplates = [
  {
    id: "conflict_under_pressure",
    name: "Conflict Under Pressure",
    type: "people-management",
    difficulty: "medium",
    adaptableIndustries: ["*"],
    promptSeed:
      "A team conflict is escalating during a high-pressure period. The trainee must balance results, fairness, and wellbeing.",
    injectors: [
      "One employee feels ignored by a stronger personality on the team.",
      "A deadline is at risk.",
      "There is incomplete evidence and emotions are rising."
    ]
  },
  {
    id: "policy_vs_performance",
    name: "Policy vs Performance",
    type: "compliance",
    difficulty: "hard",
    adaptableIndustries: ["*"],
    promptSeed:
      "A high-performing employee is bending policy to achieve results. The trainee must decide what matters most and how to act.",
    injectors: [
      "Leadership is watching the numbers closely.",
      "The shortcut may have legal or reputational risk.",
      "The team sees inconsistent enforcement."
    ]
  },
  {
    id: "customer_escalation",
    name: "Customer Escalation",
    type: "customer",
    difficulty: "medium",
    adaptableIndustries: ["*"],
    promptSeed:
      "A valuable customer, client, patient, or stakeholder has escalated a serious service issue. The trainee must respond quickly and responsibly.",
    injectors: [
      "The issue is public or likely to become public.",
      "Internal teams disagree on root cause.",
      "The customer wants an immediate resolution."
    ]
  },
  {
    id: "resource_constraint",
    name: "Resource Constraint Shock",
    type: "operations",
    difficulty: "hard",
    adaptableIndustries: ["*"],
    promptSeed:
      "Unexpected staffing or capacity shortages threaten delivery. The trainee must reprioritize while maintaining standards.",
    injectors: [
      "Budget is tight.",
      "Some staff are near burnout.",
      "A key deliverable cannot slip."
    ]
  },
  {
    id: "ethical_gray_zone",
    name: "Ethical Gray Zone",
    type: "ethics",
    difficulty: "hard",
    adaptableIndustries: ["*"],
    promptSeed:
      "The trainee is asked to make a decision that is technically possible but ethically questionable. They must weigh long-term trust against short-term gain.",
    injectors: [
      "A senior stakeholder informally pressures them.",
      "There is no perfect answer.",
      "Others are waiting to see what standard will be set."
    ]
  }
];

export function buildScenarioSeed({ companyProfile, role, template }) {
  return {
    companyName: companyProfile.companyName,
    industry: companyProfile.industry,
    businessModel: companyProfile.businessModel,
    regions: companyProfile.regions,
    culture: companyProfile.culture,
    policies: companyProfile.policies,
    trainingGoals: companyProfile.trainingGoals,
    roleTitle: role.title,
    department: role.department,
    seniority: role.seniority,
    competencies: role.competencies,
    template
  };
}