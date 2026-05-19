
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { useWakeLock } from './hooks/useWakeLock';
import { SubtitleOverlay } from './components/SubtitleOverlay';
import Tower from './components/Tower';
import { Lobby } from './components/Lobby';
import { MainActionBtn } from './components/MainActionBtn';
import { AudioPill } from './components/AudioPill';
import { Settings } from 'lucide-react';
import { AudioGroup } from './types';

const ALL_LANGUAGES = [
  "Afrikaans",
  "Azərbaycan (Azerbajdzjanska)",
  "Bahasa Indonesia",
  "Bahasa Melayu",
  "Basa Jawa (Javanesiska)",
  "Bosanski (Bosniska)",
  "Català (Katalanska)",
  "Čeština (Tjeckiska)",
  "Cymraeg (Walesiska)",
  "Dansk (Danska)",
  "Deutsch (Tyska)",
  "Eesti (Estniska)",
  "English (Engelska)",
  "Español (Spanska)",
  "Esperanto",
  "Euskara (Baskiska)",
  "Filipino (Tagalog)",
  "Français (Franska)",
  "Frysk (Frisiska)",
  "Gaeilge (Irländska)",
  "Gàidhlig (Skotsk gäliska)",
  "Galego (Galiciska)",
  "Hausa",
  "Hrvatski (Kroatiska)",
  "Igbo",
  "Íslenska (Isländska)",
  "Italiano (Italienska)",
  "Kinyarwanda",
  "Kiswahili (Swahili)",
  "Latviešu (Lettiska)",
  "Lietuvių (Litauiska)",
  "Lëtzebuergesch (Luxemburgska)",
  "Magyar (Ungerska)",
  "Malti (Maltesiska)",
  "Māori",
  "Nederlands (Nederländska)",
  "Norsk (Norska)",
  "O‘zbek (Uzbekiska)",
  "Polski (Polska)",
  "Português (Portugisiska)",
  "Română (Rumänska)",
  "Shqip (Albanska)",
  "Slovenčina (Slovakiska)",
  "Slovenščina (Slovenska)",
  "Soomaali (Somaliska)",
  "Suomi (Finska)",
  "Svenska",
  "Tiếng Việt (Vietnamesiska)",
  "Türkçe (Turkiska)",
  "Yorùbá",
  "Zulu",
  "Ελληνικά (Grekiska)",
  "Беларуская (Vitryska)",
  "Български (Bulgariska)",
  "Кыргызча (Kirgiziska)",
  "Македонски (Makedonska)",
  "Монгол (Mongoliska)",
  "Русский (Ryska)",
  "Српски (Serbiska)",
  "Тоҷикӣ (Tadzjikiska)",
  "Українська (Ukrainska)",
  "Қазақ тілі (Kazakiska)",
  "Հայերեն (Armeniska)",
  "עברית (Hebreiska)",
  "ייִדיש (Jiddisch)",
  "اردو (Urdu)",
  "العربية (Arabiska)",
  "فارسی (Persiska)",
  "پښتو (Pashto)",
  "नेपाली (Nepalesiska)",
  "मराठी (Marathi)",
  "हिन्दी (Hindi)",
  "বাংলা (Bengali)",
  "ਪੰਜਾਬੀ (Punjabi)",
  "ગુજરાતી (Gujarati)",
  "தமிழ் (Tamil)",
  "తెలుగు (Telugu)",
  "ಕನ್ನಡ (Kannada)",
  "മലയാളം (Malayalam)",
  "සිංහල (Singalesiska)",
  "ไทย (Thailändska)",
  "ພາສາລາວ (Lao)",
  "ဗမာစာ (Burmesiska)",
  "ខ្មែរ (Khmer)",
  "한국어 (Koreanska)",
  "中文 (Kinesiska)",
  "日本語 (Japanska)",
  "አማርኛ (Amhariska)"
];

const LOCAL_MODE_NAME = "Lokalt i min mobil";

