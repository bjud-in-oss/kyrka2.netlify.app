
import React from 'react';

const VadHysteresisAnalysis: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-1000">
            <h3 className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3 border-b border-orange-500/30 pb-1 flex items-center gap-2">
                11. Hydraulisk VAD: Tripp Trapp Trull
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-orange-500/20 text-slate-300 text-sm space-y-8">
                
                {/* 1. STATUS UPDATE */}
                <div>
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                        <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded text-xs">IMPLEMENTERAD (v9.0)</span>
                        Aktiv Logik i <code>useAudioInput</code>
                    </h4>
                    <p className="text-sm text-slate-400 mb-2">
                        Denna logik är trimmad för vårt extremt snabba, 6-sekunders "Manual VAD"-fönster. Systemet beräknar dynamiskt <code>ACTIVE_SIL</code> (Paus-tolerans) baserat på tillstånd:
                    </p>
                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-2 ml-1">
                        <li>
                            <strong className="text-orange-300">Trull (Monolog):</strong> Aktiveras om <code>ghostPressure</code> nås (Momentum Start &gt; 1.5s). Toleransen ställs till max <code>800ms</code> för att tillåta naturligt meningsflöde innan "The Squeeze".
                        </li>
                        <li>
                            <strong className="text-yellow-300">Trapp (Lyssna):</strong> Aktiveras om <code>jitterPressure &gt; 0.1s</code> (AI:n pratar). Toleransen halveras mjukt för att vi ska sluta prata snabbare om vi blir avbrutna.
                        </li>
                        <li>
                            <strong className="text-green-300">Tripp (Dialog):</strong> Vår standardnivå. Återgår till <code>500ms</code> – en aggressiv inställning för blixtsnabb ping-pong.
                        </li>
                    </ul>
                </div>

                {/* 2. IMPLEMENTATION DETAILS */}
                <div className="bg-slate-950 p-4 rounded border border-slate-800 text-xs font-mono text-slate-400 space-y-3">
                    <strong className="text-white border-b border-slate-700 pb-1 block">Kod-Implementering (Pseudokod)</strong>
                    <div className="space-y-1">
                        <p><span className="text-blue-400">let</span> target = 500; <span className="text-slate-600">// Tripp</span></p>
                        <p><span className="text-purple-400">if</span> (ghostActive) target = 800; <span className="text-slate-600">// Trull (Ghost, efter 1.5s)</span></p>
                        <p><span className="text-purple-400">else if</span> (bufferGap &gt; 0.1) target = 250; <span className="text-slate-600">// Trapp (AI pratar)</span></p>
                    </div>
                    <div className="bg-red-900/10 p-2 rounded border border-red-500/20 mt-2">
                        <strong className="text-red-300">SQUEEZE (Nödstopp):</strong>
                        <p>Eftersom vi har ett 6s-tak tvingas target linjärt ner mot 150ms mellan 4.0s och 5.5s för att förhindra klippta ord.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VadHysteresisAnalysis;
