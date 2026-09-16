
import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Verity server is working!");
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await client.responses.create({
      model: "gpt-5",
      input: question
    });

    res.json({
      answer: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "API error" });
  }
});

const port = process.env.PORT || 10000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Verity server running on port ${port}`);
});
