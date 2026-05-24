export function calculateMastery(words) {
  if (words.length === 0) return 0

  const mastered = words.filter(word => word.mastery >= 3)

  return Math.round((mastered.length / words.length) * 100)
}

export function getWeakWords(words) {
  return words.filter(word => word.mastery < 2)
}