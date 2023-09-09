import { useSearchParams } from "react-router-dom";
import TagFilterButton from "./TagFilterButton";

function TagFilter({ handleToggleTag, children }) {
  const [searchParams] = useSearchParams();
  const filterByTag = searchParams.get("tag") || "all";
  return (
    <div className="mb-8 mt-8 flex justify-between  ">
      {children}
      <p className="flex w-[35%] justify-between">
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
