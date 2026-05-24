function WordCard({ item, deleteWord, updateScore }) {
  function speakWord() {
    const speech = new SpeechSynthesisUtterance(item.word)
    speech.lang = "en-US"
    window.speechSynthesis.speak(speech)
  }

  return (
    <div className="word-card">
      <div className="word-header">
        <div>
          <h2>{item.word}</h2>
          <p className="phonetic">{item.pronunciation}</p>
        </div>

        <button className="listen-btn" onClick={speakWord}>
          🔊 Listen
        </button>
      </div>

      <div className="badge">
        {item.score >= 3 ? "✅ Mastered" : "⚠️ Needs Practice"}
      </div>

      <div className="word-section">
        <h3>Example</h3>
        <p>{item.example}</p>
      </div>

      <div className="word-section">
        <h3>Simple English Meaning</h3>
        <p>{item.meaning}</p>
      </div>

      <div className="word-section">
        <h3>Arabic Meaning</h3>
        <p>{item.arabic}</p>
      </div>

      <div className="word-section">
        <h3>Memory Trick</h3>
        <p>{item.memoryTrick}</p>
      </div>

      <div className="word-section">
        <h3>Word Family</h3>
        <div className="family-tags">
          {item.wordFamily.map((word, index) => (
            <span key={index} className="tag">
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="score-box">
        Mastery Score: {item.score}/3
      </div>

      <div className="card-buttons">
        <button onClick={() => updateScore(item.word, 0)}>
          I forgot
        </button>

        <button onClick={() => updateScore(item.word, 3)}>
          I know
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteWord(item.word)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default WordCard