import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { useWakeLock } from './hooks/useWakeLock';
import { QRCodeSVG } from 'qrcode.react';
import {
  VolumeX,
  Smartphone,
  Headphones,
  Settings,
  Play,
  Square,
  Globe,
  MapPin
} from 'lucide-react';
import Tower from './components/Tower';

const ALL_LANGUAGES = [
  "Afrikaans", "Azərbaycan (Azerbajdzjanska)", "Bahasa Indonesia", "Bahasa Melayu",
  "Basa Jawa (Javanesiska)", "Bosanski (Bosniska)", "Català (Katalanska)", "Čeština (Tjeckiska)",
  "Cymraeg (Walesiska)", "Dansk (Danska)", "Deutsch (Tyska)", "Eesti (Estniska)",
  "English (Engelska)", "Español (Spanska)", "Esperanto", "Euskara (Baskiska)",
  "Filipino (Tagalog)", "Français (Franska)", "Frysk (Frisiska)", "Gaeilge (Irländska)",
  "Gàidhlig (Skotsk gäliska)", "Galego (Galiciska)", "Hausa", "Hrvatski (Kroatiska)",
  "Igbo", "Íslenska (Isländska)", "Italiano (Italienska)", "Kinyarwanda",
  "Kiswahili (Swahili)", "Latviešu (Lettiska)", "Lietuvių (Litauiska)", "Lëtzebuergesch (Luxemburgska)",
  "Magyar (Ungerska)", "Malti (Maltesiska)", "Māori", "Nederlands (Nederländska)",
  "Norsk (Norska)", "O‘zbek (Uzbekiska)", "Polski (Polska)", "Português (Portugisiska)",
  "Română (Rumänska)", "Shqip (Albanska)", "Slovenčina (Slovakiska)", "Slovenščina (Slovenska)",
  "Soomaali (Somaliska)", "Suomi (Finska)", "Svenska", "Tiếng Việt (Vietnamesiska)",
  "Türkçe (Turkiska)", "Yorùbá", "Zulu", "Ελληνικά (Grekiska)",
  "Беларуская (Vitryska)", "Български (Bulgariska)", "Кыргызча (Kirgiziska)", "Македонски (Makedonska)",
  "Монгол (Mongoliska)", "Русский (Ryska)", "Српски (Serbiska)", "Тоҷикӣ (Tadzjikiska)",
  "Українська (Ukrainska)", "Қазақ тілі (Kazakiska)", "Հայերեն (Armeniska)", "עברית (Hebreiska)",
  "ייִדיש (Jiddisch)", "اردو (Urdu)", "العربية (Arabiska)", "فارسی (Persiska)",
  "پښتو (Pashto)", "नेपाली (Nepalesiska)", "मराठी (Marathi)", "हिन्दी (Hindi)",
  "বাংলা (Bengali)", "ਪੰਜਾਬੀ (Punjabi)", "ગુજરાતી (Gujarati)", "தமிழ் (Tamil)",
  "తెలుగు (Telugu)", "ಕನ್ನಡ (Kannada)", "മലയാളം (Malayalam)", "සිංහල (Singalesiska)",
  "ไทย (Thailändska)", "ພາສາລາວ (Lao)", "ဗမာစာ (Burmesiska)", "ខ្មែរ (Khmer)",
  "한국어 (Koreanska)", "中文 (Kinesiska)", "日本語 (Japanska)", "አማርኛ (Amhariska)"
];

const PRESET_ROOMS = ['Kapellet', 'Stora Salen', 'Ungdomsrummet', 'Kafét'];

type AudioMode = 'mute' | 'earpiece' | 'headphones';

