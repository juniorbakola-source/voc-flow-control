import React from 'react'
import { 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  TrendingUp,
  Users,
  Code,
  Shield
} from 'lucide-react'

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Agents Actifs', value: '4', icon: Users, color: 'blue' },
    { label: 'Skills Disponibles', value: '30+', icon: Code, color: 'green' },
    { label: 'Tâches Complétées', value: '128', icon: CheckCircle, color: 'purple' },
    { label: 'Alertes Sécurité', value: '2', icon: Shield, color: 'red' },
  ]

  const agents = [
    { name: 'Aria', role: 'Frontend', status: 'online', lastActivity: '2 min', tasks: 3 },
    { name: 'Kael', role: 'Backend', status: 'online', lastActivity: '5 min', tasks: 2 },
    { name: 'Sentry', role: 'Security', status: 'online', lastActivity: '1 h', tasks: 1 },
    { name: 'Fixer', role: 'Debugger', status: 'online', lastActivity: '10 min', tasks: 4 },
  ]

  const alerts = [
    { type: 'error', agent: 'Sentry', message: 'CVE critique détectée dans lodash', time: '5 min' },
    { type: 'warning', agent: 'Fixer', message: 'Tests échouant sur auth.service.ts', time: '15 min' },
    { type: 'info', agent: 'Aria', message: 'Optimisation mobile recommandée', time: '30 min' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 text-green-400">
          <Activity size={20} />
          <span className="text-sm">Système opérationnel</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                  <Icon className={`text-${stat.color}-400`} size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Agents Status */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users size={20} />
            Agents Status
          </h2>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${agent.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-xs text-gray-400">{agent.role}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <p>{agent.tasks} tâches actives</p>
                  <p>Actif il y a {agent.lastActivity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            Actions Requises
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${
                alert.type === 'error' ? 'bg-red-900/20 border-red-700' :
                alert.type === 'warning' ? 'bg-yellow-900/20 border-yellow-700' :
                'bg-blue-900/20 border-blue-700'
              }`}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">[{alert.agent}] {alert.message}</p>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock size={20} />
          Activité Récente
        </h2>
        <div className="space-y-2 text-sm text-gray-400">
          <p>• [ARIA] Optimisation du bundle React terminée (+40% perf)</p>
          <p>• [KAEL] API d'authentification déployée avec succès</p>
          <p>• [SENTRY] Scan de sécurité quotidien complété</p>
          <p>• [FIXER] Bug de pagination corrigé dans users.controller</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
