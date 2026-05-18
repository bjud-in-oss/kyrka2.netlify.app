
import React from 'react';

const FutureOptimizationPlan: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-600">
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-cyan-500/30 pb-1">
                7. Åtgärdsplan & Kritisk Analys
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-cyan-500/20 text-slate-300 text-sm">
                <div className="space-y-8">
                    
                    {/* PLAN C UPDATE */}
                    <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                            <div className="text-red-400 font-bold text-xs border border-red-500/30 px-2 py-0.5 rounded bg-red-900/30">[DEPRECATED] PLAN C</div>
                            <strong className="text-slate-400 line-through text-sm">Prompt-Styrning (Waiting Strategy)</strong>
                        </div>
                        <p className="text-xs text-slate-400 ml-1">
                            <strong>Status: SKROTAD.</strong> Strategin att beordra Gemini via systeminstruktionen att ignorera korta pauser genom att säga fillers som "Hmm..." har övergetts i och med övergången till <strong>The Tape Recorder Protocol</strong> och stenhårda 6-sekunders-chunks. Vi håller inte längre sessionen onödigt öppen via "Puppeteer"-tricks.
                        </p>
                    </div>

                    {/* PLAN D: BYOD SYNC */}
                    <div className="space-y-3 border-t border-slate-800 pt-4">
                        <div className="flex gap-2 items-center">
                            <div className="text-indigo-400 font-bold text-xs border border-indigo-500/30 px-2 py-0.5 rounded bg-indigo-900/30">PLAN D</div>
                            <strong className="text-white text-sm">BYOD Synkronisering (Arena-ekot)</strong>
                        </div>
                        <p className="text-xs text-slate-400 ml-1">
                            <strong>Problem:</strong> Om 50 personer lyssnar i sina mobiler via lokalt Wi-Fi, kommer de ha olika buffertstorlekar (Android vs iOS).
                            Detta skapar ett "Arena-eko" i salen där allas telefoner ligger 50-200ms ur fas.
                        </p>
                        
                        <div className="ml-2 pl-4 border-l border-indigo-500/30 space-y-3">
                            <div className="bg-slate-950 p-3 rounded border border-slate-800">
                                <strong className="text-indigo-300 text-xs block mb-1">Lösning: NTP-stämpel</strong>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Servern (Native App) måste stämpla varje ljudpaket med "Target Play Time" (Server Tid + 500ms).
                                    Alla klienter synkar sin klocka mot servern och spelar upp ljudet exakt samtidigt, oavsett när de laddade ner det. 
                                    Detta tvingar alla enheter att vara i fas, på bekostnad av lite högre latens.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FutureOptimizationPlan;
