import React, { useState } from 'react';
import { MessageSquareHeart, Heart, Send, Sparkles, User, Users } from 'lucide-react';
import { WishItem } from '../types';

interface WishesGuestbookProps {
  wishes: WishItem[];
  onAddWish: (wish: Omit<WishItem, 'id' | 'timestamp' | 'likes'>) => void;
  onLikeWish: (id: string) => void;
}

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({
  wishes,
  onAddWish,
  onLikeWish,
}) => {
  const [senderName, setSenderName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const quickTemplates = [
    "សូមជូនពរឱ្យចំណងអាពាហ៍ពិពាហ៍នេះ ជួបតែសុភមង្គល និងស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង! 🌸",
    "May your love grow stronger with each passing day. Wishing you a lifetime of joy and abundance!",
    "Congratulations to Suyhong & Vinaya! Best wishes on your magical wedding day! 🥂💍",
    "សូមឱ្យរកទទួលទានមានបាន ត្រជាក់ត្រជុំ និងមានកូនប្រុសស្រីឆាប់ៗ!"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    onAddWish({
      senderName: senderName.trim(),
      relation,
      message: message.trim(),
    });

    setSenderName('');
    setMessage('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <section id="wish" className="w-full py-12 px-4 sm:px-6 bg-[#182626]/80 border-t border-stone-800">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6d1a0] text-xs uppercase tracking-widest mb-2 font-medium">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>សូមជូនពរ • Guest Wishes &amp; Blessings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2e4c4] tracking-wide">
            Wedding Guestbook
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 font-serif">
            Send your warm congratulations and blessings to the bride &amp; groom
          </p>
        </div>

        {/* Wish Submission Form */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#203333]/90 border border-[#c5a059]/30 shadow-xl mb-8">
          <h3 className="text-sm sm:text-base font-serif text-[#e8d6ab] font-medium mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>Write a Blessing / ផ្ញើសារជូនពរ</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-stone-300 mb-1 font-medium">
                  Your Name / ឈ្មោះរបស់អ្នក *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Chan Sophea"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-900/60 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1 font-medium">
                  Relationship / ទំនាក់ទំនង
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-900/60 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Friend">Friend (មិត្តភក្តិ)</option>
                    <option value="Family">Family / Relative (សាច់ញាតិ)</option>
                    <option value="Colleague">Colleague (រួមការងារ)</option>
                    <option value="Neighbor">Neighbor (អ្នកជិតខាង)</option>
                    <option value="Well-wisher">Guest (ភ្ញៀវកិត្តិយស)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-stone-300 mb-1 font-medium">
                Your Blessing Message / សេចក្តីជូនពរ *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your prayers, memories, and wishes for Suyhong & Vinaya..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl bg-stone-900/60 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Quick blessing templates */}
            <div>
              <span className="text-[11px] text-[#d0bc8d] block mb-1.5 font-medium">
                Or tap to insert a blessing template:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(template)}
                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded-lg bg-stone-800/80 border border-stone-700 text-stone-300 hover:text-[#f4e4be] hover:border-[#c5a059]/40 transition-all text-left"
                  >
                    {template.slice(0, 42)}...
                  </button>
                ))}
              </div>
            </div>

            <button
              id="btn-submit-wish"
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#d1b069] to-[#b38f4a] text-stone-950 font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Blessing • ផ្ញើពរជ័យ</span>
            </button>
          </form>

          {showSuccessToast && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-900/50 border border-emerald-500/40 text-emerald-200 text-xs text-center animate-fade-in">
              ✨ Thank you! Your beautiful wedding blessing has been published to the guestbook!
            </div>
          )}
        </div>

        {/* Wishes List Feed */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1 mb-1">
            <span>Recent Guest Blessings ({wishes.length})</span>
            <span className="text-[#c5a059]">Spread Love &amp; Joy</span>
          </div>

          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="p-4 rounded-xl bg-[#223535]/80 border border-[#c5a059]/20 shadow-md backdrop-blur-sm transition-all hover:border-[#c5a059]/40"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#f1e2be]">
                    {wish.senderName}
                  </h4>
                  <span className="text-[10px] text-stone-400">
                    {wish.relation} • {wish.timestamp}
                  </span>
                </div>

                {/* Like / Heart reaction button */}
                <button
                  onClick={() => onLikeWish(wish.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/60 border border-stone-700/60 text-stone-300 hover:text-rose-300 hover:border-rose-400/40 text-[11px] transition-all cursor-pointer"
                  title="Send love"
                >
                  <Heart className={`w-3.5 h-3.5 ${wish.likes > 0 ? 'text-rose-400 fill-rose-400/80' : 'text-stone-400'}`} />
                  <span>{wish.likes}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-200 font-serif leading-relaxed">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
