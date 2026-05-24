export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" })
  }

  const { word } = request.body

  if (!word || word.trim() === "") {
    return response.status(400).json({ error: "Word is required" })
  }

  try {
    console.log("KEY:", process.env.OPENAI_API_KEY)

    if (!process.env.OPENAI_API_KEY) {
      return response.status(500).json({
        error: "OPENAI_API_KEY is missing. Check your .env.local file."
      })
    }

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
You are an English vocabulary tutor for Arabic-speaking learners.

Explain this word: "${word}"

Return ONLY valid JSON. No markdown. No extra text.

Use this exact structure:
{
  "word": "${word}",
  "meaning": "simple English meaning",
  "arabic": "Arabic meaning",
  "pronunciation": "easy pronunciation",
  "memoryTrick": "memory trick using Arabic learner logic",
  "example": "short English sentence",
  "similarWords": "similar or confusing words",
  "wordFamily": ["word", "noun", "verb", "adjective"],
  "visualMemory": "describe a mental image to remember the word"
}
        `
      })
    })

    const data = await aiResponse.json()

    if (!aiResponse.ok) {
      return response.status(500).json({
        error: data.error?.message || "OpenAI API error"
      })
    }

    const text = data.output[0].content[0].text
    const result = JSON.parse(text)

    return response.status(200).json(result)
  } catch (error) {
    console.log("SERVER ERROR:", error)

    return response.status(500).json({
      error: error.message || "Failed to explain word"
    })
  }
}