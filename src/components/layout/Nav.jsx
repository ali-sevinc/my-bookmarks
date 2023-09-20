import { NavLink } from "react-router-dom";
import { useLoginContext } from "../../context/login-context";
import { useLogout } from "../auth/useLogout";

const linkStyles =
  " sm:text-2xl text-[#ddd] duration-200 hover:text-stone-500 hover:underline   ";

function Nav({ styles }) {
  const { logoutFnc } = useLogout();
  const { user, handleLogout } = useLoginContext();

  function handleLogoutSubmit(e) {
    e.preventDefault();
    logoutFnc();
    handleLogout();
  }

  return (
    <div className={`items-center justify-between   ${styles} `}>
      <nav className="flex w-[25rem] flex-col items-center justify-between sm:flex-row ">
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
            className="text-xl duration-200 hover:text-stone-500 hover:underline sm:text-3xl "
          >
            Login
          </NavLink>
        ) : (
          <form onSubmit={handleLogoutSubmit}>
            <button className="text-xl duration-200 hover:text-stone-500 hover:underline sm:text-3xl ">
              Logout
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default Nav;
