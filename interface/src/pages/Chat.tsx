import React, { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'

const Chat: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState('Aria')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { from: 'agent', text: 'Bonjour ! Je suis Aria, spécialiste frontend. Comment puis-je vous aider aujourd\'hui ?', time: '10:00' },
    { from: 'user', text: 'Peux-tu m\'aider à optimiser mon application React ?', time: '10:05' },
    { from: 'agent', text: 'Bien sûr ! Je vais analyser votre codebase. Pour commencer, pouvez-vous me dire :\n\n1. Quelle est la taille actuelle de votre bundle ?\n2. Utilisez-vous le code splitting ?\n3. Avez-vous des problèmes de performance spécifiques ?', time: '10:06' },
  ])

  const agents = [
    { name: 'Aria', emoji: '🎨', role: 'Frontend', status: 'online' },
    { name: 'Kael', emoji: '⚙️', role: 'Backend', status: 'online' },
    { name: 'Sentry', emoji: '🔒', role: 'Security', status: 'online' },
    { name: 'Fixer', emoji: '🔍', role: 'Debugger', status: 'online' },
  ]

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([...messages, { from: 'user', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setMessage('')
    // Simulation de réponse
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        from: 'agent', 
        text: `Je traite votre demande. Laissez-moi analyser cela pour vous...`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }])
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Sidebar Agents */}
      <div className="w-64 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="font-semibold">Agents</h2>
        </div>
        <div className="p-2">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => setSelectedAgent(agent.name)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                selectedAgent === agent.name ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl">{agent.emoji}</span>
              <div className="text-left">
                <p className="font-medium">{agent.name}</p>
                <p className="text-xs text-gray-400">{agent.role}</p>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center gap-3">
          <span className="text-2xl">
            {agents.find(a => a.name === selectedAgent)?.emoji}
          </span>
          <div>
            <h2 className="font-semibold">{selectedAgent}</h2>
            <p className="text-xs text-gray-400">
              {agents.find(a => a.name === selectedAgent)?.role} Specialist
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-2xl ${
                msg.from === 'user' 
                  ? 'bg-blue-600 rounded-br-none' 
                  : 'bg-gray-700 rounded-bl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Message à ${selectedAgent}...`}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
