import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import multer from "multer";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import paletteRoutes from "./routes/paletteRoutes.js";
import instructionRoutes from "./routes/instructionRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Normalize env keys
const HF_TOKEN =
  process.env.HF_TOKEN ||
  process.env.REACT_APP_HF_KEY ||
  process.env.REACT_APP_HF_TOKEN;

const GEMINI_ENV_KEY =
  process.env.GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/palettes", paletteRoutes);
app.use("/api/instructions", instructionRoutes);

// File upload middleware
const upload = multer();

// ----------------------------
// GEMINI HELPER FUNCTION
// ----------------------------
async function callGemini(text, apiKey) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const body = {
    contents: [
      {
        parts: [{ text }],
      },
    ],
  };

  const res = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
  });

  return res.data;
}

// ----------------------------
// MULTIMODAL (IMAGE) FOR GEMINI
// ----------------------------
async function callGeminiWithImage(prompt, base64, mime, apiKey) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mime,
              data: base64,
            },
          },
        ],
      },
    ],
  };

  const res = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
  });

  return res.data;
}

// ----------------------------
// EXTRACT TEXT FROM AI RESPONSE
// ----------------------------
function extractTextFromAIResponse(obj) {
  if (!obj) return "";

  if (typeof obj === "string") return obj;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const t = extractTextFromAIResponse(item);
      if (t) return t;
    }
    return "";
  }

  if (typeof obj === "object") {
    if (obj.candidates) return extractTextFromAIResponse(obj.candidates);
    if (obj.output) return extractTextFromAIResponse(obj.output);
    if (obj.content) return extractTextFromAIResponse(obj.content);
    if (obj.parts) return extractTextFromAIResponse(obj.parts);
    if (obj.text) return obj.text;

    for (const k of Object.keys(obj)) {
      const t = extractTextFromAIResponse(obj[k]);
      if (t) return t;
    }
  }

  return "";
}

// ----------------------------
// PARSE AI → PALETTE JSON
// ----------------------------
function parseAITextToPalette(text) {
  if (!text || typeof text !== "string") return null;

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let paletteName = "AI Palette";
  const colors = [];
  let instructionLines = [];
  let mode = "colors";

  const colorRegex = /([A-Za-z0-9 _-]+)\s*[-:]\s*(#(?:[0-9A-Fa-f]{3,6}))/;

  for (let line of lines) {
    const nameMatch = line.match(/^(?:Palette Name|Name)[:\-]\s*(.+)$/i);
    if (nameMatch) {
      paletteName = nameMatch[1].trim();
      continue;
    }

    if (/^Instructions?[:\-]?/i.test(line)) {
      mode = "instructions";
      const rest = line.replace(/^Instructions?[:\-]?/i, "").trim();
      if (rest) instructionLines.push(rest);
      continue;
    }

    if (mode === "colors") {
      const m = line.match(colorRegex);
      if (m) {
        colors.push({
          name: m[1].trim(),
          color: m[2].trim(),
        });
        continue;
      }

      const hex = line.match(/(#(?:[0-9A-Fa-f]{3,6}))/);
      if (hex) {
        colors.push({
          name: `color-${colors.length + 1}`,
          color: hex[1],
        });
        continue;
      }
    }

    if (mode === "instructions") {
      instructionLines.push(line);
    }
  }

  const instructionHTML = instructionLines.length
    ? `<div>${instructionLines.map((l) => `<p>${l}</p>`).join("")}</div>`
    : `<p>No instructions provided.</p>`;

  return {
    palette: {
      paletteName,
      emoji: "",
      colors,
    },
    instruction: { html: instructionHTML },
  };
}

// ----------------------------
// MAIN AI ROUTE
// ----------------------------
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    const GEMINI_KEY =
      GEMINI_ENV_KEY || req.headers["x-goog-api-key"];

    const body = req.body || {};
    const prompt = (body.prompt || "").trim();

    // ----------------------------------
    // PROMPT MODE
    // ----------------------------------
    if (prompt && !req.file) {
      if (!GEMINI_KEY)
        return res.status(400).json({
          error: "GEMINI_API_KEY is missing in .env",
        });

      const gRes = await callGemini(prompt, GEMINI_KEY);
      const text = extractTextFromAIResponse(gRes);
      const parsed = parseAITextToPalette(text);

      return res.json(parsed);
    }

    // ----------------------------------
    // IMAGE MODE
    // ----------------------------------
    if (req.file) {
      if (!GEMINI_KEY)
        return res.status(400).json({
          error: "GEMINI_API_KEY missing for image extraction",
        });

      const base64 = req.file.buffer.toString("base64");
      const mime = req.file.mimetype;

      const gRes = await callGeminiWithImage(
        "Extract dominant colors and palette name from this image.",
        base64,
        mime,
        GEMINI_KEY
      );

      const text = extractTextFromAIResponse(gRes);
      const parsed = parseAITextToPalette(text);

      return res.json(parsed);
    }

    return res.status(400).json({
      error: "No prompt or image provided",
    });
  } catch (err) {
    console.error("AI GENERATE ERROR:", err);
    res.status(500).json({
      error: "AI generation failed",
      details: err.message,
    });
  }
});

// ----------------------------
app.listen(process.env.PORT, () =>
  console.log(`Server running on PORT ${process.env.PORT}`)
);
