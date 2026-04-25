export const defaultCompanyProfile = {
  companyName: "Boardroo Enterprises",
  industry: "Technology Services",
  regions: ["North America"],
  businessModel: "B2B SaaS",
  riskLevel: "medium",
  culture: {
    pace: "fast",
    collaboration: "high",
    hierarchy: "medium",
    innovation: "high",
    customerCentricity: "high"
  },
  policies: {
    complianceStrictness: "high",
    dataPrivacy: "high",
    safetySensitivity: "medium",
    harassmentZeroTolerance: true,
    escalationRequiredForSensitiveIncidents: true
  },
  trainingGoals: [
    "decision-making",
    "leadership",
    "customer handling",
    "cross-functional collaboration",
    "risk awareness"
  ],
  jobFamilies: [
    "Operations",
    "Sales",
    "Support",
    "Engineering",
    "HR",
    "Finance",
    "Retail",
    "Healthcare Admin"
  ]
};

export const roleLibrary = [
  {
    id: "support_lead",
    title: "Support Team Lead",
    department: "Customer Support",
    seniority: "mid",
    competencies: [
      "coaching",
      "customer_resolution",
      "triage",
      "policy_judgment",
      "escalation"
    ]
  },
  {
    id: "retail_manager",
    title: "Retail Store Manager",
    department: "Retail Operations",
    seniority: "mid",
    competencies: [
      "staffing",
      "conflict_resolution",
      "loss_prevention",
      "customer_experience",
      "shift_management"
    ]
  },
  {
    id: "operations_supervisor",
    title: "Operations Supervisor",
    department: "Operations",
    seniority: "mid",
    competencies: [
      "throughput",
      "quality_control",
      "staff_coordination",
      "incident_response",
      "continuous_improvement"
    ]
  },
  {
    id: "hr_partner",
    title: "HR Business Partner",
    department: "Human Resources",
    seniority: "senior",
    competencies: [
      "investigation",
      "policy_application",
      "confidentiality",
      "manager_coaching",
      "employee_relations"
    ]
  },
  {
    id: "sales_manager",
    title: "Sales Manager",
    department: "Sales",
    seniority: "mid",
    competencies: [
      "forecasting",
      "negotiation",
      "pipeline_management",
      "ethical_selling",
      "team_motivation"
    ]
  }
];

export const scoringModel = {
  categories: [
    "businessImpact",
    "peopleLeadership",
    "compliance",
    "ethics",
    "customerImpact",
    "adaptability",
    "communication"
  ],
  weights: {
    businessImpact: 0.18,
    peopleLeadership: 0.18,
    compliance: 0.17,
    ethics: 0.15,
    customerImpact: 0.12,
    adaptability: 0.10,
    communication: 0.10
  }
};

export function normalizeCompanyConfig(input = {}) {
  return {
    ...defaultCompanyProfile,
    ...input,
    culture: {
      ...defaultCompanyProfile.culture,
      ...(input.culture || {})
    },
    policies: {
      ...defaultCompanyProfile.policies,
      ...(input.policies || {})
    },
    trainingGoals: input.trainingGoals?.length
      ? input.trainingGoals
      : defaultCompanyProfile.trainingGoals,
    regions: input.regions?.length ? input.regions : defaultCompanyProfile.regions,
    jobFamilies: input.jobFamilies?.length
      ? input.jobFamilies
      : defaultCompanyProfile.jobFamilies
  };
}