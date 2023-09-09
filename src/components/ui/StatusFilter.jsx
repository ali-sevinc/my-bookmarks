import { useSearchParams } from "react-router-dom";

const btnStyle =
  "ml-1 w-[50%] border-b  border-b-stone-200 duration-200 hover:text-stone-400 disabled:cursor-not-allowed disabled:hover:text-stone-200 ";

function StatusFilter({ handleToggleStatus }) {
  const [searchParams] = useSearchParams();
  const sortByStatus = searchParams.get("favorite") || "all";
  return (
    <div className="mb-4 mt-12 flex w-full justify-between text-center text-2xl">
      <button
        disabled={sortByStatus === "all"}
        onClick={() => handleToggleStatus("all")}
        className={`${btnStyle} ${sortByStatus === "all" && "bg-stone-500"}`}
      >
        All
      </button>
      <button
        disabled={sortByStatus !== "all"}
        onClick={() => handleToggleStatus(true)}
        className={`${btnStyle} ${sortByStatus !== "all" && "bg-stone-500"}`}
      >
        Favorites
      </button>
    </div>
  );
}

export default StatusFilter;
