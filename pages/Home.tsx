import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <h1 className="text-5xl md:text-7xl font-black gamer-font tracking-tighter mb-6 relative z-10">
          <span className="text-white drop-shadow-xl">eFOOTBALL</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            CORE
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
          The ultimate hub for <span className="text-cyan-400">meta tactics</span>, upcoming <span className="text-purple-400">epics</span>, and community <span className="text-cyan-400">tournaments</span>.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-md relative group">
          <input
            type="text"
            placeholder="Search players, managers..."
            className="w-full bg-slate-900/60 border border-purple-500/30 rounded-full py-4 px-6 pl-12 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {[
          { title: 'Upcoming Players', desc: 'Leaks & Releases', link: '/upcoming', color: 'border-purple-500', icon: '👤' },
          { title: 'Best Formations', desc: 'Meta Tactics', link: '/formations', color: 'border-cyan-500', icon: '📋' },
          { title: 'Best Managers', desc: 'Tactical Guides', link: '/managers', color: 'border-green-500', icon: '👔' },
          { title: 'Tournaments', desc: 'Join & Compete', link: '/tournaments', color: 'border-pink-500', icon: '🏆' },
        ].map((item, idx) => (
          <Link key={idx} to={item.link} className="block group">
            <GlassCard className="h-full p-6 flex flex-col items-center text-center justify-center min-h-[200px] border-t-4 hover:border-t-4" hoverEffect={true}>
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold gamer-font mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </GlassCard>
          </Link>
        ))}
      </section>

      {/* Trending Section */}
      <section className="bg-slate-900/30 border-y border-white/5 py-12 -mx-4 px-4 md:px-0">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold gamer-font mb-8 flex items-center">
            <span className="w-2 h-8 bg-purple-500 mr-3 rounded-full shadow-[0_0_10px_#a855f7]"></span>
            Trending Now
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-4 flex items-center space-x-4">
              <img src="https://picsum.photos/100/100?random=10" alt="Player" className="w-16 h-16 rounded-full border-2 border-purple-500" />
              <div>
                <p className="text-xs text-purple-400 uppercase font-bold">Top Player</p>
                <h4 className="font-bold text-lg">L. Messi</h4>
                <p className="text-slate-400 text-sm">Big Time • 105 OVR</p>
              </div>
            </GlassCard>

             <GlassCard className="p-4 flex items-center space-x-4">
               <div className="w-16 h-16 bg-slate-800 rounded flex items-center justify-center border border-slate-700">
                  <span className="text-2xl">4-2-1-3</span>
               </div>
              <div>
                <p className="text-xs text-cyan-400 uppercase font-bold">Meta Formation</p>
                <h4 className="font-bold text-lg">Sepahan SC</h4>
                <p className="text-slate-400 text-sm">Quick Counter</p>
              </div>
            </GlassCard>

             <GlassCard className="p-4 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-green-500 flex items-center justify-center text-xl">👔</div>
              <div>
                <p className="text-xs text-green-400 uppercase font-bold">Manager</p>
                <h4 className="font-bold text-lg">G. Zeitzler</h4>
                <p className="text-slate-400 text-sm">High Pressing</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
