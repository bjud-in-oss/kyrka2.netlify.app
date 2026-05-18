import React from 'react';

const RoomAndMeetingUX: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 55</span>
                Room & Meeting UX
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                {/* 1. FYSISKA RUM VS DIGITALA MÖTEN */}
                <div className="space-y-4">
                    <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-widest border-l-4 border-indigo-500 pl-3">1. Fysiska Rum och SFU-kanaler</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Systemet använder URL:en för att definiera det rumsliga sammanhanget, utan att synkronisera digitala "Mötestillstånd" över applikationen.
                        </p>
                        <ul className="text-[11px] text-slate-300 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-indigo-300">Fysiskt Rum (URL):</strong> 
                                URL:en kopplar till ett isolerat Cloudflare SFU-rum, till exempel <code>/room/kapellet</code>. Detta gör att användare kan bokmärka eller scanna en fast QR-kod vid dörren.
                            </li>
                            <li>
                                <strong className="text-indigo-300">Inga Globala Mötestillstånd:</strong> 
                                Det finns inga DataChannels som tvingar alla i rummet byta UI eller språk på en gång. All interaktion styrs av varje enskild enhet decentraliserat.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. DECENTRALISERAD SAMTALSLOGIK */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest border-l-4 border-pink-500 pl-3">2. Decentraliserad Samtalslogik</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-3">
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Eftersom SFU:n är en "dum" och oerhört snabb ljudfördelare styrs interaktionen helt och hållet av de fysiska och sociala reglerna i rummet. Ingen mjukvara tvingar fram mute-states.
                        </p>
                        <ul className="text-[11px] text-slate-400 list-disc pl-4 space-y-2">
                            <li>
                                <strong className="text-pink-300">Individansvar:</strong> Deltagaren kontrollerar enbart sin egen mikrofon (Kvadrat 1). Du trycker för att sända ut ditt ljud. 
                            </li>
                            <li>
                                <strong className="text-pink-300">Ingen "Mute All" Mjukvara:</strong> Till skillnad från appar som Zoom existerar inga nätverkssynkade <code>Mute All</code> eller <code>handRaised</code>-kommandoköer. Moderering sker genom handuppräckning fysiskt i kyrkan.
                            </li>
                            <li>
                                <strong className="text-pink-300">Decentraliserat Val:</strong> Det enda deltagaren ställer in digitalt är vad de själva vill höra (Kvadrat 2), dvs sitt eget målspråk.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. INBJUDAN VIA QR */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Inbjudan via QR</h4>
                    
                    <div className="bg-slate-950 p-4 rounded border border-slate-800">
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                            Ikonen för rumsval (Kvadrat 1 - Ingången) i gränssnittet visar rummets QR-kod vid klick, vilket gör delning omedelbar.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                <strong className="text-emerald-300 text-[11px] block mb-1">Offentliga Rum</strong>
                                <p className="text-[10px] text-slate-400">
                                    Har fasta QR-koder som kan printas ut och sättas upp på väggar eller i programblad.
                                </p>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                <strong className="text-emerald-300 text-[11px] block mb-1">Privata Diskussionsrum</strong>
                                <p className="text-[10px] text-slate-400">
                                    Genererar dynamiska Hash-URL:er och QR-koder direkt på skärmen för snabb, tillfällig delning mellan deltagare.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RoomAndMeetingUX;
