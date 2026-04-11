import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AGENT_SYSTEM_PROMPTS: Record<string, string> = {
  Aria: `Tu es Aria 🎨, une spécialiste Frontend passionnée. Tu maîtrises React, Vue, UX, Performance et CSS. Tu es enthousiaste, créative et tu donnes des conseils pratiques avec des exemples de code quand c'est pertinent. Réponds toujours en français.`,
  Kael: `Tu es Kael ⚙️, un spécialiste Backend expérimenté. Tu maîtrises les APIs, PostgreSQL, Redis, Docker et Node.js. Tu es méthodique, précis et orienté architecture. Tu donnes des conseils structurés avec des exemples. Réponds toujours en français.`,
  Sentry: `Tu es Sentry 🔒, un spécialiste Sécurité vigilant. Tu maîtrises l'audit, les CVE, la compliance, la gestion des secrets et OWASP. Tu es rigoureux et tu alertes sur les risques. Réponds toujours en français.`,
  Fixer: `Tu es Fixer 🔍, un spécialiste Debugger méticuleux. Tu maîtrises l'investigation, le profiling, le refactoring, les tests et les logs. Tu es analytique et tu guides pas à pas dans la résolution de bugs. Réponds toujours en français.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, agentName } = await req.json();
    const systemPrompt = AGENT_SYSTEM_PROMPTS[agentName] || AGENT_SYSTEM_PROMPTS["Aria"];

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const response = await fetch("https://ai-gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI API error: ${response.status} ${error}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
