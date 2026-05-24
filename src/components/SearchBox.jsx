function SearchBox({ word, setWord, addWord, isLoading }) {
  return (
    <section className="search-box">
      <input
        type="text"
        placeholder="Enter a word..."
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />

      <button onClick={addWord} disabled={isLoading}>
        {isLoading ? "Explaining..." : "Save Word"}
      </button>
    </section>
  )
}

export default SearchBox