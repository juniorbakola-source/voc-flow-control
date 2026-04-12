import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";

interface GenerateAgentDialogProps {
  onGenerate: (agent: { name: string; emoji: string; role: string; skills: string[] }) => void;
}

const EMOJI_OPTIONS = ["🤖", "🧠", "⚡", "🛡️", "📊", "🔧", "💡", "🎯", "📡", "🧪"];

const GenerateAgentDialog = ({ onGenerate }: GenerateAgentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🤖");
  const [role, setRole] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills((prev) => [...prev, s]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = () => {
    if (!name.trim() || !role.trim()) return;
    onGenerate({ name: name.trim(), emoji, role: role.trim(), skills });
    setName("");
    setRole("");
    setSkills([]);
    setSkillInput("");
    setEmoji("🤖");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} />
          Générer un Agent
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Générer un nouvel Agent</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {/* Emoji */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Avatar</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center border transition-colors ${
                    emoji === e ? "border-primary bg-primary/10" : "border-border bg-secondary hover:border-primary/40"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Nom de l'agent</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Nova"
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Rôle / Spécialisation</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex: Data Analyst"
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Skills</label>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Ajouter un skill..."
                className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button onClick={addSkill} className="px-3 py-2 bg-secondary border border-border rounded-md text-sm text-foreground hover:bg-secondary/80 transition-colors">
                <Plus size={14} />
              </button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded text-xs">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-destructive">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || !role.trim()}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Créer l'Agent
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateAgentDialog;
