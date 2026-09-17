export interface WeddingData {
  groomName: string;
  groomNameKhmer: string;
  brideName: string;
  brideNameKhmer: string;
  groomParents: string;
  brideParents: string;
  weddingDate: string; // e.g. "2025-03-15T07:00:00"
  weddingDateDisplay: string;
  weddingDateKhmer: string;
  venueName: string;
  venueRoom: string;
  venueAddress: string;
  googleMapsUrl: string;
  googleCalendarUrl: string;
  bannerQuoteKhmer: string;
  bannerQuoteEnglish: string;
  dressCodeMorning: string;
  dressCodeEvening: string;
  contactPhone: string;
  contactTelegram: string;
}

export interface CeremonyItem {
  id: string;
  time: string;
  titleKhmer: string;
  titleEnglish: string;
  descriptionKhmer: string;
  descriptionEnglish: string;
  iconType: 'procession' | 'monk' | 'thread' | 'reception' | 'banquet';
  isMorning: boolean;
}

export interface PhotoItem {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  width?: 'full' | 'half' | 'third';
}

export interface WishItem {
  id: string;
  senderName: string;
  relation: string; // "Friend", "Family", "Colleague", etc.
  message: string;
  timestamp: string;
  likes: number;
}

export interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  ceremony: 'morning' | 'evening' | 'both';
  wishes?: string;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
