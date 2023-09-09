import { useEffect, useState } from "react";

import { useBooks } from "./useBooks";
import { useLoginContext } from "../../context/login-context";

import Loader from "../ui/Loader";
import BookList from "./BookList";
import ErrorHandle from "../ui/ErrorHandle";

const tagStyle = "hover:cursor-pointer hover:text-stone-500 hover:underline ";

function Books() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("all");
  const [favorites, setFavorites] = useState("all");
  const { user } = useLoginContext();

  const { data, isLoading, error } = useBooks();

  useEffect(
    function () {
      setList(data ? data : []);
    },
    [data],
  );

  function handleShowFavorites(event) {
    setFavorites(event);
    setList(
      data.filter((item) =>
        tags !== "all"
          ? item.tag === tags && item.favorite === true
          : item.favorite === true,
      ),
    );
  }

  function handleShowAll(event) {
    setFavorites(event);
    setList(data.filter((item) => (tags === "all" ? item : item.tag === tags)));
  }

  function handleToggleTag(tag) {
    setTags(tag);
    if (tag === "all")
      return setList(
        data.filter((item) =>
          favorites === "favorite" ? item.favorite === true : item,
        ),
      );
    setSearch("");
    setList(
      data.filter((item) =>
        favorites === "all"
          ? item.tag === tag
          : item.tag === tag && item.favorite === true,
      ),
    );
  }

  function handleSearch(event) {
    if (event === "") return setList(data);

    setList(
      data.filter(
        (item) =>
          item.url.includes(event.toLowerCase()) ||
          item.description.toLowerCase().includes(event.toLowerCase()) ||
          item.title.toLowerCase().includes(event.toLowerCase()),
      ),
    );
  }

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorHandle>
        <p>Fethich book data failed. Please try later again!</p>
      </ErrorHandle>
    );

  return (
    <section>
      <h2 className=" text-center text-2xl">List of bookmarks</h2>
      <div className="mt-8 flex justify-between">
        <input
          value={search}
          className="w-[15rem] rounded-sm px-2 py-1 text-stone-600"
          onChange={(e) => {
            handleSearch(e.target.value);
            setSearch(e.target.value);
          }}
          placeholder="Search..."
        />
        <p className="flex w-[35%] justify-between">
          <span
            onClick={() => handleToggleTag("all")}
            className={`${tagStyle}  ${tags === "all" ? "text-stone-500" : ""}`}
          >
            All
          </span>
          <span
            onClick={() => handleToggleTag("fun")}
            className={`${tagStyle}  ${tags === "fun" ? "text-stone-500" : ""}`}
          >
            Fun
          </span>
          <span
            onClick={() => handleToggleTag("education")}
            className={`${tagStyle}  ${
              tags === "education" ? "text-stone-500" : ""
            }`}
          >
            Education
          </span>
          <span
            onClick={() => handleToggleTag("social")}
            className={`${tagStyle}  ${
              tags === "social" ? "text-stone-500" : ""
            }`}
          >
            Social
          </span>
        </p>
      </div>
      <div className="mb-4 mt-12 flex w-full justify-between text-center text-2xl">
        <button
          onClick={() => handleShowAll("all")}
          className={`mr-1 w-[50%] border-b  border-b-stone-200 duration-200 hover:text-stone-400 ${
            favorites === "all" && "bg-stone-500"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleShowFavorites("favorite")}
          className={`ml-1 w-[50%] border-b  border-b-stone-200 duration-200 hover:text-stone-400 ${
            favorites === "favorite" && "bg-stone-500"
          }`}
        >
          Favorites
        </button>
      </div>
      <div className=" flex  justify-between  ">
        <p className="flex w-full ">
          <span className="w-[20%]">Title</span>
          <span className="ml-7">URL</span>
        </p>
        <p className={`w-[55%] ${user ? "pr-2" : "pr-4"} text-right`}>
          {user && <span>Favorite / Details / Delete </span>}
          {!user && <span> Details</span>}
        </p>
      </div>
      <ul className="flex max-h-[60vh] flex-col gap-4 overflow-scroll overflow-x-hidden border-b pb-4">
        {list.map((item) => (
          <BookList
            toggleFavorite={setFavorites}
            toggleTag={setTags}
            key={item.id}
            item={item}
          />
        ))}
      </ul>
    </section>
  );
}

export default Books;
