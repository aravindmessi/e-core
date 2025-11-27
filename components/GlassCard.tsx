import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-slate-900/40 backdrop-blur-md 
        border border-white/10 
        rounded-xl 
        shadow-lg
        ${hoverEffect ? 'hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {/* Decorative Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-xl pointer-events-none"></div>
      
      {children}
    </div>
  );
};

export default GlassCard;
