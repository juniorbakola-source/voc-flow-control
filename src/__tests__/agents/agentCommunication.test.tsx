import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock Supabase client
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

// Mock react-markdown to avoid ESM issues in tests
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) => <span>{children}</span>,
}));

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

import { supabase } from "@/integrations/supabase/client";
import AgentChat from "@/pages/AgentChat";

function renderAgentChat(agentName: string) {
  return render(
    <MemoryRouter initialEntries={[`/agents/chat/${agentName}`]}>
      <Routes>
        <Route path="/agents/chat/:agentName" element={<AgentChat />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Agent Communication - AgentChat component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Agent display", () => {
    it("renders Aria's chat interface correctly", () => {
      renderAgentChat("Aria");
      expect(screen.getByText("Aria")).toBeInTheDocument();
      expect(screen.getByText("Frontend Specialist")).toBeInTheDocument();
    });

    it("renders Kael's chat interface correctly", () => {
      renderAgentChat("Kael");
      expect(screen.getByText("Kael")).toBeInTheDocument();
      expect(screen.getByText("Backend Specialist")).toBeInTheDocument();
    });

    it("renders Sentry's chat interface correctly", () => {
      renderAgentChat("Sentry");
      expect(screen.getByText("Sentry")).toBeInTheDocument();
      expect(screen.getByText("Security Specialist")).toBeInTheDocument();
    });

    it("renders Fixer's chat interface correctly", () => {
      renderAgentChat("Fixer");
      expect(screen.getByText("Fixer")).toBeInTheDocument();
      expect(screen.getByText("Debugger Specialist")).toBeInTheDocument();
    });

    it("falls back to Aria when agent is not found", () => {
      renderAgentChat("NonExistentAgent");
      // Falls back to first agent (Aria)
      expect(screen.getByText("Aria")).toBeInTheDocument();
    });

    it("shows online status indicator", () => {
      renderAgentChat("Aria");
      expect(screen.getByText("en ligne")).toBeInTheDocument();
    });

    it("shows empty state message with agent name on first load", () => {
      renderAgentChat("Aria");
      expect(screen.getByText("Bonjour ! Je suis Aria")).toBeInTheDocument();
    });
  });

  describe("Message input", () => {
    it("renders the message input field", () => {
      renderAgentChat("Aria");
      const input = screen.getByPlaceholderText("Message à Aria...");
      expect(input).toBeInTheDocument();
    });

    it("renders the send button", () => {
      renderAgentChat("Aria");
      const sendBtn = screen.getByRole("button");
      expect(sendBtn).toBeInTheDocument();
    });

    it("send button is disabled when input is empty", () => {
      renderAgentChat("Aria");
      const sendBtn = screen.getByRole("button");
      expect(sendBtn).toBeDisabled();
    });

    it("send button becomes enabled when input has text", () => {
      renderAgentChat("Aria");
      const input = screen.getByPlaceholderText("Message à Aria...");
      fireEvent.change(input, { target: { value: "Hello Aria" } });
      const sendBtn = screen.getByRole("button");
      expect(sendBtn).not.toBeDisabled();
    });
  });

  describe("Sending messages", () => {
    it("displays the user message after sending", async () => {
      vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
        data: { reply: "Bonjour! Je suis Aria." },
        error: null,
      });

      renderAgentChat("Aria");
      const input = screen.getByPlaceholderText("Message à Aria...");
      fireEvent.change(input, { target: { value: "Hello Aria" } });
      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText("Hello Aria")).toBeInTheDocument();
      });
    });

    it("clears the input after sending", async () => {
      vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
        data: { reply: "Response from Aria" },
        error: null,
      });

      renderAgentChat("Aria");
      const input = screen.getByPlaceholderText("Message à Aria...");
      fireEvent.change(input, { target: { value: "Test message" } });
      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(input).toHaveValue("");
      });
    });

    it("invokes supabase function with correct agent name and messages", async () => {
      vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
        data: { reply: "Réponse de Kael" },
        error: null,
      });

      renderAgentChat("Kael");
      const input = screen.getByPlaceholderText("Message à Kael...");
      fireEvent.change(input, { target: { value: "How to setup Docker?" } });
      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(supabase.functions.invoke).toHaveBeenCalledWith("agent-chat", {
          body: {
            messages: [{ role: "user", content: "How to setup Docker?" }],
            agentName: "Kael",
          },
        });
      });
    });

    it("shows agent response after receiving reply", async () => {
      vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
        data: { reply: "Je peux vous aider avec Docker!" },
        error: null,
      });

      renderAgentChat("Kael");
      const input = screen.getByPlaceholderText("Message à Kael...");
      fireEvent.change(input, { target: { value: "Docker help" } });
      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText("Je peux vous aider avec Docker!")).toBeInTheDocument();
      });
    });

    it("shows error message when supabase call fails", async () => {
      vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
        data: null,
        error: new Error("Network error"),
      });

      renderAgentChat("Sentry");
      const input = screen.getByPlaceholderText("Message à Sentry...");
      fireEvent.change(input, { target: { value: "Security check" } });
      fireEvent.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(
          screen.getByText("❌ Erreur de communication. Veuillez réessayer.")
        ).toBeInTheDocument();
      });
    });

    it("shows loading state while waiting for agent response", async () => {
      vi.mocked(supabase.functions.invoke).mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: { reply: "Done" }, error: null }), 100))
      );

      renderAgentChat("Fixer");
      const input = screen.getByPlaceholderText("Message à Fixer...");
      fireEvent.change(input, { target: { value: "Debug this" } });
      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByText("Fixer réfléchit...")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByText("Fixer réfléchit...")).not.toBeInTheDocument();
      });
    });

    it("disables input while loading", async () => {
      vi.mocked(supabase.functions.invoke).mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: { reply: "Done" }, error: null }), 100))
      );

      renderAgentChat("Aria");
      const input = screen.getByPlaceholderText("Message à Aria...");
      fireEvent.change(input, { target: { value: "Test" } });
      fireEvent.click(screen.getByRole("button"));

      expect(input).toBeDisabled();

      await waitFor(() => {
        expect(input).not.toBeDisabled();
      });
    });
  });

  describe("Sending messages via Enter key", () => {
    it("sends message when Enter key is pressed", async () => {
      vi.mocked(supabase.functions.invoke).mockResolvedValueOnce({
        data: { reply: "Response" },
        error: null,
      });

      renderAgentChat("Aria");
      const input = screen.getByPlaceholderText("Message à Aria...");
      fireEvent.change(input, { target: { value: "Hello via Enter" } });
      fireEvent.keyDown(input, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByText("Hello via Enter")).toBeInTheDocument();
      });
    });

    it("does not send when Shift+Enter is pressed", async () => {
      renderAgentChat("Aria");
      const input = screen.getByPlaceholderText("Message à Aria...");
      fireEvent.change(input, { target: { value: "Shift enter" } });
      fireEvent.keyDown(input, { key: "Enter", shiftKey: true });

      expect(supabase.functions.invoke).not.toHaveBeenCalled();
    });
  });
});