const App: React.FC = () => {
  const { requestLock, releaseLock } = useWakeLock();

  const {
    status,
    connect,
    disconnect,
    currentRoom,
    setCurrentRoom,
    targetLanguages,
    setTargetLanguages,
    inputDeviceId,
    setInputDeviceId,
    enableProMode,
    setEnableProMode,
    setVolMultiplier,
    debugMode,
    setDebugMode,
    triggerTestTone,
    injectTextAsAudio,
    initAudioInput,
    audioDiagnosticsRef,
    aiSpeakingRate, setAiSpeakingRate,
    minTurnDuration, setMinTurnDuration,
    vadThreshold, setVadThreshold,
    silenceThreshold, setSilenceThreshold,
    elasticityStart, setElasticityStart,
    minSpeechDuration, setMinSpeechDuration,
    coldStartSamples, setColdStartSamples,
    autoSleepTimeout, setAutoSleepTimeout,
    momentumStart, setMomentumStart,
    ghostTolerance, setGhostTolerance,
    enableLogs, setEnableLogs,
    outputDeviceId, setOutputDeviceId,
    simulateNetworkDrop, getBufferStatus,
    isJitterEnabled, setIsJitterEnabled,
    jitterIntensity, setJitterIntensity,
    setCustomSystemInstruction
  } = useGeminiLive();

  const [audioMode, setAudioMode] = useState<AudioMode>('earpiece');
  const [micOptions, setMicOptions] = useState<MediaDeviceInfo[]>([]);
  const [sq1Flipped, setSq1Flipped] = useState(false);
  const [sq2Flipped, setSq2Flipped] = useState(false);
  const [qrUrl, setQrUrl] = useState('https://app.inv.se');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setQrUrl(window.location.href);
  }, [currentRoom]);

  useEffect(() => {
    if (status === 'connected') {
      requestLock();
    } else {
      releaseLock();
    }
  }, [status, requestLock, releaseLock]);

  useEffect(() => {
    switch (audioMode) {
      case 'mute':
        setVolMultiplier(0);
        break;
      case 'earpiece':
        setVolMultiplier(0.8);
        break;
      case 'headphones':
        setVolMultiplier(1.0);
        break;
    }
  }, [audioMode, setVolMultiplier]);

  useEffect(() => {
    if (sq1Flipped) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        setMicOptions(devices.filter(d => d.kind === 'audioinput'));
      });
    }
  }, [sq1Flipped]);

  const toggleConnection = () => {
    if (status === 'connected' || status === 'connecting') {
      disconnect();
    } else {
      connect();
    }
  };

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-slate-950 text-slate-200 font-sans relative">
      {/* Background blur/gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0 pointer-events-none" />

      {/* TOP HEADER */}
      <div className="fixed top-0 w-full z-20 pt-6 px-6 flex justify-between items-start">
        {/* 3-stegs toggle-knapp */}
        <div className="flex items-center space-x-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          <button
            onClick={() => setAudioMode('mute')}
            className={`p-3 rounded-full transition-all ${
              audioMode === 'mute' ? 'bg-red-500/20 text-red-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <VolumeX size={20} />
          </button>
          <button
            onClick={() => setAudioMode('earpiece')}
            className={`p-3 rounded-full transition-all ${
              audioMode === 'earpiece' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Smartphone size={20} />
          </button>
          <button
            onClick={() => setAudioMode('headphones')}
            className={`p-3 rounded-full transition-all ${
              audioMode === 'headphones' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Headphones size={20} />
          </button>
        </div>

        <button
          onClick={() => setDebugMode(!debugMode)}
          className="p-3 opacity-10 hover:opacity-100 transition-opacity"
        >
          <Settings size={28} className="text-slate-400" />
        </button>
      </div>

      {/* MIDDLE: DE TVÅ KVADRATERNA */}
      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-6 z-10 px-6 mt-16 pb-24">
        
        {/* KVADRAT 1: Plats & Ingång */}
        <div 
          className="w-full max-w-[280px] md:max-w-xs aspect-square relative perspective-1000 group cursor-pointer"
          onClick={() => { if (!sq1Flipped) setSq1Flipped(true); }}
        >
          <div className={`w-full h-full absolute transition-all duration-500 transform-style-3d ${sq1Flipped ? 'rotate-y-180 pointer-events-none' : ''}`}>
            {/* VY 1 */}
            <div className="w-full h-full absolute backface-hidden bg-slate-900/40 backdrop-blur-lg border border-slate-800 rounded-3xl flex flex-col items-center justify-center shadow-2xl p-6">
              <div className="w-full aspect-square bg-white rounded-xl p-3 shadow-inner flex items-center justify-center mb-4">
                <QRCodeSVG value={qrUrl} className="w-full h-full" />
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium tracking-wide">
                <MapPin size={18} className="text-indigo-400" />
                {currentRoom || "Välj Rum"}
              </div>
            </div>

            {/* VY 2 */}
            <div className="w-full h-full absolute backface-hidden rotate-y-180 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl flex flex-col pointer-events-auto p-6 shadow-2xl overflow-y-auto override-scrollbar">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                <h3 className="font-semibold text-indigo-300">Inställningar</h3>
                <button onClick={(e) => { e.stopPropagation(); setSq1Flipped(false); }} className="text-slate-400 hover:text-white p-1">✕</button>
              </div>

              <label className="text-xs text-slate-500 uppercase font-semibold mb-1">Rum</label>
              <select 
                value={currentRoom} 
                onChange={(e) => setCurrentRoom(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-sm rounded-lg p-2.5 mb-4 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                <option value="">Välj...</option>
                {PRESET_ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>

              <label className="text-xs text-slate-500 uppercase font-semibold mb-1">Mikrofon</label>
              <select 
                value={inputDeviceId}
                onChange={(e) => {
                  setInputDeviceId(e.target.value);
                  localStorage.setItem('preferredMic', e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-800 text-sm rounded-lg p-2.5 mb-5 text-white outline-none truncate"
              >
                <option value="default">Systemets standard</option>
                {micOptions.map(m => (
                  <option key={m.deviceId} value={m.deviceId}>{m.label || `Mic ${m.deviceId.slice(0,5)}`}</option>
                ))}
              </select>

              <label className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 cursor-pointer hover:bg-slate-900 transition-colors mt-auto">
                <input 
                  type="checkbox" 
                  checked={enableProMode}
                  onChange={(e) => setEnableProMode(e.target.checked)}
                  className="w-5 h-5 accent-indigo-500 rounded bg-slate-900 border-slate-700" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-200">Pro Mode</span>
                  <span className="text-[10px] text-slate-500">Separera stereo & inaktivera AEC</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* KVADRAT 2: Språk & Start */}
        <div 
          className="w-full max-w-[280px] md:max-w-xs aspect-square relative perspective-1000 group cursor-pointer"
          onClick={() => { if (!sq2Flipped) setSq2Flipped(true); }}
        >
          <div className={`w-full h-full absolute transition-all duration-500 transform-style-3d ${sq2Flipped ? 'rotate-y-180 pointer-events-none' : ''}`}>
            
            {/* VY 1 */}
            <div className={`w-full h-full absolute backface-hidden backdrop-blur-lg border rounded-3xl flex flex-col items-center justify-center shadow-2xl transition-colors duration-500 ${isConnected ? 'bg-indigo-900/20 border-indigo-500/30 ring-4 ring-indigo-500/30' : 'bg-slate-900/40 border-slate-800'}`}>
              <div className="flex-1 flex flex-col items-center justify-center">
                <Globe size={48} className={`mb-6 ${isConnected ? 'text-indigo-400 animate-pulse' : 'text-slate-600'}`} strokeWidth={1} />
                <h2 className="text-3xl font-bold tracking-tight text-white px-4 text-center line-clamp-2 leading-tight">
                  {(targetLanguages[0] || 'Välj Språk').split(' (')[0]}
                </h2>
              </div>
              <div className="h-12 w-full border-t border-slate-800/50 flex items-center justify-center text-xs font-mono tracking-widest text-slate-500 uppercase">
                {isConnected ? 'Lyssnar & Tolkar' : 'Tryck för att ändra'}
              </div>
            </div>

            {/* VY 2 */}
            <div className="w-full h-full absolute backface-hidden rotate-y-180 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl flex flex-col pointer-events-auto p-4 shadow-2xl">
              <div className="flex justify-between items-center mb-3">
                <input 
                  type="text"
                  placeholder="Sök språk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-sm text-white w-full mr-2 outline-none focus:border-indigo-500"
                />
                <button onClick={(e) => { e.stopPropagation(); setSq2Flipped(false); }} className="text-slate-400 hover:text-white p-2">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto override-scrollbar pr-1 space-y-1">
                {ALL_LANGUAGES.filter(l => l.toLowerCase().includes(searchTerm.toLowerCase())).map(lang => (
                  <button
                    key={lang}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTargetLanguages([lang]);
                      setSq2Flipped(false);
                      if (status !== 'connected') connect();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors text-sm font-medium ${targetLanguages[0] === lang ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/30' : 'hover:bg-slate-800 text-slate-300'}`}
                  >
                    {lang.split(' (')[0]} <span className="opacity-50 text-xs ml-1">({lang.split('(')[1]?.replace(')', '') || ''})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM (Fixed): Massive Start/Stop */}
      <div className="fixed bottom-0 w-full z-20 px-4 pb-6 pt-12 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex justify-center pointer-events-none">
        <button
          onClick={toggleConnection}
          disabled={isConnecting}
          className={`pointer-events-auto w-full max-w-2xl h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md border ${
            isConnected 
              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/50'
          } ${isConnecting ? 'opacity-50 cursor-wait animate-pulse' : ''}`}
        >
          {isConnected ? (
            <div className="flex items-center gap-3">
              <Square size={24} fill="currentColor" />
              <span className="text-xl font-bold tracking-widest uppercase">Stäng Av</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {isConnecting ? (
                <span className="text-xl font-bold tracking-widest uppercase">Ansluter...</span>
              ) : (
                <>
                  <Play size={26} fill="currentColor" />
                  <span className="text-xl font-bold tracking-widest uppercase">Starta</span>
                </>
              )}
            </div>
          )}
        </button>
      </div>

      {debugMode && (
        <Tower
          diagnosticsRef={audioDiagnosticsRef}
          isConnected={isConnected}
          triggerTestTone={triggerTestTone}
          injectTextAsAudio={injectTextAsAudio}
          initAudioInput={initAudioInput}
          aiSpeakingRate={aiSpeakingRate} setAiSpeakingRate={setAiSpeakingRate}
          minTurnDuration={minTurnDuration} setMinTurnDuration={setMinTurnDuration}
          vadThreshold={vadThreshold} setVadThreshold={setVadThreshold}
          silenceThreshold={silenceThreshold} setSilenceThreshold={setSilenceThreshold}
          elasticityStart={elasticityStart} setElasticityStart={setElasticityStart}
          minSpeechDuration={minSpeechDuration} setMinSpeechDuration={setMinSpeechDuration}
          volMultiplier={1} setVolMultiplier={setVolMultiplier}
          inputDeviceId={inputDeviceId} setInputDeviceId={setInputDeviceId}
          outputDeviceId={outputDeviceId} setOutputDeviceId={setOutputDeviceId}
          coldStartSamples={coldStartSamples} setColdStartSamples={setColdStartSamples}
          autoSleepTimeout={autoSleepTimeout} setAutoSleepTimeout={setAutoSleepTimeout}
          momentumStart={momentumStart} setMomentumStart={setMomentumStart}
          ghostTolerance={ghostTolerance} setGhostTolerance={setGhostTolerance}
          debugMode={debugMode} setDebugMode={setDebugMode}
          onOpenCalibration={() => {}}
          connect={connect} disconnect={disconnect}
          setCustomSystemInstruction={setCustomSystemInstruction}
          enableLogs={enableLogs} setEnableLogs={setEnableLogs}
          onOpenPromptModal={() => {}}
          simulateNetworkDrop={simulateNetworkDrop}
          getBufferStatus={getBufferStatus}
          isJitterEnabled={isJitterEnabled} setIsJitterEnabled={setIsJitterEnabled}
          jitterIntensity={jitterIntensity} setJitterIntensity={setJitterIntensity}
          queueStats={{ total: 0, pending: 0, processing: 0, completed: 0, failed: 0 }}
          currentPlaybackRate={1.0}
          enableProMode={enableProMode} setEnableProMode={setEnableProMode}
        />
      )}

    </div>
  );
};

export default App;
