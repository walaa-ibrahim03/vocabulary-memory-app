function WordCard({ word }) {

  function speakWord() {
    const utterance = new SpeechSynthesisUtterance(word.word)
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="word-card">

      <div className="word-top">

        <h2>{word.word}</h2>

        <button
          className="listen-btn"
          onClick={speakWord}
        >
          🔊 Listen
        </button>

      </div>

      <p>
        <strong>Meaning:</strong>
        {" "}
        {word.meaning}
      </p>

      <p>
        <strong>Arabic:</strong>
        {" "}
        {word.arabic}
      </p>

      <p>
        <strong>Pronunciation:</strong>
        {" "}
        {word.pronunciation}
      </p>

      <p>
        <strong>Memory Trick:</strong>
        {" "}
        {word.memoryTrick}
      </p>

      <p>
        <strong>Example:</strong>
        {" "}
        {word.example}
      </p>

      <p>
        <strong>Similar Words:</strong>
        {" "}
        {word.similarWords}
      </p>

      <p>
        <strong>Visual Memory:</strong>
        {" "}
        {word.visualMemory}
      </p>

      <div className="mastery-buttons">

        <button>
          I forgot
        </button>

        <button>
          I know
        </button>

      </div>

    </div>
  )
}

export default WordCard