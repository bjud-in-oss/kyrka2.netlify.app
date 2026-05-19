import React from 'react';

const Phase1CoreState: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-emerald-500/30 pb-1 flex items-center gap-2">
                <span className="bg-emerald-900/50 text-emerald-200 px-2 rounded text-xs border border-emerald-500/50">FAS 1</span>
                🧠 Core State & Session Memory
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-xs text-slate-400 mb-2 font-mono">Referensmoduler: 53, 57, 59</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas lägger grunden för appen. Innan ljud eller AI-logik byggs, måste vi ha en stenhård hantering av vem användaren är, vilken hårdvara de sitter vid, och hur länge sessionen får leva.
                    </p>
                </div>

                {/* 1. HÅRDVARUSTYRD ARKITEKTUR & SANERING */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">1. Hårdvarustyrd Arkitektur & Sanering</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Ett primärt mål i denna fas är att helt avveckla och radera den gamla, onödigt komplexa Zustand-storen <code>src/stores/useAppStore.ts</code> samt den föråldrade ljudtjänsten <code>src/services/AudioService.ts</code>.
                        </p>
                        <p className="text-[11px] text-slate-300">
                            Begreppet UserRole (Admin, Teacher, Listener) och URL-parametrar är helt borttagna. Appens tillstånd styrs nu helt decentraliserat av <code>useLiveConfig.ts</code> lokalt på enheten, utan nätverkssynkade användarroller.
                        </p>
                        
                        <div className="bg-black/30 p-3 rounded border border-blue-500/20">
                            <strong className="text-blue-300 text-[11px] block mb-1">HardwareMode (Ljudrouting) & Rums-minne:</strong>
                            <p className="text-[10px] text-slate-400">
                                Ljudinställningarna (Input-enhet, Output-enhet och valt ProMode/SimpleMode) <strong>MÅSTE kommas ihåg</strong> (via localStorage) och <strong>knytas till det specifika Rums-ID:t</strong>. En användare ska aldrig behöva konfigurera mikrofonen på nytt när de startar samma rum igen. All hårdvarukonfiguration ska existera under denna domän.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. RUMS- OCH MÖTESLOGIK */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-widest border-l-4 border-orange-500 pl-3">2. Rums- och Möteslogik</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Storen måste hantera två lager av plats:
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-orange-300">roomId (Fysiskt rum):</strong> T.ex. "Kapellet". Hämtas från URL (<code>/room/kapellet</code>). Styr vilken SFU-kanal vi ansluter till.
                            </li>
                            <li>
                                <strong className="text-orange-300">meetingState (Digital aktivitet):</strong> T.ex. "Gudstjänst" eller "Söndagsskola". Ändras lokalt i realtid av de som publicerar originalljudet.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. OÄNDLIGT MINNE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-widest border-l-4 border-cyan-500 pl-3">3. Oändligt Minne (Sermon Mode)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            För att hantera timlånga möten måste vi förhindra att Googles WebSocket stänger ner pga fullt minne.
                        </p>
                        <div className="bg-black/40 p-3 rounded border border-cyan-500/20">
                            <strong className="text-cyan-300 text-[11px] block mb-1">Krav:</strong>
                            <p className="text-[10px] text-slate-400">
                                I filen <code>useGeminiSession.ts</code> (eller där sessionConfig definieras), måste fältet <code>contextWindowCompression: {'{'} slidingWindow: {'{}'} {'}'}</code> inkluderas i konfigurationen mot Live API:et.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. FRICTIONLESS UX & NÄTVERKSOBEROENDE MUTE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">4. Frictionless UX & Nätverksoberoende Mute</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Molnet är "dumt". Nätverket distribuerar endast ljud, ingen Mute-status eller behörighetslagar synkroniseras.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-pink-300">Lokalt Mute-ansvar:</strong> Deltagaren kontrollerar sin egen enhet helt fristående. Nätverket tvingar aldrig fram ett state, och ingen "Mute All" signal existerar i kodbasen.
                            </li>
                            <li>
                                <strong className="text-pink-300">Frictionless UX:</strong> Alla anslutna kan sända direkt ("De Två Kvadraterna"-principen). Sociala normer (det fysiska mötet) styr vem som pratar, precis som när man lånar ut en fysisk mikrofon.
                            </li>
                        </ul>
                        <div className="bg-black/40 p-3 rounded border border-pink-500/20 mt-2">
                            <strong className="text-red-400 text-[11px] block mb-1">Regel:</strong>
                            <p className="text-[10px] text-slate-400">
                                Lita på användaren och skippa "videokonferens-byråkrati". Fysiska rum (t.ex. kyrksalar) sköter moderering internt. SFU:ns enda jobb är att sända de lokala streamsen så snabbt som möjligt.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ARBETSREGEL */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/40">
                        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>⚠️</span> ARBETSREGEL FÖR DENNA FIL
                        </h4>
                        <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                            Denna fil definierar endast STATE och KONFIGURATION. Ljudhantering (Web Audio API) och Prompt-byggnation hör hemma i senare faser och ska inte beröras här.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase1CoreState;
