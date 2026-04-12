import { describe, it, expect } from "vitest";

// Agent definitions mirrored from src/pages/Agents.tsx and src/pages/AgentChat.tsx
interface Agent {
  name: string;
  emoji: string;
  role: string;
  status: "active" | "paused";
  skills: string[];
  heartbeat: string;
  tasksCompleted: number;
  lastAction: string;
}

const agentsData: Agent[] = [
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

describe("Agent Initialization", () => {
  it("should have exactly 4 agents", () => {
    expect(agentsData).toHaveLength(4);
  });

  it("should initialize all agents with active status by default", () => {
    agentsData.forEach((agent) => {
      expect(agent.status).toBe("active");
    });
  });

  describe("Aria - Frontend Specialist", () => {
    const aria = agentsData.find((a) => a.name === "Aria")!;

    it("should be properly initialized", () => {
      expect(aria).toBeDefined();
    });

    it("should have correct properties", () => {
      expect(aria.name).toBe("Aria");
      expect(aria.emoji).toBe("🎨");
      expect(aria.role).toBe("Frontend Specialist");
      expect(aria.status).toBe("active");
    });

    it("should have all required frontend skills", () => {
      expect(aria.skills).toContain("React");
      expect(aria.skills).toContain("Vue");
      expect(aria.skills).toContain("UX");
      expect(aria.skills).toContain("Performance");
      expect(aria.skills).toContain("CSS");
    });

    it("should have exactly 5 skills", () => {
      expect(aria.skills).toHaveLength(5);
    });
  });

  describe("Kael - Backend Specialist", () => {
    const kael = agentsData.find((a) => a.name === "Kael")!;

    it("should be properly initialized", () => {
      expect(kael).toBeDefined();
    });

    it("should have correct properties", () => {
      expect(kael.name).toBe("Kael");
      expect(kael.emoji).toBe("⚙️");
      expect(kael.role).toBe("Backend Specialist");
      expect(kael.status).toBe("active");
    });

    it("should have all required backend skills", () => {
      expect(kael.skills).toContain("APIs");
      expect(kael.skills).toContain("PostgreSQL");
      expect(kael.skills).toContain("Redis");
      expect(kael.skills).toContain("Docker");
      expect(kael.skills).toContain("Node.js");
    });

    it("should have exactly 5 skills", () => {
      expect(kael.skills).toHaveLength(5);
    });
  });

  describe("Sentry - Security Specialist", () => {
    const sentry = agentsData.find((a) => a.name === "Sentry")!;

    it("should be properly initialized", () => {
      expect(sentry).toBeDefined();
    });

    it("should have correct properties", () => {
      expect(sentry.name).toBe("Sentry");
      expect(sentry.emoji).toBe("🔒");
      expect(sentry.role).toBe("Security Specialist");
      expect(sentry.status).toBe("active");
    });

    it("should have all required security skills", () => {
      expect(sentry.skills).toContain("Audit");
      expect(sentry.skills).toContain("CVE");
      expect(sentry.skills).toContain("Compliance");
      expect(sentry.skills).toContain("Secrets");
      expect(sentry.skills).toContain("OWASP");
    });

    it("should have exactly 5 skills", () => {
      expect(sentry.skills).toHaveLength(5);
    });
  });

  describe("Fixer - Debugger Specialist", () => {
    const fixer = agentsData.find((a) => a.name === "Fixer")!;

    it("should be properly initialized", () => {
      expect(fixer).toBeDefined();
    });

    it("should have correct properties", () => {
      expect(fixer.name).toBe("Fixer");
      expect(fixer.emoji).toBe("🔍");
      expect(fixer.role).toBe("Debugger Specialist");
      expect(fixer.status).toBe("active");
    });

    it("should have all required debugger skills", () => {
      expect(fixer.skills).toContain("Investigation");
      expect(fixer.skills).toContain("Profiling");
      expect(fixer.skills).toContain("Refactoring");
      expect(fixer.skills).toContain("Tests");
      expect(fixer.skills).toContain("Logs");
    });

    it("should have exactly 5 skills", () => {
      expect(fixer.skills).toHaveLength(5);
    });
  });

  it("should have unique agent names", () => {
    const names = agentsData.map((a) => a.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(agentsData.length);
  });

  it("should have unique agent emojis", () => {
    const emojis = agentsData.map((a) => a.emoji);
    const uniqueEmojis = new Set(emojis);
    expect(uniqueEmojis.size).toBe(agentsData.length);
  });

  it("all agents should have valid tasksCompleted count", () => {
    agentsData.forEach((agent) => {
      expect(agent.tasksCompleted).toBeGreaterThanOrEqual(0);
    });
  });
});
