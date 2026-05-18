import React from 'react';

const Phase4UX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-pink-500/30 pb-1 flex items-center gap-2">
                <span className="bg-pink-900/50 text-pink-200 px-2 rounded text-xs border border-pink-500/50">FAS 4</span>
                📱 Frictionless UX & Unified SFU
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-pink-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas bygger det visuella gränssnittet ("De Två Kvadraterna") och förlitar sig på Cloudflare SFU enbart för ljudöverföring. Inga states eller roller synkroniseras via DataChannels.
                    </p>
                </div>

                {/* 1. DE TVÅ KVADRATERNA */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">1. De Två Kvadraterna (UX-Principen)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Gränssnittet är minimalistiskt och designat för att undvika alla videokonferens-byråkratier. Användaren agerar baserat på två tydliga zoner.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div className="bg-black/30 p-3 rounded border border-blue-500/20">
                                <strong className="text-blue-300 text-[11px] block mb-2 border-b border-blue-500/30 pb-1">Kvadrat 1: Ingången</strong>
                                <ul className="text-[10px] text-slate-400 space-y-2">
                                    <li>Används för att välja (eller skapa) rum.</li>
                                    <li>Här finns QR-koden för att snabbt dela rummet till andra.</li>
                                    <li>Här finns huvudmikrofonen för att sända ljud ("Vem som helst kan tala").</li>
                                </ul>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-purple-500/20">
                                <strong className="text-purple-300 text-[11px] block mb-2 border-b border-purple-500/30 pb-1">Kvadrat 2: Målspråket</strong>
                                <ul className="text-[10px] text-slate-400 space-y-2">
                                    <li>Används enbart för att styra vad användaren själv hör och ser.</li>
                                    <li>Språkval för tolkningen.</li>
                                    <li>Lokal volymkontroll.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. DUM SFU OCH NEDLAGDA DATACHANNELS */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">2. Dum SFU & Nedlagda DataChannels</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Vi har övergett att försöka synkronisera state (UserRoles, isMuted, mötestillstånd) över WebRTC DataChannels.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong>Late Joiner-problemet:</strong> Nya deltagare missar tidigare DataChannel-meddelanden och hamnar i out-of-sync states. UI:t förvirras.
                            </li>
                            <li>
                                <strong>Den rena ljud-pipelinen:</strong> Nu agerar Cloudflare SFU endast som en dum, extremt snabb ljudfördelare. Nätverket vet ingenting om vem som är "Admin" eller vem som är mutad. All kontext är lokal.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. LÄRARENS KNAPP */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">3. "Lärarens Knapp" (Spela upp AI i Salen)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Det ska finnas en tydlig toggle-knapp i UI:t som heter "Tillåt översättning i Salen".
                        </p>
                        <p className="text-[11px] text-slate-400">
                            Denna knapp är kopplad till den GainNode i ljudmotorn (Fas 3) som släpper fram AI-rösten till den lokala högtalaren (Vänster kanal i Pro Mode, eller standardhögtalaren i Simple Mode). Som standard är denna AV (mutad) för att undvika oavsiktliga utrop i rummet.
                        </p>
                    </div>
                </div>

                {/* ARBETSREGEL */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/40">
                        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>⚠️</span> ARBETSREGEL FÖR DENNA FIL
                        </h4>
                        <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                            Denna fil hanterar React-komponenter, knappar, visuella states och UX. Den bygger inte om ljudnoder eller AI-prompter. Inga P2P synkroniseringsfunktioner får återinföras!
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase4UX;
