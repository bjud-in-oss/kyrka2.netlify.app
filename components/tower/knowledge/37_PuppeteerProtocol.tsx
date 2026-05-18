
import React from 'react';

const PuppeteerProtocol: React.FC = () => {
    return (
        <section className="mb-12 border-t border-fuchsia-500/30 pt-8">
            <h3 className="text-fuchsia-400 font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="bg-fuchsia-900/30 text-fuchsia-300 px-2 rounded text-xs border border-fuchsia-500/30">MODUL 37</span>
                Puppeteer Protocol: Regissören
            </h3>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-fuchsia-500/20 text-slate-300 text-sm space-y-8">
                
                <div className="bg-red-900/20 p-4 rounded border border-red-500/40 mb-6">
                    <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span>❌</span> [DEPRECATED / SKROTAD]
                    </h4>
                    <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                        "Puppeteer Protocol" har tagits bort helt. Vårt stenhårda 6-sekunders max-fönster tillsammans med "The Tape Recorder"-filosofin har eliminerat behovet av att injicera osynliga text-kommandon ("Hmm...") vid långa pauser. 
                    </p>
                </div>
                
                {/* 1. KORT HISTORIA */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest border-l-4 border-fuchsia-500 pl-3">Varför detta en gång behövdes</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Tidigare fanns en risk att AI:n "hallucinerade" slut på meningar om talaren tog en konstpaus i 3-4 sekunder. 
                        För att förhindra det injicerades osynliga textkommandon (REPEAT_LAST, FILLER osv.) över nätverket för att hålla sessionen igång.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Nu klipper vi istället konsekvent ner blocken till max 6 sekunder och hanterar all samtalshistorik ("Tape Recorder") så att AI:n alltid har exakt kontext på vad som senast sagts, vilket gör "Puppeteer"-tricken överflödiga.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default PuppeteerProtocol;
