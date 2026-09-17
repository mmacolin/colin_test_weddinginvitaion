import { WeddingData, CeremonyItem, PhotoItem, WishItem } from '../types';

export const initialWeddingData: WeddingData = {
  groomName: "Suyhong",
  groomNameKhmer: "ស៊ុយហុង",
  brideName: "Vinaya",
  brideNameKhmer: "វិន័យ",
  groomParents: "លោក ឈា ហុង និងលោកស្រី សុខ គង់",
  brideParents: "លោក គឹម វណ្ណា និងលោកស្រី ម៉ៅ សុភី",
  weddingDate: "2025-03-15T07:00:00",
  weddingDateDisplay: "Saturday, March 15, 2025",
  weddingDateKhmer: "ថ្ងៃសៅរ៍ ១ រោច ខែផល្គុន ឆ្នាំរោង ឆស័ក ព.ស. ២៥៦៨",
  venueName: "The Premier Centre Sen Sok",
  venueRoom: "Grand Ballroom Building E",
  venueAddress: "Oknha Mong Reththy St. (1928), Sangkat Phnom Penh Thmey, Khan Sen Sok, Phnom Penh",
  googleMapsUrl: "https://maps.google.com/?q=The+Premier+Centre+Sen+Sok",
  googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Suyhong+%26+Vinaya&dates=20250315T000000Z/20250315T160000Z&details=Wedding+Celebration+of+Suyhong+%26+Vinaya+at+The+Premier+Centre+Sen+Sok&location=The+Premier+Centre+Sen+Sok,+Phnom+Penh",
  bannerQuoteKhmer: "សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា លោក លោកស្រី អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីជ័យមង្គលក្នុងពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ",
  bannerQuoteEnglish: "Together with their beloved parents, Suyhong & Vinaya cordially request the honor of your presence to celebrate their holy matrimony and share in the joyous blessings.",
  dressCodeMorning: "Traditional Khmer Attire / Smart Formal",
  dressCodeEvening: "Formal Evening Gown & Suit (Color Palette: Gold, Emerald Green, Champagne, Rose Gold)",
  contactPhone: "+855 81 711 611",
  contactTelegram: "t.me/sambot_online"
};

