import Tooltip from "./Tooltip";

function ToggleFav({ toggleSubmitHandler, favorite }) {
  return (
    <form onSubmit={toggleSubmitHandler}>
      <Tooltip text={favorite ? "unfavorite" : "favorite"}>
        <button className={`${favorite ? "text-yellow-500" : ""}`}>
          {favorite ? "★" : "☆"}
        </button>
      </Tooltip>
    </form>
  );
}

export default ToggleFav;
