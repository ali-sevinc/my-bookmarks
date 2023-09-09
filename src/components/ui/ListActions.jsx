import { Link } from "react-router-dom";
import { useLoginContext } from "../../context/login-context";

function ListActions({ id, toggleSubmitHandler, favorite, handleDelete }) {
  const { user } = useLoginContext();
  return (
    <>
      <Link
        to={`/bookmarks/${id}`}
        className={`bg absolute ${
          user ? "right-16" : "right-4"
        } top-2 h-[30px] w-[44px] rounded-full border-none bg-stone-100  px-[8px] pb-1 pt-0 font-bold text-stone-600 duration-200 hover:bg-stone-600 hover:text-stone-200 `}
      >
        🔍
      </Link>
      {user && (
        <>
          <form onSubmit={toggleSubmitHandler}>
            <button className="bg absolute right-32 top-2 h-[30px] w-[44px] rounded-full  border-none   pb-1 pt-0 font-bold duration-200 hover:scale-125 ">
              <span className={`${favorite ? "text-yellow-500" : ""}`}>
                {favorite ? "★" : "☆"}
              </span>
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="bg absolute right-1 top-2 h-[30px] w-[44px] rounded-full  border-none bg-red-500 px-[8px] pb-1 pt-0 font-bold duration-200 hover:bg-red-800 "
          >
            &times;
          </button>
        </>
      )}
    </>
  );
}

export default ListActions;
