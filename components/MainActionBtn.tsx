import React from 'react';
import { Check, X } from 'lucide-react';

interface MainActionBtnProps {
  isLive: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const MainActionBtn: React.FC<MainActionBtnProps> = ({ isLive, onConnect, onDisconnect }) => {
  return (
    <button
      onClick={isLive ? onDisconnect : onConnect}
      className={`fixed bottom-6 right-6 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 ${isLive ? 'bg-red-600 hover:bg-red-500 hover:scale-105 hover:shadow-red-500/20' : 'bg-green-600 hover:bg-green-500 hover:scale-105 hover:shadow-green-500/20'}`}
    >
      {isLive ? <X size={40} className="text-white" /> : <Check size={40} className="text-white" />}
    </button>
  );
};
