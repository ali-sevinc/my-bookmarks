function SearchForm({ setSearchValue, searchValue }) {
  return (
    <div>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        name="search"
        className="w-[15rem] rounded-sm bg-stone-200 px-2 py-1 text-stone-600"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchForm;
