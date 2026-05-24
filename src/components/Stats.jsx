function Stats({ totalWords, masteredWords, weakWords, masteryPercentage, showWeakOnly, setShowWeakOnly }) {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Words</p>
          <h2>{totalWords}</h2>
        </div>

        <div className="stat-card">
          <p>Weak Words</p>
          <h2>{weakWords}</h2>
        </div>

        <div className="stat-card">
          <p>Mastered</p>
          <h2>{masteredWords}</h2>
        </div>

        <div className="stat-card">
          <p>Mastery</p>
          <h2>{masteryPercentage}%</h2>
        </div>
      </div>

      <button className="secondary-button" onClick={() => setShowWeakOnly(!showWeakOnly)}>
        {showWeakOnly ? "Show All Words" : "Show Weak Words"}
      </button>
    </section>
  )
}

export default Stats