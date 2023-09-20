import { useLoginContext } from "../../context/login-context";

function ListDescriptions() {
  const { user } = useLoginContext();
  return (
    <div className=" flex  justify-between  ">
      <p className="flex w-full ">
        <span className="hidden w-[20%] sm:inline-block">Title</span>
        <span className="ml-0 sm:ml-11">URL</span>
      </p>
      <p
        className={`w-[58%] ${
          user ? "pr-2" : "pr-4"
        } hidden text-right sm:block `}
      >
        {user && <span>Favorite / Details / Delete </span>}
        {!user && <span> Details</span>}
      </p>
      <p className={`w-[55%] ${user ? "pr-2" : "pr-4"}  text-right sm:hidden `}>
        Details
      </p>
    </div>
  );
}

export default ListDescriptions;