const App: React.FC = () => {
  const { requestLock, releaseLock } = useWakeLock();

  const [isLive, setIsLive] = useState(false);

  const { 
    status, 
    transcripts, 
    error,
    setTargetLanguages,
    targetLanguages,
    queueStats,
    currentPlaybackRate,
    currentLatency,
    activeMode,
    setMode,
    currentRoom,
    setCurrentRoom,
    packetEvents,
    minTurnDuration,
    setMinTurnDuration,
    vadThreshold,
    setVadThreshold,
    silenceThreshold,
    setSilenceThreshold,
    elasticityStart,
    setElasticityStart,
    minSpeechDuration,
    setMinSpeechDuration,
    momentumStart,
    setMomentumStart,
    ghostTolerance,
    setGhostTolerance,
    volMultiplier,
    setVolMultiplier,
    inputDeviceId,
    setInputDeviceId,
    outputDeviceId,
    setOutputDeviceId,
    coldStartSamples,
    setColdStartSamples,
    autoSleepTimeout,
    setAutoSleepTimeout,
    notification,
    effectiveMinDuration,
    debugMode,
    setDebugMode,
    aiSpeakingRate,
    setAiSpeakingRate,
    activePhraseTiming, 
    audioContext,       
    audioDiagnosticsRef,
    triggerTestTone,
    injectTextAsAudio,
    initAudioInput, 
    connect,
    disconnect,
    customSystemInstruction, 
    setCustomSystemInstruction, 
    enableLogs, 
    setEnableLogs,
    simulateNetworkDrop,
    getBufferStatus,
    isJitterEnabled,
    setIsJitterEnabled,
    jitterIntensity,
    setJitterIntensity,
    enableProMode,
    setEnableProMode,
    isTranscriptionEnabled,
    setIsTranscriptionEnabled
  } = useGeminiLive();

  useEffect(() => {
    if (activeMode !== 'off' || isLive) {
        requestLock();
    } else {
        releaseLock();
    }
  }, [activeMode, isLive, requestLock, releaseLock]);

  const [lastActiveGroupId, setLastActiveGroupId] = useState<number | null>(null);

  useEffect(() => {
      if (activePhraseTiming?.groupId !== undefined) {
          setLastActiveGroupId(activePhraseTiming.groupId);
      }
  }, [activePhraseTiming]);

  const effectiveActiveGroupId = activePhraseTiming?.groupId ?? lastActiveGroupId;

  const activeItem = effectiveActiveGroupId !== null 
      ? transcripts.find(t => t.groupId === effectiveActiveGroupId) 
      : null;
  
  const activeGroup: AudioGroup | null = activeItem ? { 
      id: activeItem.id, 
      text: activeItem.text, 
      duration: activePhraseTiming?.duration 
  } : null;

  const history: AudioGroup[] = transcripts
    .filter(t => !activeItem || t.groupId < activeItem.groupId)
    .sort((a, b) => a.groupId - b.groupId) 
    .map(t => ({ id: t.id, text: t.text }));
  
  const queue: AudioGroup[] = transcripts
    .filter(t => activeItem && t.groupId > activeItem.groupId)
    .sort((a, b) => a.groupId - b.groupId)
    .map(t => ({ id: t.id, text: t.text }));

  const handleConnect = async () => {
    setIsLive(true);
    await connect();
  };

  const handleDisconnect = () => {
    setIsLive(false);
    disconnect();
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-slate-950 overflow-hidden text-slate-200 relative">
      
      {/* Top Left Settings Gear */}
      <button 
        onClick={() => setDebugMode(!debugMode)}
        className="fixed top-6 left-6 z-50 p-2 opacity-10 hover:opacity-100 transition-opacity bg-transparent"
      >
        <Settings size={28} className="text-slate-400" />
      </button>

      {/* Main View Area */}
      {!isLive ? (
        <Lobby
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          targetLanguages={targetLanguages}
          setTargetLanguages={setTargetLanguages}
          allLanguages={ALL_LANGUAGES}
          inputDeviceId={inputDeviceId}
          setInputDeviceId={setInputDeviceId}
          outputDeviceId={outputDeviceId}
          setOutputDeviceId={setOutputDeviceId}
          enableProMode={enableProMode}
          setEnableProMode={setEnableProMode}
          onStart={handleConnect}
        />
      ) : (
        <React.Fragment>
          <AudioPill />
          <div className="flex-1 w-full relative z-10 flex flex-col">
            <SubtitleOverlay 
              activeGroup={activeGroup}
              activePhraseTiming={activePhraseTiming}
              history={history}
              queue={queue}
              audioContext={audioContext}
            />
          </div>
        </React.Fragment>
      )}

      {/* Persistent Floating Action Button */}
      <MainActionBtn 
        isLive={isLive} 
        onConnect={handleConnect} 
        onDisconnect={handleDisconnect} 
      />

      {/* Tower Diagnostics / Configuration */}
      {debugMode && (
          <Tower 
              diagnosticsRef={audioDiagnosticsRef} 
              isConnected={status === 'connected'}
              triggerTestTone={triggerTestTone} 
              injectTextAsAudio={injectTextAsAudio}
              initAudioInput={initAudioInput} 
              aiSpeakingRate={aiSpeakingRate}
              setAiSpeakingRate={setAiSpeakingRate}
              minTurnDuration={minTurnDuration}
              setMinTurnDuration={setMinTurnDuration}
              vadThreshold={vadThreshold}
              setVadThreshold={setVadThreshold}
              silenceThreshold={silenceThreshold}
              setSilenceThreshold={setSilenceThreshold}
              elasticityStart={elasticityStart}
              setElasticityStart={setElasticityStart}
              minSpeechDuration={minSpeechDuration}
              setMinSpeechDuration={setMinSpeechDuration}
              volMultiplier={volMultiplier}
              setVolMultiplier={setVolMultiplier}
              inputDeviceId={inputDeviceId}
              setInputDeviceId={setInputDeviceId}
              outputDeviceId={outputDeviceId}
              setOutputDeviceId={setOutputDeviceId}
              coldStartSamples={coldStartSamples}
              setColdStartSamples={setColdStartSamples}
              autoSleepTimeout={autoSleepTimeout}
              setAutoSleepTimeout={setAutoSleepTimeout}
              momentumStart={momentumStart}
              setMomentumStart={setMomentumStart}
              ghostTolerance={ghostTolerance}
              setGhostTolerance={setGhostTolerance}
              debugMode={debugMode}
              setDebugMode={setDebugMode}
              onOpenCalibration={() => {}} 
              connect={connect}
              disconnect={disconnect}
              setCustomSystemInstruction={setCustomSystemInstruction}
              enableLogs={enableLogs}
              setEnableLogs={setEnableLogs}
              onOpenPromptModal={() => {}} 
              simulateNetworkDrop={simulateNetworkDrop}
              getBufferStatus={getBufferStatus}
              isJitterEnabled={isJitterEnabled}
              setIsJitterEnabled={setIsJitterEnabled}
              jitterIntensity={jitterIntensity}
              setJitterIntensity={setJitterIntensity}
              queueStats={queueStats}
              currentPlaybackRate={currentPlaybackRate}
              enableProMode={enableProMode}
              setEnableProMode={setEnableProMode}
          />
      )}

    </div>
  );
};

export default App;
