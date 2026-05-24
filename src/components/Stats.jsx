function Stats({
  totalWords,
  weakWords,
  mastered,
  mastery
}) {
  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Words</h3>
        <p>{totalWords}</p>
      </div>

      <div className="stat-card">
        <h3>Weak Words</h3>
        <p>{weakWords}</p>
      </div>

      <div className="stat-card">
        <h3>Mastered</h3>
        <p>{mastered}</p>
      </div>

      <div className="stat-card">
        <h3>Mastery</h3>
        <p>{mastery}%</p>
      </div>

    </div>
  )
}

export default Stats