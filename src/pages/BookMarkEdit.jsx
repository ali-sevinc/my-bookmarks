import { useParams } from "react-router-dom";
import { useBook } from "../components/bookmarks/useBook";
import BookmarkForm from "../components/bookmarks/BookmarkForm";
import Loader from "../components/ui/Loader";
import ErrorHandle from "../components/ui/ErrorHandle";

function BookMarkEdit() {
  const { bookId } = useParams();
  const { data, isLoading, error } = useBook(bookId);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorHandle>
        <p>Could not fetch book data</p>
      </ErrorHandle>
    );

  return <BookmarkForm formDatas={data} />;
}

export default BookMarkEdit;
