import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize GoogleGenAI client safely
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Wedding concierge Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, weddingContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const ai = getGenAI();
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const contextPrompt = `
You are the dedicated AI Wedding Concierge & Assistant for the wedding of ${weddingContext?.groomName || "Suyhong"} and ${weddingContext?.brideName || "Vinaya"}.
Your name is "Memento Assistant" (or ជំនួយការមង្គលការ Memento Assistant).
You are polite, warm, celebratory, respectful of Khmer cultural traditions, and eager to assist wedding guests.

Wedding Details:
- Couple: ${weddingContext?.groomName || "Suyhong"} & ${weddingContext?.brideName || "Vinaya"}
- Date: ${weddingContext?.weddingDate || "Saturday, March 15, 2025"}
- Venue: ${weddingContext?.venueName || "The Premier Centre Sen Sok (Grand Ballroom)"}, Phnom Penh, Cambodia
- Map / Directions: ${weddingContext?.locationAddress || "Sen Sok, Phnom Penh (near AEON Mall 2)"}
- Schedule:
  * 07:00 AM: Hae Chamnouk (Groom's Procession & Fruit Offerings / ក្បួនហែជំនូន)
  * 08:30 AM: Soat Mon & Kat Sork (Hair Cutting Ceremony & Monk Blessing / ពិធីកាត់សក់ & សូត្រមន្ត)
  * 10:30 AM: Ptem / Sen Preah Piphirun (Tying the Thread & Passing the Blessings / ពិធីចងដៃ)
  * 05:00 PM: Evening Welcome & Red Carpet Photo Session (ទទួលភ្ញៀវ & ថតរូបអនុស្សាវរីយ៍)
  * 06:30 PM: Grand Wedding Banquet Dinner, Toast & Music (ពិធីពិសាភោជនាហារ និងរាំកម្សាន្ត)
- Dress Code: Traditional Khmer silk/formal (Morning ceremonies); Elegant Evening Gown / Suit or formal attire with Gold, Emerald, or Rose Gold tones (Banquet).
- Gift Etiquette: In Cambodian tradition, congratulations are customary via wedding envelopes (Sambot Ka / សំបុត្រការ) or warm wishes in the guestbook.
- RSVP: Guests can RSVP directly in the invitation with their attendance and guest count.

Instructions:
1. Answer guest inquiries about schedule, location, parking, dress code, ceremony meanings, and RSVP clearly and courteously.
2. You understand both English and Khmer. Reply in the same language the guest used (Khmer or English).
3. If asked to write a wedding wish or blessing in Khmer, provide a culturally rich and auspicious blessing (e.g. សូមជូនពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ...).
4. Keep responses concise, warm, helpful, and formatted with clean paragraphs or bullet points where suitable.
`;

    // Attempt Gemini models with resilient fallback cascade for high demand (503)
    if (ai) {
      const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
      const chatHistory = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const contents = [
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: lastUserMessage }]
        }
      ];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: contextPrompt,
              temperature: 0.7,
            }
          });

          if (response.text) {
            return res.json({ reply: response.text });
          }
        } catch (modelError: any) {
          // Log concise warning and gracefully fall back to the next model or domain knowledge
          console.warn(`[AI] Model ${modelName} encountered temporary error: ${modelError?.message || modelError}`);
        }
      }
    }

    // High-quality fallback rule-based replies if API key is not set or experiencing high demand
    const query = lastUserMessage.toLowerCase();
    let fallbackReply = "";

    if (query.includes("time") || query.includes("schedule") || query.includes("when") || query.includes("ម៉ោង") || query.includes("កម្មវិធី")) {
      fallbackReply = `Here is the wedding ceremony schedule:
• 07:00 AM — Hae Chamnouk (Groom Procession / ក្បួនហែជំនូន)
• 08:30 AM — Kat Sork & Monk Blessing (ពិធីកាត់សក់ & សូត្រមន្ត)
• 10:30 AM — Ptem (Tying the Thread / ពិធីចងដៃ)
• 05:00 PM — Evening Reception & Photo Session (ទទួលភ្ញៀវ & ថតរូប)
• 06:30 PM — Grand Wedding Banquet Dinner & Toast!`;
    } else if (query.includes("where") || query.includes("location") || query.includes("venue") || query.includes("map") || query.includes("ទីតាំង") || query.includes("កន្លែង")) {
      fallbackReply = `The wedding is held at The Premier Centre Sen Sok (Grand Ballroom), located in Phnom Penh near AEON Mall 2. You can click "Open Google Maps" on the invitation to launch turn-by-turn navigation!`;
    } else if (query.includes("dress") || query.includes("wear") || query.includes("code") || query.includes("សម្លៀកបំពាក់")) {
      fallbackReply = `For morning ceremonies, traditional Khmer silk or smart formal attire is welcomed. For the evening gala, formal suits, cocktail dresses, or elegant evening gowns in tones of Gold, Rose Gold, Emerald, or Champagne look fantastic!`;
    } else if (query.includes("rsvp") || query.includes("attend") || query.includes("ចូលរួម")) {
      fallbackReply = `You can easily submit your RSVP by scrolling down to the RSVP section or tapping the "Wishes & RSVP" tab at the bottom. We would love to know if you can join us!`;
    } else if (query.includes("wish") || query.includes("blessing") || query.includes("ពរ")) {
      fallbackReply = `Here is a traditional Khmer blessing you can share in the guestbook:
"សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ បវរមហាប្រសើរ ជូនចំពោះគូស្វាមីភរិយាថ្មី សូមឱ្យស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង!"
(Wishing you both endless happiness, prosperity, love, and longevity together!)`;
    } else {
      fallbackReply = `Hello and warm greetings! I am Memento Assistant, the AI Wedding Concierge for Suyhong & Vinaya. You can ask me anything about the event schedule, venue location, parking, dress code guidelines, or how to RSVP. How may I assist you today?`;
    }

    return res.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      error: "Unable to generate response at this time. Please try again."
    });
  }
});

// Vite middleware or static serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
