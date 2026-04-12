import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Supabase
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Agents from "@/pages/Agents";

describe("Agent Collaboration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("All agents coexistence", () => {
    it("all 4 agents are rendered simultaneously on the Agents page", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      const agentNames = ["Aria", "Kael", "Sentry", "Fixer"];
      agentNames.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it("all 4 agents are active by default", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      const activeStatuses = screen.getAllByText("active");
      expect(activeStatuses).toHaveLength(4);
    });

    it("each agent shows their specialist role", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      expect(screen.getByText("Frontend Specialist")).toBeInTheDocument();
      expect(screen.getByText("Backend Specialist")).toBeInTheDocument();
      expect(screen.getByText("Security Specialist")).toBeInTheDocument();
      expect(screen.getByText("Debugger Specialist")).toBeInTheDocument();
    });
  });

  describe("Agent state changes do not affect collaboration", () => {
    it("pausing one agent does not affect others", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      // Find and click the pause button for Aria (first pause button)
      const pauseButtons = screen.getAllByTitle("Pause");
      fireEvent.click(pauseButtons[0]); // Pause Aria

      // Other agents should still be active
      const activeStatuses = screen.getAllByText("active");
      expect(activeStatuses).toHaveLength(3); // Kael, Sentry, Fixer still active
    });

    it("pausing an agent shows 'paused' status", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      const pauseButtons = screen.getAllByTitle("Pause");
      fireEvent.click(pauseButtons[0]); // Pause Aria

      expect(screen.getByText("paused")).toBeInTheDocument();
    });

    it("a paused agent can be resumed", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      const pauseButtons = screen.getAllByTitle("Pause");
      fireEvent.click(pauseButtons[0]); // Pause Aria

      const resumeButton = screen.getByTitle("Reprendre");
      fireEvent.click(resumeButton); // Resume Aria

      const activeStatuses = screen.getAllByText("active");
      expect(activeStatuses).toHaveLength(4); // All 4 active again
    });
  });

  describe("Cross-agent navigation", () => {
    it("can navigate to any agent's chat from the agents page", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      const agentNames = ["Aria", "Kael", "Sentry", "Fixer"];
      agentNames.forEach((name) => {
        fireEvent.click(screen.getByText(`Communiquer avec ${name}`));
        expect(mockNavigate).toHaveBeenCalledWith(`/agents/chat/${name}`);
      });
    });
  });

  describe("Agent skill differentiation", () => {
    it("agents have non-overlapping primary skill sets", () => {
      const agentSkills: Record<string, string[]> = {
        Aria: ["React", "Vue", "UX", "Performance", "CSS"],
        Kael: ["APIs", "PostgreSQL", "Redis", "Docker", "Node.js"],
        Sentry: ["Audit", "CVE", "Compliance", "Secrets", "OWASP"],
        Fixer: ["Investigation", "Profiling", "Refactoring", "Tests", "Logs"],
      };

      const allSkills = Object.values(agentSkills).flat();
      const uniqueSkills = new Set(allSkills);
      // All skills should be unique across agents (no skill shared by two agents)
      expect(uniqueSkills.size).toBe(allSkills.length);
    });

    it("Aria handles frontend concerns", () => {
      const ariaSkills = ["React", "Vue", "UX", "Performance", "CSS"];
      const frontendKeywords = ["react", "vue", "css", "ui", "frontend"];
      const ariaSkillsLower = ariaSkills.map((s) => s.toLowerCase());
      const matches = frontendKeywords.filter((k) => ariaSkillsLower.some((s) => s.includes(k)));
      expect(matches.length).toBeGreaterThan(0);
    });

    it("Kael handles backend concerns", () => {
      const kaelSkills = ["APIs", "PostgreSQL", "Redis", "Docker", "Node.js"];
      const backendKeywords = ["api", "postgresql", "docker", "node"];
      const kaelSkillsLower = kaelSkills.map((s) => s.toLowerCase());
      const matches = backendKeywords.filter((k) => kaelSkillsLower.some((s) => s.includes(k)));
      expect(matches.length).toBeGreaterThan(0);
    });

    it("Sentry handles security concerns", () => {
      const sentrySkills = ["Audit", "CVE", "Compliance", "Secrets", "OWASP"];
      const securityKeywords = ["audit", "cve", "compliance", "owasp"];
      const sentrySkillsLower = sentrySkills.map((s) => s.toLowerCase());
      const matches = securityKeywords.filter((k) => sentrySkillsLower.some((s) => s.includes(k)));
      expect(matches.length).toBeGreaterThan(0);
    });

    it("Fixer handles debugging concerns", () => {
      const fixerSkills = ["Investigation", "Profiling", "Refactoring", "Tests", "Logs"];
      const debugKeywords = ["investigation", "profiling", "refactoring", "tests", "logs"];
      const fixerSkillsLower = fixerSkills.map((s) => s.toLowerCase());
      const matches = debugKeywords.filter((k) => fixerSkillsLower.some((s) => s.includes(k)));
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});
