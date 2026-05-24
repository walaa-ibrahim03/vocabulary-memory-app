function SearchBox({
  input,
  setInput,
  addWord,
  loading
}) {
  return (
    <div className="search-box">

      <input
        type="text"
        placeholder="Enter a word..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addWord}>
        {loading ? "Explaining..." : "Explain"}
      </button>

    </div>
  )
}

export default SearchBox