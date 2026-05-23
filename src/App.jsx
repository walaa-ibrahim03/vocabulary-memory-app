import { useState, useEffect } from "react"
import WordCard from "./components/WordCard"
import "./App.css"

function App() {
  const [word, setWord] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showWeakOnly, setShowWeakOnly] = useState(false)

  const [quizWord, setQuizWord] = useState(null)
  const [quizAnswer, setQuizAnswer] = useState("")
  const [quizResult, setQuizResult] = useState("")

  const [words, setWords] = useState(() => {
    const savedWords = localStorage.getItem("words")
    return savedWords ? JSON.parse(savedWords) : []
  })

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words))
  }, [words])

  async function addWord() {
    if (word.trim() === "") {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      )

      const data = await response.json()

      const firstResult = data[0]
      const firstMeaning = firstResult.meanings[0]
      const firstDefinition = firstMeaning.definitions[0]

      const translationResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${firstDefinition.definition}&langpair=en|ar`
      )

      const translationData = await translationResponse.json()

      const arabicMeaning =
        translationData.responseData.translatedText || "Arabic meaning not found"

      const newWord = {
        word: firstResult.word,
        meaning: firstDefinition.definition,
        arabic: arabicMeaning,
        pronunciation: firstResult.phonetic || "No phonetic found",
        example: firstDefinition.example || "No example found",
        memoryTrick: `Imagine the word "${firstResult.word}" as a picture in your mind. Connect it to the meaning: ${firstDefinition.definition}`,
        wordFamily: [
          firstResult.word,
          `${firstResult.word}s`,
          `${firstResult.word}ing`,
          `${firstResult.word}ed`
        ],
        score: 0
      }

      setWords([...words, newWord])
      setWord("")
    } catch (error) {
      alert("Word not found or API error")
    }

    setIsLoading(false)
  }

  function deleteWord(wordToDelete) {
    const filteredWords = words.filter((item) => {
      return item.word !== wordToDelete
    })

    setWords(filteredWords)
  }

  function updateScore(wordToUpdate, newScore) {
    const updatedWords = words.map((item) => {
      if (item.word === wordToUpdate) {
        return {
          ...item,
          score: newScore
        }
      }

      return item
    })

    setWords(updatedWords)
  }

  function startQuiz() {
    if (words.length === 0) {
      setQuizResult("Add words first")
      return
    }

    const randomIndex = Math.floor(Math.random() * words.length)
    setQuizWord(words[randomIndex])
    setQuizAnswer("")
    setQuizResult("")
  }

  function checkAnswer() {
    if (!quizWord) {
      return
    }

    const answer = quizAnswer.toLowerCase().trim()
    const correctMeaning = quizWord.meaning.toLowerCase()

    if (answer !== "" && correctMeaning.includes(answer)) {
      setQuizResult("Correct ✅")
      updateScore(quizWord.word, 3)
    } else {
      setQuizResult(`Try again ❌ Correct meaning: ${quizWord.meaning}`)
      updateScore(quizWord.word, 0)
    }
  }

  const totalWords = words.length

  const masteredWords = words.filter((item) => {
    return item.score >= 3
  }).length

  const weakWords = words.filter((item) => {
    return item.score === 0
  }).length

  const masteryPercentage =
    totalWords === 0
      ? 0
      : Math.round((masteredWords / totalWords) * 100)

  const displayedWords = showWeakOnly
    ? words.filter((item) => item.score === 0)
    : words

  return (
    <div className="app">
      <h1 className="title">
        Vocabulary Memory App
      </h1>

      <div className="stats-box">
        <button onClick={() => setShowWeakOnly(!showWeakOnly)}>
          {showWeakOnly ? "Show All Words" : "Show Weak Words"}
        </button>

        <p>Total Words: {totalWords}</p>
        <p>Mastered Words: {masteredWords}</p>
        <p>Weak Words: {weakWords}</p>
        <p>Mastery: {masteryPercentage}%</p>
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />

        <button onClick={addWord} disabled={isLoading}>
          {isLoading ? "Explaining..." : "Save Word"}
        </button>
      </div>

      <div className="quiz-box">
        <h2>Mini Quiz</h2>

        <button onClick={startQuiz}>
          Start Quiz
        </button>

        {quizWord && (
          <div>
            <h3>What does "{quizWord.word}" mean?</h3>

            <input
              type="text"
              placeholder="Write the meaning..."
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
            />

            <button onClick={checkAnswer}>
              Check Answer
            </button>
          </div>
        )}

        <p>{quizResult}</p>
      </div>

      <h2>Saved Words</h2>

      <div className="words-container">
        {displayedWords.map((item, index) => (
          <WordCard
            key={index}
            item={item}
            deleteWord={deleteWord}
            updateScore={updateScore}
          />
        ))}
      </div>
    </div>
  )
}

export default App