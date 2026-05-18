import React from 'react';

const ManualVadPrompt: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-600">
            <h3 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-pink-500/30 pb-1 flex items-center gap-2">
                <span className="bg-pink-900/30 text-pink-300 px-2 rounded text-xs border border-pink-500/30">MODUL 60</span>
                Arkitektur: Manual VAD & System Prompt
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-pink-500/20 text-slate-300 text-sm space-y-8">
                
                <p className="text-sm text-slate-400 leading-relaxed italic">
                    Vi har övergivit den server-styrda VAD-algoritmen (automaticActivityDetection) i Gemini Live för att tvinga AI:n att översätta i korta klipp (5-6 sekunder) styrt av klientens VAD-brytningar.
                </p>

                {/* 1. KODIMPLEMENTERINGEN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">1. WebSocket Setup (Den Tekniska Brytningen)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-400">
                            I <code>useGeminiSession.ts</code> har vi lagt till en explicit bypass som säger till servern att klienten är Master över tystnads-detekteringen:
                        </p>
                        <div className="bg-black/50 p-2 rounded font-mono text-[10px] text-emerald-400 border border-emerald-500/20 overflow-x-auto">
                            <pre>{`realtimeInputConfig: {
  automaticActivityDetection: {
    disabled: true
  }
}`}</pre>
                        </div>
                        <p className="text-[11px] text-slate-400">
                            <strong>Effekt:</strong> Gemini väntar inte längre på kända naturliga pauser (vilket tog värdefulla sekunder), utan processar omedelbart bufferten när vi manuellt skickar en \`activityEnd\` signal.
                        </p>
                    </div>
                </div>

                {/* 2. THE MANUAL VAD PROMPT */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">2. System Prompt (Manual VAD Protocol)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-4">
                        <p className="text-[11px] text-slate-400">
                            Tidigare prompter försökte reglera konversationsstilar. Den nya generationens prompt (i <code>utils/promptBuilder.ts</code>) är specifikt skriven för att instruera AI:n att förvänta sig 5-6 sekunders kapningar och att vara elastisk kring brutna meningar.
                        </p>

                        <div className="bg-black/30 p-3 rounded border border-white/5 space-y-2">
                            <strong className="text-purple-300 text-[11px] block">Kritiska direktiv i den nya prompten:</strong>
                            <ul className="text-[10px] text-slate-400 list-disc pl-4 space-y-2">
                                <li><strong>MAXIMUM RESPONSIVENESS:</strong> Start speaking your translation as soon as you have enough context to form a coherent phrase. Do not wait for a full paragraph.</li>
                                <li><strong>BE RESILIENT TO FRAGMENTATION:</strong> Because turns are clipped manually by the client's strict 5-6 second timer, a sentence may occasionally be split mid-way. Seamlessly pick up the context in the next turn.</li>
                                <li><strong>DYNAMIC PERSONA INJECTION (DPI):</strong> Implementerar direktstöd för <em>NORMAL</em>, <em>FAST</em> och <em>ROCKET</em> Personas utifrån systemets backlog.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. SYNERGIN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">3. Resultatet (Synergin)</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
                        <p className="text-[11px] text-slate-400">
                            När vi kombinerar <strong>disabled: true</strong> (Teknik) med <strong>Manual VAD-prompten</strong> (Regelverk) förstår servern <em>varför</em> vi kapar ljudet brutalt var femte sekund. Detta eliminerar stamning och start-stopp-tvekan från rösten. Systemet slutar agera konversations-bot och uppträder istället som en professionell kabin-tolk.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ManualVadPrompt;
