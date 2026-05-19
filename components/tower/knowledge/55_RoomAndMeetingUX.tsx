import React from 'react';

const DashboardGeometryUX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 55</span>
                55. Dashboard-Geometri & Taktil Interaktion
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                {/* 1. ASPECT-SQUARE & ROTATIONSPROBLEMET */}
                <div className="space-y-4">
                    <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-widest border-l-4 border-indigo-500 pl-3">1. Aspect-Square & Rotationsproblemet</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            För att lösa problemet med hur appen beter sig när en användare roterar sin mobil, bygger vi layouten kring strikta geometriska kuber. 
                        </p>
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-indigo-300">CSS aspect-square:</strong> 
                                Båda "Kvadraterna" (De stora interaktionszonerna i Lobbyn) måste använda Tailwind-klassen <code>aspect-square</code>. Detta tvingar dem att förbli perfekta kvadrater.
                            </li>
                            <li>
                                <strong className="text-indigo-300">Flex/Grid Reflow:</strong> 
                                Istället för att appen ska behöva krympa/förvränga UI-elementen, låter vi kvadraterna staplas vertikalt (Portrait) eller sida-vid-sida (Landscape) mjukt via standard Flexbox/Grid-reflow.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. AUDIO PILLRET */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">2. Audio Pillret (Toppen)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            När <code>isLive === true</code> försvinner kvadraterna, och vi introducerar en piller-formad UI komponent högst upp på skärmen.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-pink-300">Visuell Stil:</strong> <code>bg-slate-900/80 backdrop-blur rounded-full</code> centrerat i toppen ovanför översättningstexten.
                            </li>
                            <li>
                                <strong className="text-pink-300">Ikoner utan Text:</strong> Innehåller uteslutande tre knappar/ikoner. 🔇 (Tyst), 📱 (Mot örat), 🎧 (Hörlurar).
                            </li>
                            <li>
                                <strong className="text-pink-300">Glidande Reglage:</strong> Till skillnad från vanliga knappar ligger ett osynligt reglage (en accent-färgad div) BAKOM ikonerna ("absolute"). När användaren byter läge glider denna mjuka markeringsdiv fram och tillbaka i sidled beroende på vilket läge som är aktivt.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. SPECIFIKATION FÖR RUBIKS KUB-MEKANIK */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Specifikation för Rubiks Kub-mekanik</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Kvadraterna i Lobbyn är inte platta overlays, utan flersidiga 3D-kuber (Rubiks kuber) som navigeras genom att rotera dem. All navigation sker inuti den kvadratiska ytan. Inga 2D-overlays är tillåtna.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-emerald-300">Kub-Navigation:</strong> All navigation sker genom att ändra rotationen i 3D (exempelvis <code>rotate-y-90</code>, <code>rotate-y-180</code> etc) inuti en container med <code>aspect-square</code>.
                            </li>
                            <li>
                                <strong className="text-emerald-300">Konstruktion:</strong> Byggs med Tailwind CSS såsom <code>perspective-1000</code> på föräldern, och <code>relative preserve-3d transition-transform duration-500</code> på kub-elementet. Sidorna placeras absolut med <code>backface-hidden</code> och korrekta vinklar (0, 90, 180, 270 grader).
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 4. ORDLÖS IKEA-INSTRUKTION FÖR PRO MODE */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-l-4 border-yellow-500 pl-3">4. Ordlös IKEA-instruktion för Pro Mode</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            På Rums-kubens Sida 4 visas "Pro Mode", som dikterar hårdvaru-routing i systemet. Denna vy är <strong>helt ordlös</strong>, i sann IKEA-anda.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong>Grafiskt Flödesdiagram:</strong> Ett rent diagram med symboler/Lucide-ikoner utan förklarande text. Sekvensen är: <code>[Mikrofon] -&gt; [Extern DSP Box] -&gt; [USB] -&gt; [Dator/App]</code>.
                            </li>
                            <li>
                                <strong>Webbläsarens AEC Avstängd:</strong> Diagrammet visar ett stort rött X (kryss) över webbläsarens inbyggda brusreducerings/filter-ikon för att förklara att appens AEC (Acoustic Echo Cancellation) stängs av i detta läge. 
                            </li>
                            <li>
                                <strong>Checkbox:</strong> Endast formell interaktion är en Checkbox (eller Switch) för Pro Mode.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardGeometryUX;
