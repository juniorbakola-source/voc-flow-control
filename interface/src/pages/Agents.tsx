import React from 'react'
import { Bot, Play, Pause, Settings, Plus } from 'lucide-react'

const Agents: React.FC = () => {
  const agents = [
    { 
      name: 'Aria', 
      emoji: '🎨',
      role: 'Frontend Specialist', 
      status: 'active',
      skills: ['React', 'Vue', 'UX', 'Performance', 'CSS'],
      heartbeat: '2h',
      tasksCompleted: 156,
      lastAction: 'Optimisation bundle React'
    },
    { 
      name: 'Kael', 
      emoji: '⚙️',
      role: 'Backend Specialist', 
      status: 'active',
      skills: ['APIs', 'PostgreSQL', 'Redis', 'Docker', 'Node.js'],
      heartbeat: '2h',
      tasksCompleted: 203,
      lastAction: 'Déploiement API auth'
    },
    { 
      name: 'Sentry', 
      emoji: '🔒',
      role: 'Security Specialist', 
      status: 'active',
      skills: ['Audit', 'CVE', 'Compliance', 'Secrets', 'OWASP'],
      heartbeat: '24h',
      tasksCompleted: 89,
      lastAction: 'Scan quotidien complété'
    },
    { 
      name: 'Fixer', 
      emoji: '🔍',
      role: 'Debugger Specialist', 
      status: 'active',
      skills: ['Investigation', 'Profiling', 'Refactoring', 'Tests', 'Logs'],
      heartbeat: '1h',
      tasksCompleted: 312,
      lastAction: 'Bug pagination corrigé'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agents</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          Générer un Agent
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  {agent.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{agent.name}</h3>
                  <p className="text-gray-400">{agent.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-400">{agent.status}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-sm text-gray-400">Heartbeat: {agent.heartbeat}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <Pause size={18} />
                </button>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <Settings size={18} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Skills ({agent.skills.length})</p>
              <div className="flex flex-wrap gap-2">
                {agent.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-2xl font-bold">{agent.tasksCompleted}</p>
                <p className="text-sm text-gray-400">Tâches complétées</p>
              </div>
              <div>
                <p className="text-sm text-gray-300 truncate">{agent.lastAction}</p>
                <p className="text-sm text-gray-400">Dernière action</p>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
              Communiquer avec {agent.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Agents
