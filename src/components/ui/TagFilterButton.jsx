const tagStyle =
  "hover:cursor-pointer hover:text-stone-500 py-0 px-2 rounded-sm hover:underline disabled:cursor-not-allowed disabled:hover:no-underline disabled:hover:text-stone-200 ";
function TagFilterButton({ filterByTag, onClick, value, children }) {
  return (
    <button
      disabled={filterByTag === value}
      onClick={() => onClick(value)}
      className={`${tagStyle}  ${
        filterByTag === value ? "bg-stone-500 text-stone-200 " : ""
      }`}
    >
      {children}
    </button>
  );
}

export default TagFilterButton;
