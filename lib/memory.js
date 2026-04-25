export class SimulationMemory {
  constructor() {
    this.state = {
      turns: [],
      variables: {
        trust: 50,
        stress: 35,
        complianceRisk: 20,
        morale: 60,
        customerSatisfaction: 65,
        productivity: 60,
        reputation: 70
      },
      flags: [],
      activeScenarioId: null,
      traineeProfile: null,
      companyProfile: null
    };
  }

  setCompanyProfile(profile) {
    this.state.companyProfile = profile;
  }

  setTraineeProfile(profile) {
    this.state.traineeProfile = profile;
  }

  setScenario(id) {
    this.state.activeScenarioId = id;
  }

  addTurn(turn) {
    this.state.turns.push({
      timestamp: new Date().toISOString(),
      ...turn
    });
  }

  updateVariables(delta = {}) {
    Object.keys(delta).forEach((key) => {
      if (typeof this.state.variables[key] === "number") {
        this.state.variables[key] = Math.max(
          0,
          Math.min(100, this.state.variables[key] + delta[key])
        );
      }
    });
  }

  addFlag(flag) {
    if (!this.state.flags.includes(flag)) {
      this.state.flags.push(flag);
    }
  }

  getSummary() {
    const lastTurns = this.state.turns.slice(-5);
    return {
      activeScenarioId: this.state.activeScenarioId,
      variables: this.state.variables,
      flags: this.state.flags,
      recentTurns: lastTurns,
      traineeProfile: this.state.traineeProfile,
      companyProfile: this.state.companyProfile
    };
  }

  reset() {
    this.state.turns = [];
    this.state.flags = [];
    this.state.activeScenarioId = null;
    this.state.variables = {
      trust: 50,
      stress: 35,
      complianceRisk: 20,
      morale: 60,
      customerSatisfaction: 65,
      productivity: 60,
      reputation: 70
    };
  }
}