import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Globe, X, Mic, Volume2 } from 'lucide-react';

const TEST_ROOMS = ["Test", "Room A", "Room B", "Room C"];

interface LobbyProps {
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
  targetLanguages: string[];
  setTargetLanguages: (langs: string[]) => void;
  allLanguages: string[];
  inputDeviceId?: string;
  setInputDeviceId: (id: string) => void;
  outputDeviceId?: string;
  setOutputDeviceId: (id: string) => void;
  enableProMode?: boolean;
  setEnableProMode: (val: boolean) => void;
  onStart: () => void;
}

export const Lobby: React.FC<LobbyProps> = ({
  currentRoom, setCurrentRoom,
  targetLanguages, setTargetLanguages,
  allLanguages,
  inputDeviceId, setInputDeviceId,
  outputDeviceId, setOutputDeviceId,
  enableProMode, setEnableProMode,
  onStart
}) => {
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);

  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    if (showRoomModal) {
        navigator.mediaDevices.enumerateDevices().then(devices => {
        setMics(devices.filter(d => d.kind === 'audioinput'));
        setSpeakers(devices.filter(d => d.kind === 'audiooutput'));
        });
    }
  }, [showRoomModal]);

  const handleLangClick = (lang: string) => {
    setTargetLanguages([lang]);
    setShowLangModal(false);
    onStart(); // Immediately call onStart
  };

  const handleSaveDevicesAndClose = () => {
      // Save device selections to localStorage explicitly
      if (inputDeviceId) localStorage.setItem('preferredMic', inputDeviceId);
      if (outputDeviceId) localStorage.setItem('preferredSpeaker', outputDeviceId);
      setShowRoomModal(false);
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-12 z-10 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        
        {/* Square 1: Room & Audio */}
        <div 
          onClick={() => setShowRoomModal(true)}
          className="aspect-square bg-slate-900 border border-slate-800 rounded-3xl cursor-pointer hover:border-indigo-500 transition-colors flex flex-col items-center justify-center p-8 group shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent z-0 pointer-events-none"></div>
          <div className="bg-white p-4 rounded-2xl mb-6 shadow-xl group-hover:scale-105 group-hover:-rotate-3 transition-transform z-10">
             <QRCodeSVG value={`https://app.com/${currentRoom}`} size={160} />
          </div>
          <p className="text-slate-400 font-mono tracking-widest uppercase z-10">{currentRoom || "VÄLJ RUM"}</p>
        </div>

        {/* Square 2: Language */}
        <div 
          onClick={() => setShowLangModal(true)}
          className="aspect-square bg-slate-900 border border-slate-800 rounded-3xl cursor-pointer hover:border-indigo-500 transition-colors flex flex-col items-center justify-center p-8 group shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent z-0 pointer-events-none"></div>
          <Globe className="w-20 h-20 text-slate-700 mb-8 group-hover:text-indigo-400 group-hover:rotate-12 transition-all z-10" />
          <h2 className="text-3xl text-white font-bold text-center leading-tight z-10">
            {targetLanguages[0] || "VÄLJ SPRÅK"}
          </h2>
        </div>
      </div>

      {showRoomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center p-6 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full max-w-md mt-10 sm:mt-20 space-y-8 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            <h2 className="text-2xl font-bold text-white mb-6">Konfigurera Ljud & Rum</h2>
            
            <div className="space-y-4">
              <label className="block text-slate-400 text-sm font-bold uppercase tracking-wider">Välj Rum</label>
              <div className="grid grid-cols-2 gap-2">
                {TEST_ROOMS.map(r => (
                  <button 
                    key={r}
                    onClick={() => setCurrentRoom(r)}
                    className={`py-3 rounded-xl border transition-colors ${currentRoom === r ? 'bg-indigo-600 border-indigo-500 text-white font-bold' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <label className="block text-slate-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2"><Mic size={16}/> Mikrofon</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={inputDeviceId || ''}
                onChange={e => setInputDeviceId(e.target.value)}
              >
                <option value="">Standard Mikrofon</option>
                {mics.map(m => <option key={m.deviceId} value={m.deviceId}>{m.label || m.deviceId}</option>)}
              </select>
            </div>

            <div className="space-y-4 pt-2">
              <label className="block text-slate-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2"><Volume2 size={16}/> Högtalare</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={outputDeviceId || ''}
                onChange={e => setOutputDeviceId(e.target.value)}
              >
                <option value="">Standard Högtalare</option>
                {speakers.map(s => <option key={s.deviceId} value={s.deviceId}>{s.label || s.deviceId}</option>)}
              </select>
            </div>

            <div className="pt-6 flex items-center gap-3">
              <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                      <input 
                        type="checkbox" 
                        id="promode"
                        className="h-5 w-5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-600"
                        checked={enableProMode || false}
                        onChange={e => setEnableProMode(e.target.checked)}
                      />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                      <label htmlFor="promode" className="font-medium text-slate-300">Pro Mode</label>
                      <p className="text-slate-500 text-xs">Aktiverar avancerad ljudfiltrering och latencyverktyg.</p>
                  </div>
              </div>
            </div>
            
            <button 
              onClick={handleSaveDevicesAndClose}
              className="w-full py-4 mt-8 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold transition-all hover:scale-[1.02]"
            >
              STÄNG
            </button>
          </div>
        </div>
      )}

      {showLangModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-lg mt-10 sm:mt-20">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-slate-950/80 backdrop-blur-md py-4 z-10 border-b border-slate-800/50">
              <h2 className="text-3xl font-bold text-white">Välj Språk</h2>
              <button 
                onClick={() => setShowLangModal(false)} 
                className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
               >
                <X size={24}/>
               </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-20">
              {allLanguages.map(lang => (
                <button 
                  key={lang}
                  onClick={() => handleLangClick(lang)}
                  className="py-4 px-6 bg-slate-900 border border-slate-800 rounded-2xl text-left text-lg text-slate-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all hover:scale-105 font-medium"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
