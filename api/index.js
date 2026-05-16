import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/tv-webhook", async (req, res) => {
  try {
    const tvData = req.body;
    console.log("TradingView alert received:", JSON.stringify(tvData, null, 2));

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Act as an expert crypto analyst. Analyze this TradingView signal: ${JSON.stringify(tvData)}. Should I long, short, or wait? Give a 2-sentence rationale.`,
        },
      ],
    });

    const response = message.content[0].text;
    console.log("Claude response:", response);

    res.status(200).json({ decision: response });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Vercel requires a named export for serverless functions
export default app;