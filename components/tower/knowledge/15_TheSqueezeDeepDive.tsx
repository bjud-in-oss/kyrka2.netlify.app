
import React from 'react';

const TheSqueezeDeepDive: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-1400">
            <h3 className="text-rose-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-rose-500/30 pb-1 flex items-center gap-2">
                15. The Squeeze: Hantering av 6-sekundersfönstret
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-rose-500/20 text-slate-300 text-sm space-y-6">
                
                <p className="text-sm text-slate-400 leading-relaxed italic">
                    I "Manual VAD" är vi begränsade till korta turn-intervaller för att minimera latens. Vi har en hård gräns via MAX_TURN_DURATION på 6000ms.
                </p>

                {/* LOGIC EXPLANATION */}
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <div className="w-1 bg-green-500 rounded"></div>
                        <div>
                            <strong className="text-white text-xs block">0.0 - 4.0 sek: Normal Tolerans</strong>
                            <p className="text-xs text-slate-400">
                                Systemet använder aktuellt toleransvärde (Tripp/Trull). Vi tillåter andningspauser enligt inställd Hysteresis, upp till inställd Ghost Tolerance.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="w-1 bg-orange-500 rounded"></div>
                        <div>
                            <strong className="text-white text-xs block">4.0 - 5.5 sek: The Squeeze (Pressen)</strong>
                            <p className="text-xs text-slate-400">
                                Vi närmar oss den hårda gränsen. Toleransen sänks linjärt från nuvarande nivå ner till <strong>150ms</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="w-1 bg-red-500 rounded"></div>
                        <div>
                            <strong className="text-white text-xs block">5.5 - 6.0 sek: Andrum (Kill Zone)</strong>
                            <p className="text-xs text-slate-400">
                                Vi ligger fastlåsta på 150ms. Minsta lilla millisekund av tystnad över detta kommer att skicka en explicit `activityEnd`. Vid exakt 6.0 sekunder tvingas en Hard Flush oavsett.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TheSqueezeDeepDive;
