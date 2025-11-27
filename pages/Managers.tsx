import React, { useEffect, useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Manager } from '../types';
import { getManagers } from '../services/mockData';

const Managers: React.FC = () => {
  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    getManagers().then(setManagers);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold gamer-font mb-8 text-white">Top Managers</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {managers.map((mgr) => (
          <GlassCard key={mgr.id} className="p-0 flex flex-col md:flex-row overflow-hidden">
             {/* Manager Image Side (Mock) */}
             <div className="md:w-1/3 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10">
                <div className="w-24 h-24 rounded-full bg-slate-700 mb-4 border-2 border-green-500 overflow-hidden">
                  <img src={`https://picsum.photos/200?random=${mgr.id}`} className="w-full h-full object-cover opacity-80" />
                </div>
                <h3 className="text-xl font-bold">{mgr.name}</h3>
                <span className="text-green-400 font-bold text-sm">{mgr.formation}</span>
             </div>

             {/* Tactics Side */}
             <div className="md:w-2/3 p-6 space-y-4">
                <div className="flex justify-between items-center">
                   <h4 className="text-slate-400 text-sm uppercase font-bold">Playstyle</h4>
                   <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full text-sm">{mgr.playstyle}</span>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-lg border border-white/5 space-y-3">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-sm text-slate-400">Offensive</span>
                    <span className="text-sm text-cyan-300">{mgr.tactics.offensive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Defensive</span>
                    <span className="text-sm text-orange-300">{mgr.tactics.defensive}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Recommended Players</h5>
                  <div className="flex flex-wrap gap-2">
                    {mgr.recommendedPlayers.map((rec, i) => (
                      <span key={i} className="text-xs text-white bg-green-900/30 border border-green-500/30 px-2 py-1 rounded">
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Managers;
