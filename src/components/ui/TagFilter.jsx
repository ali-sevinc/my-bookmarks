import { useSearchParams } from "react-router-dom";
import TagFilterButton from "./TagFilterButton";

function TagFilter({ handleToggleTag, children }) {
  const [searchParams] = useSearchParams();
  const filterByTag = searchParams.get("tag") || "all";
  return (
    <div className="my-8 flex flex-col  items-center justify-center gap-4 sm:flex-row sm:justify-between ">
      {children}
      <p className="flex justify-between sm:w-[35%]">
        <TagFilterButton
          filterByTag={filterByTag}
          value="all"
          onClick={handleToggleTag}
        >
          All
        </TagFilterButton>
        <TagFilterButton
          filterByTag={filterByTag}
          value="fun"
          onClick={handleToggleTag}
        >
          Fun
        </TagFilterButton>
        <TagFilterButton
          filterByTag={filterByTag}
          value="education"
          onClick={handleToggleTag}
        >
          Education
        </TagFilterButton>
        <TagFilterButton
          filterByTag={filterByTag}
          value="social"
          onClick={handleToggleTag}
        >
          Social
        </TagFilterButton>
      </p>
    </div>
  );
}

export default TagFilter;
