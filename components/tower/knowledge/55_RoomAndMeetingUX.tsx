import React from 'react';

const DashboardGeometryUX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 55</span>
                Dashboard-Geometri & Tvåskärms-interaktion
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

                {/* 3. SPECIFIKATION FÖR 3D CARD FLIP */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Specifikation för 3D Card Flip</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Kvadraterna i Lobbyn är inte platta overlays, utan 3D-kort som snurrar 180 grader. Detta ska byggas med ren Tailwind CSS utan externa animationsbibliotek (t.ex. Framer Motion) för att bevara prestanda.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-emerald-300">Yttre Container:</strong> Måste tilldela 3D-djup genom z-axelns perspektiv, t.ex. <code>perspective-1000</code>.
                            </li>
                            <li>
                                <strong className="text-emerald-300">Inre Card Container:</strong> Styr rotationen och kräver klasserna <code>relative preserve-3d transition-transform duration-500</code>. När användaren klickar roteras div:en smidigt med <code>rotate-y-180</code>.
                            </li>
                            <li>
                                <strong className="text-emerald-300">Front & Back (Ytor):</strong> Båda sidorna positioneras med <code>absolute inset-0 backface-hidden</code>. Baksidan har utöver det klassen <code>rotate-y-180</code> från början, så att den är dold tills den inre containern roterar.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardGeometryUX;
