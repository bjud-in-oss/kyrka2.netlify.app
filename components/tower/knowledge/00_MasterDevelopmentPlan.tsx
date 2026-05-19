import React from 'react';

const MasterDevelopmentPlan: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-emerald-500/30 pb-1 flex items-center gap-2">
                <span className="bg-emerald-900/50 text-emerald-200 px-2 rounded text-xs border border-emerald-500/50">MODUL 00</span>
                🏗️ Master Development Plan
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Detta dokument definierar arbetsordningen för att bygga AI-översättningsmotorn. För att garantera <strong>"Context Isolation"</strong> och förhindra att kod skrivs över av misstag, är implementationen uppdelad i 4 isolerade filer.
                    </p>
                </div>

                {/* ARBETSMETODIK */}
                <div className="space-y-4">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">Arbetsmetodik: Agil Dokumentationsdriven Utveckling</h4>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Vår <strong>"Context Priming"</strong>-process är hjärtat i vår utveckling. Genom att etablera sanningen i dokumentationen först, eliminerar vi gissningar vid nästa kodgenerering:
                        </p>
                        <ol className="text-[11px] text-slate-400 list-decimal pl-4 space-y-2">
                            <li><strong>Identifiera problem.</strong></li>
                            <li><strong>Skalpellsignal:</strong> Uppdatera Tower-dokumentationen först för att skapa en entydig plan.</li>
                            <li><strong>Lås kontexten:</strong> Stäng chatten/sessionen för att återställa AI:ns "minne".</li>
                            <li><strong>Skriv koden:</strong> Starta en ny session. AI:n tvingas nu läsa och följa den nyligen uppdaterade lagboken exakt, utan "spöken" från gamla resonemang.</li>
                            <li>
                                <strong>Chain of Thought (CoT):</strong> Använd alltid CoT vid komplexa nätverksändringar. 
                                <br/><em className="text-yellow-300/80 mt-1 block">Syftet med CoT är att strukturera resonemanget och få AI:n att steg-för-steg tänka igenom konsekvenserna av varje ändring innan koden skrivs. Genom att dela upp processen i flera successiva prompter undviker vi att AI:n hastar fram en ogenomtänkt lösning och vi behåller en knivskarp röd tråd genom enorma mängder kontext. När uppgiften bär på hundratals rader logik stannar AI:n kvar "på spåret" genom att explicit tvingas redovisa sin tankekedja inför varje handling.</em>
                            </li>
                        </ol>
                    </div>
                </div>

                {/* FASERNA */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">Den Agila Utförandeplanen (Fas 1-4)</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-[10px] font-mono border border-blue-500/30 whitespace-nowrap">Fas 1: UX-Minimalism</span>
                            </div>
                            <div className="text-[11px] text-slate-400 leading-relaxed mt-2 space-y-2">
                                <p>(Se Modul 01 och Modul 04 för detaljer). UI-arkitekturen byggs upp av följande komponenter:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><strong>App.tsx:</strong> Agerar enbart State Machine (isLive). Renderar antingen Lobby eller LiveView (med SubtitleOverlay).</li>
                                    <li><strong>components/Lobby.tsx:</strong> Ny fil. Renderar "De Två Kvadraterna". Interaktionen för att välja Rum och Språk ska hanteras som Fullskärms-overlays inuti denna fil.</li>
                                    <li><strong>components/MainActionBtn.tsx:</strong> Ny fil. Den fasta, massiva interaktionsknappen i hörnet (Grön ✔️ för Connect, Röd ❌ för Disconnect).</li>
                                    <li><strong>components/AudioPill.tsx:</strong> Ny fil. Ersätter den gamla ControlBaren. Placeras i toppen under Live-läget.</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                <span className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-[10px] font-mono border border-purple-500/30 whitespace-nowrap">Fas 2: Prompt & AI Logic</span>
                            </div>
                            <span className="text-[11px] text-slate-400 leading-relaxed block">(Se Modul 02 och Modul 51). Uppdatering av promptBuilder.ts med DPI och Simultaneous Interpreter-logik.</span>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                <span className="bg-orange-900/30 text-orange-300 px-2 py-1 rounded text-[10px] font-mono border border-orange-500/30 whitespace-nowrap">Fas 3: Ljudmotorn</span>
                            </div>
                            <span className="text-[11px] text-slate-400 leading-relaxed block">(Se Modul 03, Modul 11 och Modul 14 för exakta tids-värden). Rulla in 300ms ringbuffer, 6s max-limit, The Squeeze och byt ut Silence Bursts mot explicit activityEnd.</span>
                        </div>
                        
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                <span className="bg-pink-900/30 text-pink-300 px-2 py-1 rounded text-[10px] font-mono border border-pink-500/30 whitespace-nowrap">Fas 4: Unified SFU</span>
                            </div>
                            <span className="text-[11px] text-slate-400 leading-relaxed block">(Se Modul 52). Gör SFU:n till en dum radiomast och skrota P2P-state.</span>
                        </div>
                    </div>
                </div>

                {/* SANERING */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest border-l-4 border-red-500 pl-3">Kritisk Kod-Sanering (Död Kod)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Följande föråldrade filer betraktas som skräp och <strong>SKA RADERAS</strong> eller helt ignoreras under återuppbyggnaden:
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2 font-mono">
                            <li className="text-red-300/80">src/stores/useAppStore.ts <span className="text-slate-500 italic">(Ersätts av lokalt state i Two-Screen arkitekturen)</span></li>
                            <li className="text-red-300/80">src/services/AudioService.ts <span className="text-slate-500 italic">(Död kod, ersätts av enklare hooks)</span></li>
                            <li className="text-red-300/80">hooks/useTabCoordination.ts <span className="text-slate-500 italic">(Behövs inte längre)</span></li>
                            <li className="text-red-300/80">components/HeaderControls.tsx <span className="text-slate-500 italic">(Helt obsolet)</span></li>
                            <li className="text-red-300/80">components/ControlBar.tsx <span className="text-slate-500 italic">(Ersätts av AudioPill)</span></li>
                            <li className="text-red-300/80">components/SettingsModal.tsx, components/StatsModal.tsx, components/OnboardingModal.tsx <span className="text-slate-500 italic">(Borttagna pga minimalism)</span></li>
                            <li className="text-red-300/80">components/RoomSelectorModal.tsx, components/LanguageSelectorModal.tsx <span className="text-slate-500 italic">(Ska slås ihop/byggas om som Overlays inuti Lobby.tsx)</span></li>
                        </ul>
                    </div>
                </div>

                {/* DEN GYLLENE REGELN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/40">
                        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>⚠️</span> DEN GYLLENE REGLERN FÖR AI-ASSISTENTEN
                        </h4>
                        <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                            När en användare ber dig implementera eller skriva kod för en specifik Fas, får du ENDAST läsa kraven i den motsvarande Fas-filen (t.ex. <code>01_Phase1...</code>). Du får under inga omständigheter modifiera logik som tillhör andra faser, och du får inte föregå händelserna. Arbeta strikt sekventiellt.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MasterDevelopmentPlan;
