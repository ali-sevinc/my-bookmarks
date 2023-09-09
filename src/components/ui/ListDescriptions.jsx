import { useLoginContext } from "../../context/login-context";

function ListDescriptions() {
  const { user } = useLoginContext();
  return (
    <div className=" flex  justify-between  ">
      <p className="flex w-full ">
        <span className="w-[20%]">Title</span>
        <span className="ml-12">URL</span>
      </p>
      <p className={`w-[55%] ${user ? "pr-2" : "pr-4"} text-right`}>
        {user && <span>Favorite / Details / Delete </span>}
        {!user && <span> Details</span>}
      </p>
    </div>
  );
}

export default ListDescriptions;
