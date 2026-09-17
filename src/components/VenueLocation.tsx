import React from 'react';
import { MapPin, Navigation, Calendar, Car, ExternalLink } from 'lucide-react';
import { WeddingData } from '../types';

interface VenueLocationProps {
  wedding: WeddingData;
}

export const VenueLocation: React.FC<VenueLocationProps> = ({ wedding }) => {
  return (
    <section id="location" className="w-full py-12 px-4 sm:px-6 bg-[#1b2b2b]/60 border-y border-stone-800">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#e6d1a0] text-xs uppercase tracking-widest mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>ទីតាំងមង្គលការ • Wedding Venue &amp; Map</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#f2e4c4] tracking-wide">
            {wedding.venueName}
          </h2>
          <p className="text-xs sm:text-sm text-[#d5c296] mt-1 font-serif">
            {wedding.venueRoom}
          </p>
        </div>

        {/* Venue Card with Map Visualizer */}
        <div className="rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-2xl bg-[#223636]/90">
          {/* Simulated Map Visualizer / Satellite Preview */}
          <div className="relative h-56 sm:h-64 w-full bg-stone-900 overflow-hidden group">
            {/* Interactive Styled Map Background */}
            <iframe
              title="Venue Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.572458421066!2d104.87704257579169!3d11.582496743806208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951819d45e955%3A0x2fbfca8a2df97fa6!2sThe%20Premier%20Centre%20Sen%20Sok!5e0!3m2!1sen!2skh!4v1709999999999!5m2!1sen!2skh"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>

            {/* Overlay badge with location pin */}
            <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#c5a059]/40 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-stone-200 font-medium">Sen Sok, Phnom Penh</span>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-stone-100">Address &amp; Directions</h4>
                <p className="text-xs text-stone-300 leading-relaxed mt-0.5">
                  {wedding.venueAddress}
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  Near AEON Mall 2 Sen Sok, convenient access from Hanoi Blvd &amp; Street 1928.
                </p>
              </div>
            </div>

            {/* Parking Tips */}
            <div className="flex items-start gap-3 pt-2 border-t border-stone-700/50">
              <Car className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <p className="text-xs text-stone-300">
                Spacious complimentary on-site parking available for both cars and motorcycles at Building E.
              </p>
            </div>

            {/* Action Buttons: Sambot's signature Google Maps & Calendar buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <a
                id="btn-google-maps"
                href={wedding.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#d1b069] to-[#b38f4a] text-stone-900 font-semibold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all text-center"
              >
                <Navigation className="w-4 h-4 text-stone-950" />
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-900/80" />
              </a>

              <a
                id="btn-save-calendar"
                href={wedding.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1a2828] border border-[#c5a059]/50 text-[#e9d6ab] font-medium text-xs uppercase tracking-wider hover:bg-[#233535] hover:text-white transition-all text-center"
              >
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                <span>Save To Calendar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
