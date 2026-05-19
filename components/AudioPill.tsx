import React, { useState } from 'react';
import { VolumeX, Smartphone, Headphones } from 'lucide-react';

export const AudioPill: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(1);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-full h-14 w-64 flex items-center p-2 relative shadow-2xl">
        <div 
          className="absolute left-2 top-2 bottom-2 w-[74px] bg-slate-800 rounded-full transition-transform duration-300 ease-out z-0"
          style={{ transform: `translateX(${activeIdx * 80}px)` }}
        />
        {[VolumeX, Smartphone, Headphones].map((Icon, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`relative z-10 w-[80px] h-full flex items-center justify-center transition-colors ${activeIdx === idx ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
};
