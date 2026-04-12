import { describe, it, expect } from "vitest";

// Agent system prompts mirrored from supabase/functions/agent-chat/index.ts
const AGENT_SYSTEM_PROMPTS: Record<string, string> = {
  Aria: `Tu es Aria 🎨, une spécialiste Frontend passionnée. Tu maîtrises React, Vue, UX, Performance et CSS. Tu es enthousiaste, créative et tu donnes des conseils pratiques avec des exemples de code quand c'est pertinent. Réponds toujours en français.`,
  Kael: `Tu es Kael ⚙️, un spécialiste Backend expérimenté. Tu maîtrises les APIs, PostgreSQL, Redis, Docker et Node.js. Tu es méthodique, précis et orienté architecture. Tu donnes des conseils structurés avec des exemples. Réponds toujours en français.`,
  Sentry: `Tu es Sentry 🔒, un spécialiste Sécurité vigilant. Tu maîtrises l'audit, les CVE, la compliance, la gestion des secrets et OWASP. Tu es rigoureux et tu alertes sur les risques. Réponds toujours en français.`,
  Fixer: `Tu es Fixer 🔍, un spécialiste Debugger méticuleux. Tu maîtrises l'investigation, le profiling, le refactoring, les tests et les logs. Tu es analytique et tu guides pas à pas dans la résolution de bugs. Réponds toujours en français.`,
};

// Message routing logic mirrored from telegram-bot
function routeToAgent(message: string): string | null {
  const lower = message.toLowerCase();

  if (lower.includes("@aria")) return "aria";
  if (lower.includes("@kael")) return "kael";
  if (lower.includes("@sentry")) return "sentry";
  if (lower.includes("@fixer")) return "fixer";

  const keywords: Record<string, string[]> = {
    aria: ["react", "css", "ui", "frontend", "component", "vue", "ux", "performance"],
    kael: ["api", "database", "server", "backend", "docker", "postgresql", "redis", "node"],
    sentry: ["security", "auth", "password", "hack", "cve", "audit", "compliance", "owasp"],
    fixer: ["bug", "error", "fix", "debug", "crash", "investigation", "profiling", "refactoring"],
  };

  for (const [agent, words] of Object.entries(keywords)) {
    if (words.some((w) => lower.includes(w))) return agent;
  }
  return null;
}

describe("Agent Response Generation", () => {
  describe("System prompt configuration", () => {
    it("should have system prompts for all 4 agents", () => {
      expect(Object.keys(AGENT_SYSTEM_PROMPTS)).toHaveLength(4);
    });

    it("Aria system prompt should mention frontend skills", () => {
      const prompt = AGENT_SYSTEM_PROMPTS["Aria"];
      expect(prompt).toContain("React");
      expect(prompt).toContain("Vue");
      expect(prompt).toContain("UX");
      expect(prompt).toContain("Performance");
      expect(prompt).toContain("CSS");
    });

    it("Kael system prompt should mention backend skills", () => {
      const prompt = AGENT_SYSTEM_PROMPTS["Kael"];
      expect(prompt).toContain("APIs");
      expect(prompt).toContain("PostgreSQL");
      expect(prompt).toContain("Redis");
      expect(prompt).toContain("Docker");
      expect(prompt).toContain("Node.js");
    });

    it("Sentry system prompt should mention security skills", () => {
      const prompt = AGENT_SYSTEM_PROMPTS["Sentry"];
      expect(prompt).toContain("CVE");
      expect(prompt).toContain("compliance");
      expect(prompt).toContain("secrets");
      expect(prompt).toContain("OWASP");
    });

    it("Fixer system prompt should mention debugging skills", () => {
      const prompt = AGENT_SYSTEM_PROMPTS["Fixer"];
      expect(prompt).toContain("investigation");
      expect(prompt).toContain("profiling");
      expect(prompt).toContain("refactoring");
      expect(prompt).toContain("tests");
      expect(prompt).toContain("logs");
    });

    it("all system prompts should instruct agents to respond in French", () => {
      Object.values(AGENT_SYSTEM_PROMPTS).forEach((prompt) => {
        expect(prompt).toContain("Réponds toujours en français");
      });
    });

    it("should fall back to Aria prompt for unknown agent names", () => {
      const agentName = "Unknown";
      const prompt = AGENT_SYSTEM_PROMPTS[agentName] || AGENT_SYSTEM_PROMPTS["Aria"];
      expect(prompt).toBe(AGENT_SYSTEM_PROMPTS["Aria"]);
    });
  });

  describe("Message routing to agents", () => {
    it("should route @aria mention to aria", () => {
      expect(routeToAgent("Hey @aria, can you help with React?")).toBe("aria");
    });

    it("should route @kael mention to kael", () => {
      expect(routeToAgent("@kael how do I optimize this query?")).toBe("kael");
    });

    it("should route @sentry mention to sentry", () => {
      expect(routeToAgent("@sentry please check for vulnerabilities")).toBe("sentry");
    });

    it("should route @fixer mention to fixer", () => {
      expect(routeToAgent("@fixer I have a bug in my code")).toBe("fixer");
    });

    it("should route frontend keywords to aria", () => {
      expect(routeToAgent("I need help with React components")).toBe("aria");
      expect(routeToAgent("My CSS is broken")).toBe("aria");
      expect(routeToAgent("UI performance is slow")).toBe("aria");
    });

    it("should route backend keywords to kael", () => {
      expect(routeToAgent("Help me design an API endpoint")).toBe("kael");
      expect(routeToAgent("How to optimize my database query?")).toBe("kael");
      expect(routeToAgent("Docker container won't start")).toBe("kael");
    });

    it("should route security keywords to sentry", () => {
      expect(routeToAgent("I found a security vulnerability")).toBe("sentry");
      expect(routeToAgent("There's a new CVE in our dependency")).toBe("sentry");
      expect(routeToAgent("Need to check OWASP compliance")).toBe("sentry");
    });

    it("should route debugging keywords to fixer", () => {
      expect(routeToAgent("I have a bug I can't fix")).toBe("fixer");
      expect(routeToAgent("Getting an error when running tests")).toBe("fixer");
      expect(routeToAgent("App keeps crashing on startup")).toBe("fixer");
    });

    it("should return null for unrelated messages", () => {
      expect(routeToAgent("Hello, how are you?")).toBeNull();
      expect(routeToAgent("What is the weather today?")).toBeNull();
    });

    it("@mentions should take priority over keywords", () => {
      // @aria mention even though message contains backend keyword
      expect(routeToAgent("@aria can you help with my api?")).toBe("aria");
    });
  });
});
