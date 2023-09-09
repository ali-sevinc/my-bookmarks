import { Link } from "react-router-dom";
import { useLoginContext } from "../../context/login-context";

const btnStyles =
  "text-xl text-stone-600 duration-200 hover:text-stone-800 hover:underline  ";
function DetailActions({ bookId, handleDelete }) {
  const { user } = useLoginContext();
  return (
    <div className="mx-auto mt-8 flex w-[80%] justify-center gap-8">
      <Link className={btnStyles} to="..">
        &larr;Back
      </Link>
      {user && (
        <>
          <button className={btnStyles} onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/bookmarks/${bookId}/edit`} className={btnStyles}>
            Edit
          </Link>
        </>
      )}
    </div>
  );
}

export default DetailActions;
