export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" })
  }

  const { word } = request.body

  if (!word) {
    return response.status(400).json({ error: "Word is required" })
  }

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `
Explain this English vocabulary word for an Arabic-speaking learner.

Word: ${word}

Return ONLY valid JSON with this structure:
{
  "word": "",
  "meaning": "",
  "arabic": "",
  "pronunciation": "",
  "memoryTrick": "",
  "example": "",
  "similarWords": "",
  "wordFamily": "",
  "visualMemory": ""
}
        `
      })
    })

    const data = await aiResponse.json()
    const text = data.output_text

    return response.status(200).json(JSON.parse(text))
  } catch (error) {
    return response.status(500).json({
      error: "Failed to explain word"
    })
  }
}