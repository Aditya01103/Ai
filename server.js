import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://web-gw-nih.my.id"
}));

app.use(express.json({ limit: "1mb" }));

const client = new OpenAI({
  baseURL: "https://router.bynara.id/v1",
  apiKey: process.env.NARAYA_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "AI backend",
    model: "agnes-2.5-flash"
  });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "message wajib berupa teks"
      });
    }

    const result = await client.chat.completions.create({
      model: "agnes-2.5-flash",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = result.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({
        error: "AI tidak mengembalikan jawaban"
      });
    }

    res.json({ reply });
  } catch (error) {
    console.error("AI request error:", error);

    res.status(500).json({
      error: "Gagal menghubungi AI"
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI backend running on port ${PORT}`);
});
