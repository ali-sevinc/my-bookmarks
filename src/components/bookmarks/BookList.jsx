import { Link } from "react-router-dom";

import { useToggleFav } from "./useToggleFav";
import { useDeleteBook } from "./useDeleteBook";
import { maxTextLenght } from "../../helpers/fncs";

import { motion } from "framer-motion";

import Loader from "../ui/Loader";
import ErrorHandle from "../ui/ErrorHandle";
import ListActions from "../ui/ListActions";
import Tooltip from "../ui/Tooltip";

function BookList({ item }) {
  const { deleteFnc, deleteError, deleteLoading } = useDeleteBook();
  const { title, url, id, favorite } = item;
  const { toggleFav } = useToggleFav(id);

  const smalledURL = maxTextLenght(url, 18);

  function handleDelete() {
    const proceed = window.confirm(
      "Are you sure? This action cannot be undone",
    );
    if (proceed) {
      deleteFnc(id);
    }
  }

  function toggleSubmitHandler(e) {
    e.preventDefault();
    if (favorite) {
      toggleFav({ favorite: false });
    } else {
      toggleFav({ favorite: true });
    }
  }

  if (deleteLoading) return <Loader />;
  if (deleteError)
    return (
      <ErrorHandle>
        <p>Could not deleted</p>
      </ErrorHandle>
    );

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="relative flex w-full items-center justify-start  gap-4 border border-x-0 border-b-0 border-t-stone-100 py-2 pl-0 pr-14 text-xl"
    >
      <h3 className="hidden w-[20%] sm:block">{title}</h3>
      <Link
        to={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-[30%] hover:text-stone-500 "
      >
        <Tooltip text={url}>{smalledURL}</Tooltip>
      </Link>
      <ListActions
        favorite={favorite}
        handleDelete={handleDelete}
        toggleSubmitHandler={toggleSubmitHandler}
        id={id}
      />
    </motion.li>
  );
}

export default BookList;