export const defaultCeremonies: CeremonyItem[] = [
  {
    id: "ceremony-1",
    time: "07:00 AM",
    titleKhmer: "ពិធីហែក្បួនជំនូន (ចេក ផ្កាឈូក & ផ្លែឈើ)",
    titleEnglish: "Hae Chamnouk (Groom's Procession & Fruit Offerings)",
    descriptionKhmer: "ក្បួនដង្ហែជំនូនរបស់កូនកំលោះ និងសាច់ញាតិមិត្តភក្តិ ចូលមករកគេហដ្ឋានកូនក្រមុំ អមដោយភ្លេងបុរាណខ្មែរ",
    descriptionEnglish: "The groom and family arrive bearing 36 traditional trays of fruits, flowers, and gifts accompanied by live Pin Peat melodies.",
    iconType: "procession",
    isMorning: true
  },
  {
    id: "ceremony-2",
    time: "08:30 AM",
    titleKhmer: "ពិធីកាត់សក់បង្កក់សិរី & សូត្រមន្តចម្រើនព្រះបរិត្ត",
    titleEnglish: "Kat Sork (Hair Cutting Ceremony) & Monk Blessings",
    descriptionKhmer: "និមន្តព្រះសង្ឃសូត្រមន្តចម្រើនព្រះបរិត្ត និងពិធីកាត់សក់តំណាងឱ្យការលុបលាងអតីតកាល ទទួលសិរីសួស្តីថ្មី",
    descriptionEnglish: "Symbolic hair cleansing by celestial spirits and parents to wash away past misfortune and bless the new couple with eternal joy.",
    iconType: "monk",
    isMorning: true
  },
  {
    id: "ceremony-3",
    time: "10:30 AM",
    titleKhmer: "ពិធីសំពះផ្ទឹម ចងដៃ និងបង្វិលពពិល",
    titleEnglish: "Ptem (Tying the Thread) & Passing the Candle",
    descriptionKhmer: "ពិធីចងអំបោះក្រហមនៅលើកដៃគូស្វាមីភរិយាថ្មី ទទួលពរជ័យពីមាតាបិតា ញាតិមិត្ត និងបង្វិលពពិល ៧ ជុំ",
    descriptionEnglish: "Sacred red string binding around the couple's wrists with elder blessings, followed by passing the blessed candle 7 times.",
    iconType: "thread",
    isMorning: true
  },
  {
    id: "ceremony-4",
    time: "05:00 PM",
    titleKhmer: "ពិធីទទួលភ្ញៀវ & ថតរូបអនុស្សាវរីយ៍",
    titleEnglish: "Guest Welcome & Red Carpet Photo Session",
    descriptionKhmer: "ស្វាគមន៍ភ្ញៀវកិត្តិយស ពិសាភេសជ្ជៈ និងថតរូបអនុស្សាវរីយ៍នៅមុខផ្កាមង្គលការដ៏ស្រស់ស្អាត",
    descriptionEnglish: "Arrival of esteemed guests, welcome cocktail drinks, and memory photo sessions at the grand floral backdrop.",
    iconType: "reception",
    isMorning: false
  },
  {
    id: "ceremony-5",
    time: "06:30 PM",
    titleKhmer: "ពិធីពិសាភោជនាហារ រាំកម្សាន្ត និងកាត់នំខួបមង្គលការ",
    titleEnglish: "Grand Banquet Gala, Wedding Cake & Dance Celebration",
    descriptionKhmer: "ពិសារអាហារ ៨ មុខរសជាតិឈ្ងុយឆ្ងាញ់ ចាក់ស្រាសំប៉ាញ កាត់នំមង្គល និងរាំកម្សាន្តជាមួយក្រុមតន្ត្រី",
    descriptionEnglish: "An exquisite 8-course banquet dinner, champagne tower toast, cake cutting ceremony, followed by live music and dancing.",
    iconType: "banquet",
    isMorning: false
  }
];

export const defaultPhotos: PhotoItem[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    caption: "Suyhong & Vinaya - A Love Story Under Golden Light",
    width: "full"
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
    caption: "Traditional Khmer Golden Silk Elegance",
    width: "half"
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop",
    caption: "The Sacred Golden Wedding Bands",
    width: "half"
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
    caption: "Walking Into A Lifetime of Happiness",
    width: "third"
  },
  {
    id: "photo-5",
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop",
    caption: "Enchanting Floral Table Centerpiece",
    width: "third"
  },
  {
    id: "photo-6",
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop",
    caption: "Joyous Smiles & Eternal Promises",
    width: "third"
  }
];

export const defaultWishes: WishItem[] = [
  {
    id: "wish-1",
    senderName: "Sophea & Dara",
    relation: "Close Friends",
    message: "សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ បវរមហាប្រសើរ ជូនដល់ប្អូនទាំងពីរ សូមស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំដូចទឹកអង្គរ! Congratulations Suyhong & Vinaya!",
    timestamp: "2 hours ago",
    likes: 18
  },
  {
    id: "wish-2",
    senderName: "Uncle Rithy & Aunty Channy",
    relation: "Family",
    message: "Happy Wedding Day to our lovely nephew Suyhong and niece Vinaya! May your marriage be filled with laughter, divine harmony, and fruitful blessings!",
    timestamp: "5 hours ago",
    likes: 12
  },
  {
    id: "wish-3",
    senderName: "Vannak Meas",
    relation: "Colleague",
    message: "សូមជូនពរឱ្យចំណងដៃអាពាហ៍ពិពាហ៍នេះ ជួបតែសុភមង្គល សុខភាពល្អបរិបូរណ៍ និងទទួលបានកូនប្រុសស្រីឆ្លាតវៃជាទីស្រឡាញ់!",
    timestamp: "Yesterday",
    likes: 9
  },
  {
    id: "wish-4",
    senderName: "Kimleng & Family",
    relation: "Friend",
    message: "Congratulations on tying the knot! You two make the most beautiful couple. Can't wait to celebrate with you at Sen Sok!",
    timestamp: "2 days ago",
    likes: 14
  }
];
