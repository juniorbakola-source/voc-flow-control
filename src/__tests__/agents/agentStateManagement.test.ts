import { describe, it, expect } from "vitest";

type AgentStatus = "active" | "paused";

interface Agent {
  name: string;
  emoji: string;
  role: string;
  status: AgentStatus;
  skills: string[];
  heartbeat: string;
  tasksCompleted: number;
  lastAction: string;
}

const initialAgentsData: Agent[] = [
  {
    name: "Aria",
    emoji: "🎨",
    role: "Frontend Specialist",
    status: "active",
    skills: ["React", "Vue", "UX", "Performance", "CSS"],
    heartbeat: "2h",
    tasksCompleted: 156,
    lastAction: "Optimisation bundle React",
  },
  {
    name: "Kael",
    emoji: "⚙️",
    role: "Backend Specialist",
    status: "active",
    skills: ["APIs", "PostgreSQL", "Redis", "Docker", "Node.js"],
    heartbeat: "2h",
    tasksCompleted: 203,
    lastAction: "Déploiement API auth",
  },
  {
    name: "Sentry",
    emoji: "🔒",
    role: "Security Specialist",
    status: "active",
    skills: ["Audit", "CVE", "Compliance", "Secrets", "OWASP"],
    heartbeat: "24h",
    tasksCompleted: 89,
    lastAction: "Scan quotidien complété",
  },
  {
    name: "Fixer",
    emoji: "🔍",
    role: "Debugger Specialist",
    status: "active",
    skills: ["Investigation", "Profiling", "Refactoring", "Tests", "Logs"],
    heartbeat: "1h",
    tasksCompleted: 312,
    lastAction: "Bug pagination corrigé",
  },
];

// toggleAgent mirrors the implementation in src/pages/Agents.tsx
function toggleAgent(agents: Agent[], name: string): Agent[] {
  return agents.map((a) =>
    a.name === name
      ? { ...a, status: a.status === "active" ? "paused" : "active" }
      : a
  );
}

describe("Agent State Management", () => {
  describe("toggleAgent function", () => {
    it("should pause an active agent", () => {
      const updated = toggleAgent(initialAgentsData, "Aria");
      const aria = updated.find((a) => a.name === "Aria")!;
      expect(aria.status).toBe("paused");
    });

    it("should resume a paused agent", () => {
      const withPausedAria = toggleAgent(initialAgentsData, "Aria");
      const resumed = toggleAgent(withPausedAria, "Aria");
      const aria = resumed.find((a) => a.name === "Aria")!;
      expect(aria.status).toBe("active");
    });

    it("should not affect other agents when toggling one", () => {
      const updated = toggleAgent(initialAgentsData, "Aria");
      ["Kael", "Sentry", "Fixer"].forEach((name) => {
        const agent = updated.find((a) => a.name === name)!;
        expect(agent.status).toBe("active");
      });
    });

    it("should be able to toggle each agent independently", () => {
      let agents = [...initialAgentsData];
      agents = toggleAgent(agents, "Kael");
      agents = toggleAgent(agents, "Sentry");

      expect(agents.find((a) => a.name === "Aria")!.status).toBe("active");
      expect(agents.find((a) => a.name === "Kael")!.status).toBe("paused");
      expect(agents.find((a) => a.name === "Sentry")!.status).toBe("paused");
      expect(agents.find((a) => a.name === "Fixer")!.status).toBe("active");
    });

    it("should not mutate the original agents array", () => {
      const original = [...initialAgentsData];
      toggleAgent(initialAgentsData, "Aria");
      expect(initialAgentsData[0].status).toBe(original[0].status);
    });

    it("should return the same length array after toggle", () => {
      const updated = toggleAgent(initialAgentsData, "Aria");
      expect(updated).toHaveLength(initialAgentsData.length);
    });

    it("should toggle all 4 agents to paused then back to active", () => {
      let agents = [...initialAgentsData];
      const agentNames = ["Aria", "Kael", "Sentry", "Fixer"];

      // Pause all
      agentNames.forEach((name) => {
        agents = toggleAgent(agents, name);
      });
      agents.forEach((agent) => {
        expect(agent.status).toBe("paused");
      });

      // Resume all
      agentNames.forEach((name) => {
        agents = toggleAgent(agents, name);
      });
      agents.forEach((agent) => {
        expect(agent.status).toBe("active");
      });
    });
  });

  describe("Agent status display", () => {
    it("active agents should have a truthy status value", () => {
      initialAgentsData.forEach((agent) => {
        expect(agent.status).toBeTruthy();
      });
    });

    it("status should only be 'active' or 'paused'", () => {
      const validStatuses: AgentStatus[] = ["active", "paused"];
      initialAgentsData.forEach((agent) => {
        expect(validStatuses).toContain(agent.status);
      });
    });
  });
});
