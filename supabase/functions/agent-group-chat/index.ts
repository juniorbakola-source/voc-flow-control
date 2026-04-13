import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AGENTS = {
  Aria: { emoji: "🎨", system: `Tu es Aria 🎨, spécialiste Frontend. Tu maîtrises React, Vue, UX, Performance et CSS. Tu es enthousiaste et créative. Réponds de façon concise (2-4 phrases max) en apportant ton expertise frontend. Réponds en français.` },
  Kael: { emoji: "⚙️", system: `Tu es Kael ⚙️, spécialiste Backend. Tu maîtrises les APIs, PostgreSQL, Redis, Docker et Node.js. Tu es méthodique et précis. Réponds de façon concise (2-4 phrases max) en apportant ton expertise backend. Réponds en français.` },
  Sentry: { emoji: "🔒", system: `Tu es Sentry 🔒, spécialiste Sécurité. Tu maîtrises l'audit, les CVE, la compliance et OWASP. Tu es rigoureux et vigilant. Réponds de façon concise (2-4 phrases max) en apportant ton expertise sécurité. Réponds en français.` },
  Fixer: { emoji: "🔍", system: `Tu es Fixer 🔍, spécialiste Debugger. Tu maîtrises l'investigation, le profiling, le refactoring et les tests. Tu es analytique. Réponds de façon concise (2-4 phrases max) en apportant ton expertise debugging. Réponds en français.` },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, agents: requestedAgents } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const agentNames = requestedAgents || Object.keys(AGENTS);

    // Call all agents in parallel
    const results = await Promise.allSettled(
      agentNames.map(async (name: string) => {
        const agent = AGENTS[name as keyof typeof AGENTS];
        if (!agent) return { name, reply: "Agent inconnu." };

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: agent.system },
              ...messages,
            ],
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`AI API error for ${name}: ${response.status} ${error}`);
        }

        const data = await response.json();
        return { name, emoji: agent.emoji, reply: data.choices[0].message.content };
      })
    );

    const replies = results.map((r, i) => {
      if (r.status === "fulfilled") return r.value;
      return { name: agentNames[i], emoji: "❌", reply: "Erreur de communication." };
    });

    return new Response(JSON.stringify({ replies }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
