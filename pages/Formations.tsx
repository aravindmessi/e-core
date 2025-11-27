import React, { useEffect, useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Formation } from '../types';
import { getFormations } from '../services/mockData';

const Formations: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);

  useEffect(() => {
    getFormations().then(setFormations);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold gamer-font mb-8 text-white">
        <span className="text-cyan-400">META</span> Formations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {formations.map((fmt) => (
          <GlassCard key={fmt.id} className="p-6 border-t-4 border-cyan-500">
            
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold">{fmt.name}</h3>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded border border-cyan-500/30">
                {fmt.playstyle}
              </span>
            </div>

            {/* 🔥 SHOW FIREBASE IMAGE HERE */}
            <img
              src={fmt.imageUrl}
              alt={fmt.name}
              className="w-full h-48 object-contain rounded-lg my-4"
            />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Key Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {fmt.roles.map((role, i) => (
                    <span key={i} className="text-xs bg-slate-800 px-2 py-1 rounded text-white border border-slate-700">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-green-400 uppercase mb-1">Pros</h4>
                  <ul className="text-xs text-slate-300 list-disc list-inside">
                    {fmt.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-red-400 uppercase mb-1">Cons</h4>
                  <ul className="text-xs text-slate-300 list-disc list-inside">
                    {fmt.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              </div>

            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Formations;
