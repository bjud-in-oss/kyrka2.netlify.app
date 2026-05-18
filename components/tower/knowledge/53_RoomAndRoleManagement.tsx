import React from 'react';

const RoomAndRoleManagement: React.FC = () => {
    return (
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/20 pb-1 flex items-center gap-2">
                <span className="bg-white text-black px-2 rounded text-xs">MODUL 53</span>
                53. Rumshantering & Decentraliserad Sändning
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 text-slate-300 text-sm space-y-8">
                
                {/* 1. DECENTRALISERAD SÄNDNING */}
                <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest border-l-4 border-purple-500 pl-3">1. Friktionsfritt Flöde (Kontextuell Sändning)</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        För att systemet ska vara flexibelt och skalbart har vi helt frångått principen om tvingande användarroller (som Admin eller Teacher) i URL:en. Sändarbehörighet är nu en <strong>kontextuell handling</strong>.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                            <strong className="text-purple-300 text-[11px] block mb-2 border-b border-purple-500/30 pb-1">Publishers (De som skapar/talar)</strong>
                            <ul className="text-[10px] text-slate-300 list-disc pl-4 space-y-2">
                                <li><strong>Handlingen:</strong> När någon klickar på "+ Skapa nytt rum" eller trycker in Push-to-Talk.</li>
                                <li><strong>Status:</strong> Enheten blir automatiskt en "Publisher" till rummets SFU-kanal.</li>
                                <li><strong>Decentralisering:</strong> Ingen roll tilldelas; åtgärden definierar sändaren. Vem som helst kan ta initiativet baserat på rummets sociala dynamik.</li>
                            </ul>
                        </div>
                        <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                            <strong className="text-blue-300 text-[11px] block mb-2 border-b border-blue-500/30 pb-1">Subscribers (Lyssnare)</strong>
                            <ul className="text-[10px] text-slate-300 list-disc pl-4 space-y-2">
                                <li><strong>Handlingen:</strong> När någon ansluter till rummet genom att scanna en QR-kod eller följa en länk.</li>
                                <li><strong>Status:</strong> Enheten ställs in som "Subscriber" för att ta emot tolkningen.</li>
                                <li><strong>Omställning:</strong> Om en lyssnare i rummet vill prata trycker de på mick-knappen och blir då kontextuellt en Publisher utan byråkrati.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. KONCEPTET RUM */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-l-4 border-blue-500 pl-3">2. Konceptet "Rum" (Isolerade Audio-kanaler)</h4>
                    
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Ett "Rum" är i denna arkitektur en ren, isolerad kanal för strömning av ljud via moln-SFU. Inga states synkroniseras.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-blue-400 text-xs block mb-1">Offentliga Rum (Huvudkyrkan)</strong>
                            <p className="text-[10px] text-slate-500">
                                Fasta URL:er (t.ex. <code>/room/kapellet</code>). Här sker typiskt envägs-tolkning (Smart Broadcast).
                            </p>
                        </div>
                        <div className="bg-slate-950 p-3 rounded border border-slate-800">
                            <strong className="text-orange-400 text-xs block mb-1">Privata Diskussionsrum</strong>
                            <p className="text-[10px] text-slate-500">
                                Unikt hash-ID (delas via QR). Flervägs-tolkning där alla deltagare kan tala fritt.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. ÖVERSÄTTNING AV RUMSNAMN */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-4 border-emerald-500 pl-3">3. Översättning av Rumsnamn (UI)</h4>
                    
                    <p className="text-xs text-slate-400 leading-relaxed">
                        För att undvika onödiga nätverksanrop och komplex synkronisering använder vi en statisk ordlista (i18n) för rumsnamn.
                    </p>

                    <div className="bg-emerald-900/10 p-4 rounded border border-emerald-500/20">
                        <strong className="text-emerald-300 text-xs block mb-2">Teknisk Regel: Statisk Översättning (i18n)</strong>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Systemet mappar fasta rums-IDn mot en lokal ordlista. Detta garanterar omedelbar laddning och noll API-förbrukning.
                        </p>
                        <div className="mt-3 p-2 bg-black/50 rounded text-[10px] text-slate-400 font-mono space-y-1">
                            <div>1. <span className="text-emerald-500 italic">// Publika rum:</span> Visas enligt lokal ordlista (t.ex. "Huvudsalen", "Main Hall").</div>
                            <div>2. <span className="text-emerald-500 italic">// Privata rum:</span> Dynamiska hash-IDn namnges ej av användaren.</div>
                            <div>3. <span className="text-emerald-500 italic">// UI-standard:</span> Alla privata rum visas enhetligt som "Privat grupp" + Ikon.</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RoomAndRoleManagement;

