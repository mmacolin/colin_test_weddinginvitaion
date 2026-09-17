import React, { useState } from 'react';
import { CheckCircle2, UserCheck, Phone, Check, PartyPopper } from 'lucide-react';
import { RsvpEntry } from '../types';

interface RsvpSectionProps {
  onRsvpSubmit: (rsvp: RsvpEntry) => void;
  savedRsvp: RsvpEntry | null;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onRsvpSubmit, savedRsvp }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [ceremony, setCeremony] = useState<'morning' | 'evening' | 'both'>('both');
  const [wishes, setWishes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const entry: RsvpEntry = {
      id: 'rsvp-' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guestsCount: attending === 'yes' ? guestsCount : 0,
      ceremony,
      wishes: wishes.trim(),
      submittedAt: new Date().toLocaleDateString(),
    };

    onRsvpSubmit(entry);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="w-full py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6d1a0] text-xs uppercase tracking-widest mb-2 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>ឆ្លើយតបការចូលរួម • RSVP Confirmation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2e4c4] tracking-wide">
            Will You Attend?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 font-serif">
            Please let us know by March 5, 2025 so we can prepare your seats &amp; banquet table
          </p>
        </div>

        {submitted || savedRsvp ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#213737] to-[#172525] border border-[#c5a059]/40 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059] mx-auto flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-[#f1e2be]" />
            </div>
            <h3 className="text-xl font-serif text-[#f4e6c3]">
              {savedRsvp?.attending === 'yes' || attending === 'yes'
                ? 'We Look Forward To Celebrating With You!'
                : 'Thank You For Letting Us Know!'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-serif max-w-md mx-auto">
              {savedRsvp?.attending === 'yes' || attending === 'yes'
                ? `Your RSVP has been registered for ${savedRsvp?.guestsCount || guestsCount} guest(s). Suyhong & Vinaya are truly honored by your presence!`
                : 'We will miss having you in person, but your warm thoughts and prayers mean the world to us!'}
            </p>
            <div className="p-3 rounded-xl bg-stone-900/50 border border-stone-700/50 max-w-xs mx-auto text-xs text-stone-300">
              <span className="text-[#c5a059] font-medium block mb-1">Registered Guest:</span>
              <p className="font-semibold text-white">{savedRsvp?.name || name}</p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {savedRsvp?.attending === 'yes' || attending === 'yes'
                  ? `Attending: ${savedRsvp?.ceremony === 'both' ? 'Both Morning & Evening' : savedRsvp?.ceremony === 'morning' ? 'Morning Only' : 'Evening Banquet'}`
                  : 'Regretfully Unable to Attend'}
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
              }}
              className="text-xs text-[#c5a059] underline hover:text-[#f1e2be] transition-colors"
            >
              Update or Change Response
            </button>
          </div>
        ) : (
          <div className="p-5 sm:p-7 rounded-2xl bg-[#203333]/90 border border-[#c5a059]/30 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Attendance Choice Buttons */}
              <div>
                <label className="block text-xs text-stone-300 mb-2 font-medium">
                  Will you be able to attend? / តើអ្នកនឹងអាចចូលរួមបានទេ? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      attending === 'yes'
                        ? 'bg-[#c5a059] text-stone-950 border-[#f5e6c4] font-semibold shadow-md'
                        : 'bg-stone-900/60 text-stone-300 border-stone-700 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Yes, I will attend!</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      attending === 'no'
                        ? 'bg-rose-800 text-rose-100 border-rose-500 font-semibold shadow-md'
                        : 'bg-stone-900/60 text-stone-300 border-stone-700 hover:text-white'
                    }`}
                  >
                    <span>Sorry, cannot attend</span>
                  </button>
                </div>
              </div>

              {/* Guest Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 mb-1 font-medium">
                    Full Name / ឈ្មោះពេញ *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Oknha / Mr. / Ms..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-900/60 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1 font-medium">
                    Phone or Telegram / លេខទូរស័ព្ទ
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="012 345 678"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-900/60 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>

              {/* Only show session & guest count if attending */}
              {attending === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-stone-300 mb-1 font-medium">
                      Number of Guests / ចំនួនភ្ញៀវ
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestsCount(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            guestsCount === num
                              ? 'bg-[#c5a059] text-stone-950 border-[#f5e6c4]'
                              : 'bg-stone-900/60 text-stone-300 border-stone-700 hover:text-white'
                          }`}
                        >
                          {num === 4 ? '4+' : num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 mb-1 font-medium">
                      Ceremony / កម្មវិធីដែលចូលរួម
                    </label>
                    <select
                      value={ceremony}
                      onChange={(e) => setCeremony(e.target.value as 'morning' | 'evening' | 'both')}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-900/60 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
                    >
                      <option value="both">Both Morning &amp; Evening Gala (ទាំងពីរ)</option>
                      <option value="morning">Morning Traditional Rites Only (ពេលព្រឹក)</option>
                      <option value="evening">Evening Banquet Reception Only (ពេលល្ងាច)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs text-stone-300 mb-1 font-medium">
                  Note to Couple (Optional) / សេចក្តីសម្គាល់
                </label>
                <input
                  type="text"
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Dietary requests, congratulations, etc."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-900/60 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <button
                id="btn-confirm-rsvp"
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#d1b069] to-[#b38f4a] text-stone-950 font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm RSVP • បញ្ជាក់ការចូលរួម</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
