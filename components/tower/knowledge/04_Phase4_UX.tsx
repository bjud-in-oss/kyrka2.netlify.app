import React from 'react';

const Phase1UX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-pink-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-pink-500/30 pb-1 flex items-center gap-2">
                <span className="bg-pink-900/50 text-pink-200 px-2 rounded text-xs border border-pink-500/50">FAS 1</span>
                📱 UX-Minimalism Specifikation
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-pink-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-6">
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                        Denna fas beskriver det absoluta, minimalistiska gränssnittet. Appen styrs av två skärmar med en geometri byggd på "De Två Kvadraterna".
                    </p>
                </div>

                {/* 1. TILLSTÅNDSMASKINEN */}
                <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">Tillståndsmaskinen (Two-Screen Flow)</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300">
                            Appen styrs av ETT enda state: <code className="text-pink-300 bg-pink-900/30 px-1 rounded">isLive (true/false)</code>.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li><strong>Skärm 1 (Lobbyn):</strong> Visas när isLive === false.</li>
                            <li><strong>Skärm 2 (Live):</strong> Visas när isLive === true.</li>
                        </ul>
                    </div>
                </div>

                {/* 2. SKÄRM 1 (LOBBYN) */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">Skärm 1 (Lobbyn) - Geometri & Innehåll</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 font-bold mb-2 border-b border-purple-500/30 pb-1">Layout</p>
                        <ul className="text-[10px] text-slate-400 space-y-2 mb-4">
                            <li>Fyller exakt skärmen (100dvh).</li>
                            <li>Innehåller ENDAST två stora geometriska kvadrater (aspect-square) i mitten, samt en knapp i nedre högra hörnet.</li>
                            <li>Vid rotation (t.ex. på mobilen) ändrar kvadraterna inte form (de förblir kuber), de bara staplas/placeras om av Flexbox/Grid.</li>
                        </ul>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <div className="bg-black/30 p-3 rounded border border-blue-500/20">
                                <strong className="text-blue-300 text-[11px] block mb-2 border-b border-blue-500/30 pb-1">Kvadrat 1: Rum & Ljud (3D Flip)</strong>
                                <ul className="text-[10px] text-slate-400 space-y-2">
                                    <li><strong>Framsida (Front):</strong> Visar en stor vit QR-kod med svart mönster centrerat. Rummets namn står diskret under.</li>
                                    <li><strong>Baksida (Back):</strong> Vid klick vänder kvadraten sig 180 grader i 3D (Card Flip). På baksidan finns menyvalen för att byta rum, mikrofon/högtalare samt slå på "Pro Mode".</li>
                                </ul>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-purple-500/20">
                                <strong className="text-purple-300 text-[11px] block mb-2 border-b border-purple-500/30 pb-1">Kvadrat 2: Språk (3D Flip)</strong>
                                <ul className="text-[10px] text-slate-400 space-y-2">
                                    <li><strong>Framsida (Front):</strong> Visar det valda lyssningsspråket i massiv text (t.ex. "Svenska").</li>
                                    <li><strong>Baksida (Back):</strong> Vid klick vänds kvadraten i 3D och visar en lista med språk.</li>
                                    <li>När ett språk väljs på baksidan vänds kortet tillbaka OCH systemet anropar automatiskt <code>connect()</code> för att starta.</li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-[11px] text-slate-300 font-bold mt-4 mb-2 border-b border-purple-500/30 pb-1">Huvudknappen</p>
                        <ul className="text-[10px] text-slate-400 space-y-2">
                            <li>Fast position i nedre högra hörnet. Massiv och rund.</li>
                            <li>Grön bakgrund med en tydlig vit Bock-ikon (✔️). Inga textetiketter!</li>
                            <li>Klick på denna sätter isLive = true och anropar <code>connect()</code>.</li>
                        </ul>
                    </div>
                </div>

                {/* 3. SKÄRM 2 (LIVE) */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Skärm 2 (Live) - Geometri & Innehåll</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 font-bold mb-2 border-b border-emerald-500/30 pb-1">Layout</p>
                        <p className="text-[10px] text-slate-400">
                            Kvadraterna från Lobbyn är helt borta. Mitten av skärmen är helt dedikerad till rullande översättningstext (&lt;SubtitleOverlay /&gt;).
                        </p>

                        <p className="text-[11px] text-slate-300 font-bold mt-4 mb-2 border-b border-emerald-500/30 pb-1">Toppen (Audio Piller)</p>
                        <ul className="text-[10px] text-slate-400 space-y-2">
                            <li>Ljudet styrs via en flytande piller-formad väljare centrerad i toppen (bg-slate-900/80 backdrop-blur rounded-full).</li>
                            <li>I pillret finns tre ikoner: 🔇 (Tyst), 📱 (Mot örat), 🎧 (Hörlurar).</li>
                            <li>Ett osynligt reglage glider mjukt i sidled bakom ikonerna beroende på vilket läge som är valt. Inga texter, bara ikoner.</li>
                        </ul>

                        <p className="text-[11px] text-slate-300 font-bold mt-4 mb-2 border-b border-emerald-500/30 pb-1">Hörnet (Easter Egg)</p>
                        <p className="text-[10px] text-slate-400">
                            I absolut vänstra hörnet, med 10% opacitet, finns ett kugghjul som öppnar Tower/Inställningar.
                        </p>

                        <p className="text-[11px] text-slate-300 font-bold mt-4 mb-2 border-b border-emerald-500/30 pb-1">Huvudknappen</p>
                        <ul className="text-[10px] text-slate-400 space-y-2">
                            <li>Samma position som i Lobbyn (nedre högra hörnet).</li>
                            <li>Nu är knappen Röd med ett stort kryss (❌).</li>
                            <li>Klick anropar <code>disconnect()</code> och sätter isLive = false.</li>
                        </ul>
                    </div>
                </div>

                {/* ARBETSREGEL */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/40">
                        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>⚠️</span> ARBETSREGEL FÖR DENNA FIL
                        </h4>
                        <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                            Denna fil dikterar appens geometri och övergripande layout. Följ specifikationerna exakt.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Phase1UX;
