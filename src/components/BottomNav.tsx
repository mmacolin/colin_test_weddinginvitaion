import React from 'react';
import { Home, Calendar, MapPin, Camera, MessageSquareHeart, Bot, Sliders } from 'lucide-react';

interface BottomNavProps {
  onOpenChat: () => void;
  onOpenCustomizer: () => void;
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onOpenChat,
  onOpenCustomizer,
  onScrollTo,
  activeSection,
}) => {
  const navItems = [
    { id: 'top', label: 'Top', labelKhmer: 'ទំព័រដើម', icon: Home },
    { id: 'schedule', label: 'Events', labelKhmer: 'កម្មវិធី', icon: Calendar },
    { id: 'location', label: 'Venue', labelKhmer: 'ទីតាំង', icon: MapPin },
    { id: 'gallery', label: 'Photos', labelKhmer: 'រូបភាព', icon: Camera },
    { id: 'wish', label: 'Wishes', labelKhmer: 'ជូនពរ', icon: MessageSquareHeart },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center p-3 pointer-events-none">
      <nav 
        aria-label="Wedding Invitation Navigation"
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-[#1b2b2b]/95 border border-[#c5a059]/40 shadow-2xl backdrop-blur-md text-stone-300"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className={`flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#f5e4bf] bg-[#c5a059]/20'
                  : 'hover:text-[#e8d5a7] text-stone-400'
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="text-[9px] sm:text-[10px] tracking-tight font-medium mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="h-6 w-[1px] bg-stone-700/60 mx-1"></div>

        {/* AI Concierge Chatbot Button */}
        <button
          id="nav-btn-ai-concierge"
          onClick={onOpenChat}
          className="relative flex flex-col items-center justify-center px-3 py-1 rounded-full bg-gradient-to-r from-[#c5a059] to-[#b38d47] text-stone-950 font-semibold shadow-lg hover:brightness-110 transition-all cursor-pointer"
          title="Ask Memento Assistant"
        >
          <div className="flex items-center gap-1">
            <Bot className="w-4 h-4 text-stone-950" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse"></span>
          </div>
          <span className="text-[9px] sm:text-[10px] tracking-tight">AI Chat</span>
        </button>

        {/* Customizer Button */}
        <button
          onClick={onOpenCustomizer}
          className="flex flex-col items-center justify-center px-2 py-1 rounded-full text-stone-400 hover:text-[#c5a059] transition-colors cursor-pointer"
          title="Customize Names & Date"
        >
          <Sliders className="w-4 h-4" />
          <span className="text-[9px]">Edit</span>
        </button>
      </nav>
    </div>
  );
};
