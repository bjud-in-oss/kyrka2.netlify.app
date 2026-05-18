
import React from 'react';

const CleanBreakDeepDive: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-400">
            <h3 className="text-sky-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-sky-500/30 pb-1 flex items-center gap-2">
                25. Signalering: Explicit Protocol Signaling
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-sky-500/20 text-slate-300 text-sm space-y-6">
                
                <p className="text-sm text-slate-400 leading-relaxed italic">
                    Serverns VAD är avstängd (automaticActivityDetection: disabled). Detta flyttar allt ansvar till klienten för att starta och avsluta turer explict.
                </p>

                {/* THE PROTOCOL */}
                <div className="space-y-4">
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <strong className="text-white text-xs uppercase block mb-3">Sekvensen i Manual VAD</strong>
                        
                        <div className="flex items-center gap-2 text-xs font-mono overflow-x-auto pb-2">
                            {/* STEP 1 */}
                            <div className="flex flex-col items-center min-w-[80px]">
                                <div className="h-8 w-full bg-green-900/30 rounded flex items-center justify-center border border-green-500 text-green-400 mb-1">
                                    START
                                </div>
                                <span className="text-[9px] text-green-500">activityStart</span>
                            </div>

                            <span className="text-slate-600">→</span>

                            {/* STEP 2: PCM STREAM */}
                            <div className="flex flex-col items-center min-w-[100px]">
                                <div className="h-8 w-full bg-sky-900/30 rounded flex items-center justify-center border border-sky-500 text-sky-400 font-bold mb-1">
                                    PCM STREAM
                                </div>
                                <span className="text-[9px] text-sky-400">Rå Ljuddata (+ Pre-buffer)</span>
                            </div>

                            <span className="text-slate-600">→</span>

                            {/* STEP 3: THE SIGNAL */}
                            <div className="flex flex-col items-center min-w-[80px]">
                                <div className="h-8 w-full bg-red-900/30 rounded flex items-center justify-center border border-red-500 text-red-400 font-bold mb-1">
                                    END
                                </div>
                                <span className="text-[9px] text-red-400">activityEnd</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                            <strong className="text-sky-400 text-xs block mb-1">1. Pre-speech Buffer & Start</strong>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                AudioWorklet håller en 300ms rullande minnesbuffert. Vid detektion av tal skickas först <code>activityStart</code>, sedan bufflad data (Pre-speech), sedan streamas direktsänt PCM-ljud.
                            </p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                            <strong className="text-red-400 text-xs block mb-1">2. Explicit EndTurn</strong>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Gamla 800ms-nollskurar ("Silence Bursts") är helt borttagna. Så fort vår lokala tystnadstimer, eller 6-sekundersgränsen nås, skickar vi <code>activityEnd</code>. Servern vet exakt när ljudet tar slut utan "släpande" VAD.
                            </p>
                        </div>
                    </div>
                </div>

                {/* DEV SPECS */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                    <strong className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Technical Implementation Specs</strong>
                    <div className="bg-black/30 p-2 rounded text-[10px] font-mono text-slate-400 space-y-1">
                        <p>• <strong>Config:</strong> <code>automaticActivityDetection: {'{ disabled: true }'}</code> i Gemini-konfigurationen.</p>
                        <p>• <strong>VAD State:</strong> Hanteras till 100% via lokalt gränssnitt som triggar <code>sendEndTurn()</code>.</p>
                        <p>• <strong>Pre-buffer:</strong> 300ms ringbuffer i Worklet minskar första tokens fördröjning utan informationsbortfall.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CleanBreakDeepDive;
