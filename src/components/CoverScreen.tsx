import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { WeddingData } from '../types';

interface CoverScreenProps {
  wedding: WeddingData;
  onOpen: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ wedding, onOpen }) => {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-between p-6 bg-[#203333] text-stone-100 overflow-hidden select-none">
      {/* Ambient background with overlay & video/image texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')`
        }}
      />
      {/* Decorative radial lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a2a]/95 via-[#243939]/70 to-[#121c1c]/95" />

      {/* Floating golden particles / shimmer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#c5a059]/40 blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: `${(i * 8.5) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Top Header Motif */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-4 flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#c5a059]"></span>
          <span className="text-[#e2ca92] text-xs uppercase tracking-[0.25em] font-medium font-sans">
            Special Invitation
          </span>
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#c5a059]"></span>
        </div>

        {/* Traditional Khmer auspicious emblem text */}
        <p className="text-xl sm:text-2xl font-serif text-[#e5cf9d] tracking-wide font-normal">
          ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
        </p>
        <p className="text-xs text-stone-300 tracking-wider uppercase mt-0.5">
          The Auspicious Holy Matrimony
        </p>
      </motion.div>

      {/* Center Couple Showcase Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center text-center my-auto px-4"
      >
        {/* Ornate Gold Ring Border Around Initials */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#c5a059]/60 flex items-center justify-center p-1 shadow-2xl shadow-[#c5a059]/20 bg-[#1e2f2f]/80 backdrop-blur-md">
            <div className="w-full h-full rounded-full border border-dashed border-[#e3ce9c]/70 flex items-center justify-center flex-col">
              <span className="font-serif text-2xl sm:text-3xl text-[#e8d5a7] tracking-wider font-light">
                {wedding.groomName[0]} & {wedding.brideName[0]}
              </span>
              <Heart className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]/40 mt-1" />
            </div>
          </div>
          {/* Subtle spinning glow */}
          <div className="absolute -inset-1 rounded-full border border-[#c5a059]/20 animate-spin [animation-duration:18s]" />
        </div>

        {/* Couple Names */}
        <div className="space-y-1 mb-4">
          <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide font-light">
            <span className="text-[#f1e2be]">{wedding.groomName}</span>
            <span className="text-[#c5a059] mx-2 text-2xl font-sans">&amp;</span>
            <span className="text-[#f1e2be]">{wedding.brideName}</span>
          </h1>
          <p className="text-base sm:text-lg text-[#d2be92] font-serif">
            {wedding.groomNameKhmer} និង {wedding.brideNameKhmer}
          </p>
        </div>

        {/* Date & Location Badges */}
        <div className="flex flex-col items-center gap-2 py-3 px-5 rounded-xl bg-stone-900/40 border border-[#c5a059]/20 backdrop-blur-sm w-full">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
            <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{wedding.weddingDateDisplay}</span>
          </div>
          <div className="h-[1px] w-full bg-stone-700/50"></div>
          <div className="flex items-center gap-2 text-xs text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="truncate">{wedding.venueName}</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Open Button Call to Action (Sambot signature button) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 pb-6 flex flex-col items-center gap-3 w-full"
      >
        <p className="text-xs text-stone-300/80 tracking-widest uppercase">
          Kindly open for ceremony details &amp; RSVP
        </p>

        {/* Sambot style pulsing Open button */}
        <motion.button
          id="btn-open-invitation"
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(197, 160, 89, 0.5)",
              "0 0 0 16px rgba(197, 160, 89, 0)",
              "0 0 0 0 rgba(197, 160, 89, 0)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
            },
          }}
          className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d8b56f] via-[#c5a059] to-[#b38d47] text-stone-900 font-semibold shadow-xl shadow-[#c5a059]/20 cursor-pointer overflow-hidden border border-[#f5e6c4]"
        >
          <Sparkles className="w-4 h-4 text-stone-900" />
          <span className="text-base tracking-wider font-serif">សូមចុចបើក • Open Invitation</span>
          <ChevronDown className="w-4 h-4 text-stone-900 group-hover:translate-y-0.5 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};
