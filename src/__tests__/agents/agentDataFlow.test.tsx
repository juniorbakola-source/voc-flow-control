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

import AgentsChatList from "@/pages/AgentsChatList";
import Agents from "@/pages/Agents";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Agent Data Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("AgentsChatList - chat selection interface", () => {
    it("renders all 4 agents in the chat list", () => {
      render(
        <MemoryRouter>
          <AgentsChatList />
        </MemoryRouter>
      );

      expect(screen.getByText("Aria")).toBeInTheDocument();
      expect(screen.getByText("Kael")).toBeInTheDocument();
      expect(screen.getByText("Sentry")).toBeInTheDocument();
      expect(screen.getByText("Fixer")).toBeInTheDocument();
    });

    it("renders agent roles in the chat list", () => {
      render(
        <MemoryRouter>
          <AgentsChatList />
        </MemoryRouter>
      );

      expect(screen.getByText("Frontend Specialist")).toBeInTheDocument();
      expect(screen.getByText("Backend Specialist")).toBeInTheDocument();
      expect(screen.getByText("Security Specialist")).toBeInTheDocument();
      expect(screen.getByText("Debugger Specialist")).toBeInTheDocument();
    });

    it("navigates to correct chat route when agent is clicked", () => {
      render(
        <MemoryRouter>
          <AgentsChatList />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("Aria"));
      expect(mockNavigate).toHaveBeenCalledWith("/agents/chat/Aria");
    });

    it("navigates to Kael's chat when Kael is clicked", () => {
      render(
        <MemoryRouter>
          <AgentsChatList />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("Kael"));
      expect(mockNavigate).toHaveBeenCalledWith("/agents/chat/Kael");
    });

    it("navigates to Sentry's chat when Sentry is clicked", () => {
      render(
        <MemoryRouter>
          <AgentsChatList />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("Sentry"));
      expect(mockNavigate).toHaveBeenCalledWith("/agents/chat/Sentry");
    });

    it("navigates to Fixer's chat when Fixer is clicked", () => {
      render(
        <MemoryRouter>
          <AgentsChatList />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("Fixer"));
      expect(mockNavigate).toHaveBeenCalledWith("/agents/chat/Fixer");
    });

    it("shows the page title and description", () => {
      render(
        <MemoryRouter>
          <AgentsChatList />
        </MemoryRouter>
      );

      expect(screen.getAllByText("Chat").length).toBeGreaterThan(0);
      expect(
        screen.getByText("Sélectionnez un agent pour démarrer une conversation")
      ).toBeInTheDocument();
    });
  });

  describe("Agents page - agent management interface", () => {
    it("renders all 4 agents on the agents page", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      expect(screen.getByText("Aria")).toBeInTheDocument();
      expect(screen.getByText("Kael")).toBeInTheDocument();
      expect(screen.getByText("Sentry")).toBeInTheDocument();
      expect(screen.getByText("Fixer")).toBeInTheDocument();
    });

    it("shows tasks completed count for each agent", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      expect(screen.getByText("156")).toBeInTheDocument();
      expect(screen.getByText("203")).toBeInTheDocument();
      expect(screen.getByText("89")).toBeInTheDocument();
      expect(screen.getByText("312")).toBeInTheDocument();
    });

    it("shows all agent skills on the agents page", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("APIs")).toBeInTheDocument();
      expect(screen.getByText("OWASP")).toBeInTheDocument();
      expect(screen.getByText("Logs")).toBeInTheDocument();
    });

    it("shows 'communicate' button for each agent", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      expect(screen.getByText("Communiquer avec Aria")).toBeInTheDocument();
      expect(screen.getByText("Communiquer avec Kael")).toBeInTheDocument();
      expect(screen.getByText("Communiquer avec Sentry")).toBeInTheDocument();
      expect(screen.getByText("Communiquer avec Fixer")).toBeInTheDocument();
    });

    it("clicking communicate button navigates to agent chat", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("Communiquer avec Aria"));
      expect(mockNavigate).toHaveBeenCalledWith("/agents/chat/Aria");
    });

    it("shows the page header with title", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      expect(screen.getAllByText("Agents").length).toBeGreaterThan(0);
      expect(
        screen.getByText("Gérez et surveillez vos agents autonomes")
      ).toBeInTheDocument();
    });

    it("shows 4 active agents count in sidebar", () => {
      render(
        <MemoryRouter>
          <Agents />
        </MemoryRouter>
      );

      expect(screen.getByText("4 agents actifs")).toBeInTheDocument();
    });
  });
});
