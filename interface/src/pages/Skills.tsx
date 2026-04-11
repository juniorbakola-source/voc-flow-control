import React from 'react'
import { Puzzle, Search, Plus, Star, Download } from 'lucide-react'

const Skills: React.FC = () => {
  const categories = [
    { name: 'Core', count: 10, color: 'blue' },
    { name: 'Frontend', count: 8, color: 'green' },
    { name: 'Backend', count: 7, color: 'purple' },
    { name: 'DevOps', count: 5, color: 'orange' },
    { name: 'Security', count: 4, color: 'red' },
  ]

  const skills = [
    { name: 'react-optimization', category: 'Frontend', downloads: 1240, rating: 4.8, author: 'Aria' },
    { name: 'api-design', category: 'Backend', downloads: 980, rating: 4.7, author: 'Kael' },
    { name: 'security-scan', category: 'Security', downloads: 756, rating: 4.9, author: 'Sentry' },
    { name: 'debug-investigation', category: 'Core', downloads: 1432, rating: 4.6, author: 'Fixer' },
    { name: 'docker-containerization', category: 'DevOps', downloads: 892, rating: 4.8, author: 'Kael' },
    { name: 'ci-cd-pipeline', category: 'DevOps', downloads: 654, rating: 4.5, author: 'Kael' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Skills Library</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          Créer une Skill
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
            <p className="text-2xl font-bold">{cat.count}</p>
            <p className="text-gray-400">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher une skill..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Puzzle className="text-blue-400" size={20} />
              </div>
              <span className="px-2 py-1 bg-gray-700 rounded text-xs">{skill.category}</span>
            </div>
            <h3 className="font-semibold mb-1">{skill.name}</h3>
            <p className="text-sm text-gray-400 mb-3">par {skill.author}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" size={14} />
                <span>{skill.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Download size={14} />
                <span>{skill.downloads}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
