import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import { generateScenario, evaluateDecision } from "./lib/ai.js";

import express from 'express';
import cors from 'cors'; // <--- ADD THIS LINE
const app = express();

app.use(cors()); // <--- ADD THIS LINE to enable CORS


const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/scenario", async (req, res) => {
  try {
    const scenario = await generateScenario(req.body);
    res.json(scenario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate scenario" });
  }
});

app.post("/api/evaluate", async (req, res) => {
  try {
    const evaluation = await evaluateDecision(req.body);
    res.json(evaluation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to evaluate decision" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});