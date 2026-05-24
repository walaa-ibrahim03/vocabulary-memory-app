export async function explainWord(word) {
  const response = await fetch("/api/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ word })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to explain word")
  }

  return data
}