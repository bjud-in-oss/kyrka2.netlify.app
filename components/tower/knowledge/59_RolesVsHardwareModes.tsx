import React from 'react';

const RolesVsHardwareModes: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 59</span>
                59. Lokala Hårdvarulägen (Simple vs Pro)
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                <div className="bg-red-900/20 p-4 rounded border border-red-500/30 mb-6">
                    <strong className="text-red-400 text-xs block mb-2 uppercase tracking-widest">Kritisk Begreppsseparering</strong>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Mjukvaran har ingen inbyggd kännedom om användarroller (som Admin eller Listener). Hårdvaruläget ("vilken maskin du sitter vid") styr helt självständigt hur AudioContext skapas för webbläsaren.
                    </p>
                </div>

                {/* 1. HÅRDVARULÄGEN */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">Hårdvarulägen (Audio Routing Mode)</h4>
                    
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                        Detta styrs av en lokal switch i klientens UI, och sparas i <code>localStorage</code> för den specifika enheten. Det definierar hur ljudet hanteras lokalt på maskinen – specifikt inställningarna för Web Audio API.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                            <strong className="text-blue-400 text-xs block mb-2">Simple Mode (Standard)</strong>
                            <p className="text-[10px] text-slate-400 mb-2">
                                Skickar allt ljud i mono/stereo centrerat, med webbläsarens inbyggda AEC-funktion (mjukvaruekodämpning) aktiverad.
                            </p>
                            <div className="bg-black/30 p-2 rounded border border-white/5 text-[10px] text-slate-500">
                                <strong>Används för:</strong> Mobiler, Mac-datorer och Ljudpuckar för direkta privatsamtal eller små grupprum.
                            </div>
                        </div>
                        
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                            <strong className="text-orange-400 text-xs block mb-2">Pro Mode (Mix-Minus Ready)</strong>
                            <p className="text-[10px] text-slate-400 mb-2">
                                Aktiverar vår "Pro Split" (Vänster = Ren AI-röst, Höger = Rått Mikrofonljud, beroende på konfiguration) och <strong>inaktiverar</strong> webbläsarens inbyggda AEC.
                            </p>
                            <div className="bg-black/30 p-2 rounded border border-white/5 text-[10px] text-slate-500">
                                <strong>Används för:</strong> Endast den specifika PC som är inkopplad i ett professionellt PA-system med egen DSP (t.ex. Tesira/vMix).
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-900/10 p-3 rounded border border-orange-500/20 mt-3">
                        <strong className="text-orange-400 text-[10px] block mb-1">Graceful Fallback:</strong>
                        <p className="text-[10px] text-slate-300">
                            Om en enhet försöker aktivera Pro Mode (som kan sakna stöd för avancerad stereoseparering eller inaktivering av AEC, som t.ex. iOS Safari), övergår systemet på ett säkert sätt tillbaka till Simple Mode. Systemet styrs av maskinens fysiska funktioner – inte din "roll".
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RolesVsHardwareModes;
