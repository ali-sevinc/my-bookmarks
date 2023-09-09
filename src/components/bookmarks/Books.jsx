import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useBooks } from "./useBooks";

import Loader from "../ui/Loader";
import ErrorHandle from "../ui/ErrorHandle";
import TagFilter from "../ui/TagFilter";
import StatusFilter from "../ui/StatusFilter";
import SearchForm from "../ui/SearchForm";
import ListDescriptions from "../ui/ListDescriptions";
import BookUL from "../ui/BookUL";
import { AnimatePresence } from "framer-motion";

let filteredData = [];
function Books() {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleToggleStatus(event) {
    searchParams.set("favorite", event);
    setSearchParams(searchParams);
  }

  function handleToggleTag(tag) {
    searchParams.set("tag", tag);
    setSearchParams(searchParams);
  }

  //Client side search!
  if (!searchValue) filteredData = data;
  function handleSearch(value) {
    setSearchValue(value);
    filteredData = data.filter(
      (item) =>
        item.url.includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.title.toLowerCase().includes(value.toLowerCase()),
    );
  }

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorHandle>
        <p>Fethich bookmarks data failed. Please try later again!</p>
      </ErrorHandle>
    );

  return (
    <AnimatePresence mode="wait">
      <section>
        <h2 className=" text-center text-2xl">🔻List of Bookmarks🔻</h2>
        <TagFilter handleToggleTag={handleToggleTag}>
          <SearchForm setSearchValue={handleSearch} searchValue={searchValue} />
        </TagFilter>
        <StatusFilter handleToggleStatus={handleToggleStatus} />
        <ListDescriptions />
        {!filteredData.length && (
          <h2 className="mt-10 text-center text-2xl text-stone-200  ">
            No bookmarks found.
          </h2>
        )}
        {filteredData.length > 0 && <BookUL filteredData={filteredData} />}
      </section>
    </AnimatePresence>
  );
}

export default Books;
