function WordCard({ item, deleteWord, updateScore }) {
  const isMastered = item.score >= 3
  const isWeak = item.score === 0

  function speakWord() {
    const speech = new SpeechSynthesisUtterance(item.word)
    speech.lang = "en-US"
    speech.rate = 0.8
    window.speechSynthesis.speak(speech)
  }

  return (
    <div className={`word-card ${isMastered ? "mastered" : ""} ${isWeak ? "weak" : ""}`}>
      <div className="word-card-header">
        <div>
          <h3>{item.word}</h3>
          <p className="pronunciation">{item.pronunciation}</p>

          <button className="sound-btn" onClick={speakWord}>
            🔊 Listen
          </button>
        </div>

        <span className="badge">
          {isMastered ? "🧠 Mastered" : "⚠️ Needs Practice"}
        </span>
      </div>

      <div className="word-section">
        <h4>Example</h4>
        <p>{item.example}</p>
      </div>

      <div className="word-section">
        <h4>Simple English Meaning</h4>
        <p>{item.meaning}</p>
      </div>

      <div className="word-section">
        <h4>Arabic Meaning</h4>
        <p>{item.arabic}</p>
      </div>

      <div className="word-section">
        <h4>Memory Trick</h4>
        <p>{item.memoryTrick}</p>
      </div>

      <div className="word-section">
        <h4>Word Family</h4>

        <div className="word-family">
          {item.wordFamily?.map((familyWord, index) => (
            <span key={index}>
              {familyWord}
            </span>
          ))}
        </div>
      </div>

      <div className="mastery-bar">
        <div
          className="mastery-fill"
          style={{ width: `${(item.score / 3) * 100}%` }}
        ></div>
      </div>

      <p className="score">Mastery Score: {item.score}/3</p>

      <div className="card-actions">
        <button onClick={() => updateScore(item.word, 0)}>
          I forgot
        </button>

        <button onClick={() => updateScore(item.word, 3)}>
          I know
        </button>

        <button className="delete-btn" onClick={() => deleteWord(item.word)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default WordCard