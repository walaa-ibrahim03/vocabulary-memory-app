import { useState , useEffect } from "react"

import "./App.css"

import Header from "./components/Header"
import SearchBox from "./components/SearchBox"
import Stats from "./components/Stats"
import QuizBox from "./components/QuizBox"
import WordCard from "./components/WordCard"

import starterWords from "./data/starterWords"

import { explainWord } from "./services/api"

import {
  calculateMastery,
  getWeakWords
} from "./utils/helpers"

function App() {
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true"
})

  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark")
  } else {
    document.body.classList.remove("dark")
  }
  localStorage.setItem("darkMode", darkMode)
}, [darkMode])
  const [words, setWords] = useState(starterWords)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function addWord() {
    if (!input.trim()) return

    try {
      setLoading(true)

      const newWord = await explainWord(input)

      const formattedWord = {
        ...newWord,
        mastery: 0
      }

      setWords([formattedWord, ...words])

      setInput("")
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const mastery = calculateMastery(words)
  const weakWords = getWeakWords(words)

  return (
    <div className={darkMode ? "dark app" : "app"}>

      <Header />
      <button
      className="dark-mode-btn"
      onClick={() => setDarkMode(!darkMode)}
    >
     {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>

      <Stats
        totalWords={words.length}
        weakWords={weakWords.length}
        mastered={words.filter(word => word.mastery >= 3).length}
        mastery={mastery}
      />

      <SearchBox
        input={input}
        setInput={setInput}
        addWord={addWord}
        loading={loading}
      />

      <QuizBox />

      <div className="words-container">
        {words.map((word, index) => (
          <WordCard
            key={index}
            word={word}
          />
        ))}
      </div>

    </div>
  )
}

export default App