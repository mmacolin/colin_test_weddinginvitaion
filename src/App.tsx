/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, Sparkles, ChevronUp, Share2, Check, Sliders, Music, Bot } from 'lucide-react';
import { initialWeddingData, defaultCeremonies, defaultPhotos, defaultWishes } from './data/defaultWedding';
import { WeddingData, WishItem, RsvpEntry } from './types';
import { CoverScreen } from './components/CoverScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { CountdownTimer } from './components/CountdownTimer';
import { CeremonyTimeline } from './components/CeremonyTimeline';
import { VenueLocation } from './components/VenueLocation';
import { PhotoGallery } from './components/PhotoGallery';
import { WishesGuestbook } from './components/WishesGuestbook';
import { RsvpSection } from './components/RsvpSection';
import { BottomNav } from './components/BottomNav';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { InvitationCustomizer } from './components/InvitationCustomizer';

export default function App() {
  const [wedding, setWedding] = useState<WeddingData>(() => {
    const saved = localStorage.getItem('memento_wedding_data') || localStorage.getItem('sambot_wedding_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new contact phone is reflected
        if (parsed.contactPhone === "+855 81 711 611" || !parsed.contactPhone) {
          parsed.contactPhone = initialWeddingData.contactPhone;
          parsed.contactTelegram = initialWeddingData.contactTelegram;
        }
        return { ...initialWeddingData, ...parsed };
      } catch {
        return initialWeddingData;
      }
    }
    return initialWeddingData;
  });

  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(false);
  const [shouldAutoPlayMusic, setShouldAutoPlayMusic] = useState<boolean>(false);
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    const saved = localStorage.getItem('memento_wishes') || localStorage.getItem('sambot_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultWishes;
      }
    }
    return defaultWishes;
  });

  const [savedRsvp, setSavedRsvp] = useState<RsvpEntry | null>(() => {
    const saved = localStorage.getItem('memento_rsvp') || localStorage.getItem('sambot_rsvp');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('top');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('memento_wedding_data', JSON.stringify(wedding));
  }, [wedding]);

  useEffect(() => {
    localStorage.setItem('memento_wishes', JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    if (savedRsvp) {
      localStorage.setItem('memento_rsvp', JSON.stringify(savedRsvp));
    }
  }, [savedRsvp]);

  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
    setShouldAutoPlayMusic(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddWish = (newWish: Omit<WishItem, 'id' | 'timestamp' | 'likes'>) => {
    const item: WishItem = {
      ...newWish,
      id: 'wish-' + Date.now(),
      timestamp: 'Just now',
      likes: 1,
    };
    setWishes([item, ...wishes]);
  };

  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const handleRsvpSubmit = (rsvp: RsvpEntry) => {
    setSavedRsvp(rsvp);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Wedding of ${wedding.groomName} & ${wedding.brideName}`,
        text: `You are cordially invited to celebrate the holy matrimony of ${wedding.groomName} & ${wedding.brideName}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c2e2e] text-stone-100 relative font-sans selection:bg-[#c5a059]/30">
      {/* Background Wedding Music Controller */}
      <AudioPlayer autoStart={shouldAutoPlayMusic} />

      {/* Sambot Cover Screen (Initial Envelope State) */}
      <AnimatePresence>
        {!isCoverOpen && (
          <CoverScreen wedding={wedding} onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      {/* Main Wedding Invitation Card Content */}
      <div id="top" className="relative max-w-xl mx-auto min-h-screen pb-24 shadow-2xl bg-[#1d2f2f] border-x border-[#c5a059]/20">
        {/* Top Floating Controls (Reopen Cover & Share) */}
        <header className="sticky top-0 z-30 px-4 py-3 bg-[#172525]/90 backdrop-blur-md border-b border-[#c5a059]/25 flex items-center justify-between">
          <button
            onClick={() => setIsCoverOpen(false)}
            className="text-[11px] text-[#e0cb99] hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/60 border border-stone-700/60 transition-colors cursor-pointer"
            title="View Cover Screen"
          >
            <span>Cover Envelope</span>
          </button>

          <div className="font-serif text-sm text-[#f1e1be] font-medium tracking-wide">
            {wedding.groomName[0]} &amp; {wedding.brideName[0]}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              title="Customize invitation details"
            >
              <Sliders className="w-4 h-4 text-[#c5a059]" />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              title="Share Invitation"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative px-6 pt-10 pb-8 text-center overflow-hidden">
          {/* Subtle floral/golden ornament background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#223737] via-[#1d2f2f] to-[#1a2828] opacity-90 -z-10" />

          {/* Traditional Auspicious Khmer Motif Header */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#c5a059]"></span>
            <span className="text-xs text-[#e8d4a5] font-serif tracking-widest uppercase">
              សិរីសួស្តីជ័យមង្គល
            </span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#c5a059]"></span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-[#f4e6c3] font-normal tracking-wide mb-1">
            ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="text-xs text-stone-300 tracking-wider uppercase mb-6">
            The Auspicious Wedding Ceremony
          </p>

          {/* Parents' Names Honor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-8 p-4 rounded-2xl bg-stone-900/40 border border-[#c5a059]/25 text-left backdrop-blur-sm">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#c5a059] block font-semibold mb-0.5">
                មាតាបិតាខាងប្រុស • Groom Parents
              </span>
              <p className="text-xs text-stone-200 font-serif leading-relaxed">
                {wedding.groomParents}
              </p>
            </div>
            <div className="sm:border-l sm:border-stone-700/60 sm:pl-3">
              <span className="text-[10px] uppercase tracking-wider text-[#c5a059] block font-semibold mb-0.5">
                មាតាបិតាខាងស្រី • Bride Parents
              </span>
              <p className="text-xs text-stone-200 font-serif leading-relaxed">
                {wedding.brideParents}
              </p>
            </div>
          </div>

          {/* Couple Display */}
          <div className="space-y-2 mb-6">
            <div className="inline-block px-4 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/30 text-xs text-[#f1e1be] font-medium tracking-wider">
              កូនកំលោះ និង កូនក្រមុំ • The Groom &amp; Bride
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide font-light">
              <span className="text-[#f7edd2]">{wedding.groomName}</span>
              <span className="text-[#c5a059] font-sans mx-2 text-2xl">&amp;</span>
              <span className="text-[#f7edd2]">{wedding.brideName}</span>
            </h2>
            <p className="text-base sm:text-lg text-[#decfa8] font-serif">
              {wedding.groomNameKhmer} និង {wedding.brideNameKhmer}
            </p>
          </div>

          {/* Formal Invitation Verse */}
          <div className="max-w-md mx-auto my-6 p-4 rounded-xl bg-gradient-to-b from-[#243a3a] to-[#1c2c2c] border border-[#c5a059]/30 shadow-md">
            <p className="text-xs sm:text-sm text-[#f1e4c6] font-serif leading-relaxed italic">
              &ldquo;{wedding.bannerQuoteKhmer}&rdquo;
            </p>
            <p className="text-[11px] text-stone-300 mt-2 font-sans leading-relaxed">
              {wedding.bannerQuoteEnglish}
            </p>
          </div>

          {/* Save Date & Calendar Quick CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a
              id="btn-quick-calendar"
              href={wedding.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d1b069] to-[#b38f4a] text-stone-950 font-semibold text-xs tracking-wider uppercase hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Save The Date • រក្សាទុកកាលបរិច្ឆេទ</span>
            </a>
          </div>
        </section>

        {/* Live Countdown Section */}
        <section className="px-6 py-6 border-y border-[#c5a059]/20 bg-[#172525]/60">
          <CountdownTimer targetDateString={wedding.weddingDate} />
        </section>

        {/* Wedding Schedule & Ceremonies */}
        <CeremonyTimeline
          ceremonies={defaultCeremonies}
          dressCodeMorning={wedding.dressCodeMorning}
          dressCodeEvening={wedding.dressCodeEvening}
        />

        {/* Venue Location & Map */}
        <VenueLocation wedding={wedding} />

        {/* Pre-Wedding Photo Gallery */}
        <PhotoGallery photos={defaultPhotos} />

        {/* Guest Wishes & Guestbook */}
        <WishesGuestbook
          wishes={wishes}
          onAddWish={handleAddWish}
          onLikeWish={handleLikeWish}
        />

        {/* RSVP Confirmation */}
        <RsvpSection
          onRsvpSubmit={handleRsvpSubmit}
          savedRsvp={savedRsvp}
        />

        {/* AI Concierge Feature Callout Banner */}
        <section className="px-6 py-8">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#273d3d] via-[#1f3131] to-[#182626] border border-[#c5a059]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6 text-[#f1e1be]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-semibold text-[#f1e1be]">
                  Have Questions? Ask Memento Assistant
                </h3>
                <p className="text-xs text-stone-300">
                  Instant answers on ceremony rites, dress code, parking &amp; custom Khmer blessings.
                </p>
              </div>
            </div>

            <button
              id="btn-open-chatbot-callout"
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#c5a059] text-stone-950 font-semibold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shrink-0 cursor-pointer"
            >
              Open AI Chat
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-10 text-center border-t border-stone-800 text-xs text-stone-400 space-y-3">
          <div className="flex items-center justify-center gap-1 text-[#d2be92] font-serif text-sm">
            <span>With heartfelt gratitude from</span>
            <span className="font-semibold text-[#f5e4bf]">{wedding.groomName} &amp; {wedding.brideName}</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 ml-1" />
          </div>

          <p className="text-[11px] text-stone-400">
            For inquiries &amp; contacts: {wedding.contactPhone} • Telegram: {wedding.contactTelegram}
          </p>

          <p className="text-[10px] text-stone-500 pt-2 border-t border-stone-800/80">
            Powered by Memento Cambodia Digital Wedding Invitations • Crafted with React &amp; Gemini AI
          </p>
        </footer>
      </div>

      {/* Floating Sticky Bottom Navigation Bar */}
      {isCoverOpen && (
        <BottomNav
          onOpenChat={() => setIsChatOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onScrollTo={scrollToSection}
          activeSection={activeSection}
        />
      )}

      {/* AI Wedding Concierge Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        wedding={wedding}
      />

      {/* Invitation Customizer Modal */}
      {isCustomizerOpen && (
        <InvitationCustomizer
          wedding={wedding}
          onSave={(newData) => setWedding(newData)}
          onReset={() => setWedding(initialWeddingData)}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}
    </div>
  );
}
