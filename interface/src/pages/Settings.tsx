import React from 'react'
import { Settings, Bell, Shield, Database, Code } from 'lucide-react'

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Paramètres</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings size={20} />
            Général
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Modèle par défaut</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
                <option>google/gemini-2.5-flash</option>
                <option>anthropic/claude-sonnet-4-6</option>
                <option>openai/gpt-4o</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Langue</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
                <option>Français</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell size={20} />
            Notifications
          </h2>
          <div className="space-y-3">
            {[
              'Alertes sécurité',
              'Tâches complétées',
              'Nouvelles skills disponibles',
              'Erreurs système',
            ].map((item) => (
              <label key={item} className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield size={20} />
            Sécurité
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Authentification 2FA</span>
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">Activer</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Clés API</span>
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">Gérer</button>
            </div>
          </div>
        </div>

        {/* Advanced */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Code size={20} />
            Avancé
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Auto-génération d'agents</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
                <option>Activée</option>
                <option>Désactivée</option>
                <option>Demander confirmation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Max skills auto-caching</label>
              <input 
                type="number" 
                defaultValue={100}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
