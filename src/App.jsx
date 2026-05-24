import { useState, useEffect } from "react"
import WordCard from "./components/WordCard"
import Header from "./components/Header"
import Stats from "./components/Stats"
import SearchBox from "./components/SearchBox"
import QuizBox from "./components/QuizBox"
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
  if (word.trim() === "") return

  setIsLoading(true)

  try {
    const response = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ word })
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error)
      console.log("API ERROR:", data)
      setIsLoading(false)
      return
    }

    const newWord = {
      word: data.word,
      meaning: data.meaning,
      arabic: data.arabic,
      pronunciation: data.pronunciation,
      example: data.example,
      memoryTrick: data.memoryTrick,
      wordFamily: Array.isArray(data.wordFamily) ? data.wordFamily : [],
      visualMemory: data.visualMemory,
      score: 0
    }

    setWords([...words, newWord])
    setWord("")
  } catch (error) {
    console.log("FRONTEND ERROR:", error)
    alert(error.message)
  }

  setIsLoading(false)
}

  function deleteWord(wordToDelete) {
    const filteredWords = words.filter((item) => item.word !== wordToDelete)
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
    if (!quizWord) return

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
  const masteredWords = words.filter((item) => item.score >= 3).length
  const weakWords = words.filter((item) => item.score === 0).length

  const masteryPercentage =
    totalWords === 0 ? 0 : Math.round((masteredWords / totalWords) * 100)

  const displayedWords = showWeakOnly
    ? words.filter((item) => item.score === 0)
    : words

  return (
    <div className="app">
      <Header />

      <Stats
        totalWords={totalWords}
        masteredWords={masteredWords}
        weakWords={weakWords}
        masteryPercentage={masteryPercentage}
        showWeakOnly={showWeakOnly}
        setShowWeakOnly={setShowWeakOnly}
      />

      <SearchBox
        word={word}
        setWord={setWord}
        addWord={addWord}
        isLoading={isLoading}
      />

      <QuizBox
        quizWord={quizWord}
        quizAnswer={quizAnswer}
        setQuizAnswer={setQuizAnswer}
        quizResult={quizResult}
        startQuiz={startQuiz}
        checkAnswer={checkAnswer}
      />

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