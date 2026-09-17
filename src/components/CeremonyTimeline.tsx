import React, { useState } from 'react';
import { Calendar, Sun, Moon, Sparkles } from 'lucide-react';
import { CeremonyItem } from '../types';

interface CeremonyTimelineProps {
  ceremonies: CeremonyItem[];
  dressCodeMorning: string;
  dressCodeEvening: string;
}

export const CeremonyTimeline: React.FC<CeremonyTimelineProps> = ({
  ceremonies,
  dressCodeMorning,
  dressCodeEvening,
}) => {
  const [filter, setFilter] = useState<'all' | 'morning' | 'evening'>('all');

  const filteredCeremonies = ceremonies.filter((c) => {
    if (filter === 'morning') return c.isMorning;
    if (filter === 'evening') return !c.isMorning;
    return true;
  });

  return (
    <section id="schedule" className="w-full py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6d1a0] text-xs uppercase tracking-widest mb-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>កម្មវិធីមង្គលការ • Wedding Program</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2e4c4] tracking-wide">
            Schedule of Ceremonies
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-md mx-auto">
            Please join us for each auspicious rite and the celebratory evening dinner reception.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all font-medium ${
                filter === 'all'
                  ? 'bg-[#c5a059] text-stone-900 font-semibold shadow-md'
                  : 'bg-[#223535] text-stone-300 hover:text-white border border-stone-700/60'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('morning')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all font-medium ${
                filter === 'morning'
                  ? 'bg-[#c5a059] text-stone-900 font-semibold shadow-md'
                  : 'bg-[#223535] text-stone-300 hover:text-white border border-stone-700/60'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Morning Rites</span>
            </button>
            <button
              onClick={() => setFilter('evening')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all font-medium ${
                filter === 'evening'
                  ? 'bg-[#c5a059] text-stone-900 font-semibold shadow-md'
                  : 'bg-[#223535] text-stone-300 hover:text-white border border-stone-700/60'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Evening Gala</span>
            </button>
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="relative border-l-2 border-[#c5a059]/40 ml-4 sm:ml-6 space-y-6 sm:space-y-8 pl-6 sm:pl-8">
          {filteredCeremonies.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#1b2b2b] border-2 border-[#c5a059] flex items-center justify-center shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
              </div>

              {/* Ceremony Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#233838]/90 to-[#192727]/90 border border-[#c5a059]/25 shadow-xl hover:border-[#c5a059]/50 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#c5a059]/20 text-[#f5e3bc] font-mono text-xs font-semibold tracking-wide border border-[#c5a059]/30">
                    {item.time}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#d2be92] flex items-center gap-1">
                    {item.isMorning ? (
                      <>
                        <Sun className="w-3 h-3 text-[#c5a059]" /> Morning Tradition
                      </>
                    ) : (
                      <>
                        <Moon className="w-3 h-3 text-[#c5a059]" /> Evening Gala
                      </>
                    )}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif text-[#f2e5c8] font-medium leading-snug">
                  {item.titleKhmer}
                </h3>
                <h4 className="text-xs sm:text-sm text-stone-300 font-sans font-medium mb-2">
                  {item.titleEnglish}
                </h4>

                <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed font-serif">
                  {item.descriptionKhmer}
                </p>
                <p className="text-[11px] sm:text-xs text-stone-400 mt-1 leading-relaxed">
                  {item.descriptionEnglish}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dress Code Guidance Card */}
        <div className="mt-10 p-5 rounded-2xl bg-[#1d2d2d]/90 border border-[#c5a059]/30 shadow-lg text-center">
          <div className="flex items-center justify-center gap-2 text-[#e5cf9d] text-xs uppercase tracking-widest mb-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Dress Code Guidelines • សម្លៀកបំពាក់</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mt-3">
            <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-700/50">
              <span className="text-xs text-[#d2be92] font-semibold block mb-1">Morning Ceremony:</span>
              <p className="text-xs text-stone-300">{dressCodeMorning}</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-700/50">
              <span className="text-xs text-[#d2be92] font-semibold block mb-1">Evening Reception:</span>
              <p className="text-xs text-stone-300">{dressCodeEvening}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
