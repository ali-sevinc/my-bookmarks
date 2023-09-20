import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useBook } from "./useBook";
import { useDeleteBook } from "./useDeleteBook";
import { useLoginContext } from "../../context/login-context";
import { useToggleFav } from "./useToggleFav";

import Loader from "../ui/Loader";
import ErrorHandle from "../ui/ErrorHandle";
import ToggleFav from "../ui/ToggleFav";
import DetailActions from "../ui/DetailActions";

function BookDetails() {
  const { bookId } = useParams();
  const { data, isLoading, error } = useBook(bookId);
  const { deleteFnc, deleteError, deleteLoading } = useDeleteBook();
  const { user } = useLoginContext();
  const navigate = useNavigate();

  const { toggleFav } = useToggleFav(bookId);

  function handleDelete() {
    const proceed = window.confirm(
      "Are you sure? This action cannot be undone",
    );
    if (proceed) {
      deleteFnc(bookId);
      navigate("/bookmarks");
    }
  }

  if (isLoading || deleteLoading) return <Loader />;
  if (error || deleteError)
    return (
      <ErrorHandle>
        <p>{error && error}</p>
        <p>{deleteError && deleteError}</p>
      </ErrorHandle>
    );

  const { description, tag, title, url, favorite } = data;
  function toggleSubmitHandler(e) {
    e.preventDefault();
    if (favorite) {
      toggleFav({ favorite: false });
    } else {
      toggleFav({ favorite: true });
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="mx-auto mt-24 flex max-w-[40rem] flex-col bg-stone-100 pb-8 text-stone-600 "
      >
        <h2 className="mb-0 flex items-center justify-center gap-4 bg-stone-300 py-2 text-center  text-3xl font-bold">
          {title}
          {user && (
            <ToggleFav
              toggleSubmitHandler={toggleSubmitHandler}
              favorite={favorite}
            />
          )}
        </h2>
        <span className="mb-8 border  border-stone-200 bg-stone-200 py-1 text-center text-sm font-bold italic">
          {tag}
        </span>
        <Link
          to={url}
          target="_blank"
          rel="noopener noreferrer"
          className=" text-center text-xl duration-200 hover:text-stone-800 hover:underline"
        >
          {url}
        </Link>
        <div className="mx-auto mt-4 w-[80%] border border-stone-500 px-4 py-2 ">
          <h3 className="border-b border-b-stone-500 font-bold ">
            Description
          </h3>
          <p>{description}</p>
        </div>
        <DetailActions bookId={bookId} handleDelete={handleDelete} />
      </motion.section>
    </AnimatePresence>
  );
}

export default BookDetails;
