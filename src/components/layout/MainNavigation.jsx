import { NavLink } from "react-router-dom";
import { useLoginContext } from "../../context/login-context";
import { useLogout } from "../auth/useLogout";

const linkStyles =
  "text-2xl text-[#ddd] duration-200 hover:text-stone-500 hover:underline  ";

function MainNavigation() {
  const { logoutFnc } = useLogout();
  const { user, handleLogout } = useLoginContext();

  function handleLogoutSubmit(e) {
    e.preventDefault();
    logoutFnc();
    handleLogout();
  }

  return (
    <header className="mx-12 mt-8 flex  items-center justify-between border-b border-b-stone-600 pb-4 lg:mx-auto lg:w-[60%] ">
      <nav className="flex w-[25rem] justify-around">
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#78716c" : "",
            };
          }}
          to="/"
          className={linkStyles}
        >
          Home
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#78716c" : "",
            };
          }}
          to="/bookmarks"
          className={linkStyles}
          end
        >
          Bookmarks
        </NavLink>

        {user && (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "#78716c" : "",
              };
            }}
            to="/bookmarks/new"
            className={linkStyles}
          >
            New Bookmark
          </NavLink>
        )}
      </nav>
      <section>
        {!user ? (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "#78716c" : "",
              };
            }}
            to="/login"
            className="text-3xl duration-200 hover:text-stone-500 hover:underline "
          >
            Login
          </NavLink>
        ) : (
          <form onSubmit={handleLogoutSubmit}>
            <button className="text-3xl duration-200 hover:text-stone-500 hover:underline ">
              Logout
            </button>
          </form>
        )}
      </section>
    </header>
  );
}

export default MainNavigation;
