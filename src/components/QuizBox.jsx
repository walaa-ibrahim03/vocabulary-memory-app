function QuizBox({
  quizWord,
  quizAnswer,
  setQuizAnswer,
  quizResult,
  startQuiz,
  checkAnswer
}) {
  return (
    <section className="quiz-box">
      <h2>Mini Quiz</h2>

      <button onClick={startQuiz}>Start Quiz</button>

      {quizWord && (
        <div>
          <h3>What does "{quizWord.word}" mean?</h3>

          <input
            type="text"
            placeholder="Write the meaning..."
            value={quizAnswer}
            onChange={(e) => setQuizAnswer(e.target.value)}
          />

          <button onClick={checkAnswer}>Check Answer</button>
        </div>
      )}

      <p>{quizResult}</p>
    </section>
  )
}

export default QuizBox