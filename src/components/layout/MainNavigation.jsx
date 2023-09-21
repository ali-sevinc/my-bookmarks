import { useCallback, useEffect, useState } from "react";
import Hamburger from "../ui/Hamburger";
import Nav from "./Nav";
import HamburgerModal from "../ui/HamburgerModal";

function MainNavigation() {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  function handleShowBurger() {
    setBurgerMenu(true);
  }
  function handleCloseBurger() {
    setBurgerMenu(false);
  }

  const handleResize = useCallback(function handleResize() {
    setWindowWith(window.innerWidth);
  }, []);

  useEffect(
    function () {
      window.addEventListener("resize", handleResize);
      if (windowWith >= 640) {
        setBurgerMenu(false);
      }
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    [handleResize, windowWith],
  );

  return (
    <>
      <header className="mx-12 mt-8 border-b border-b-stone-600 pb-4 ">
        {burgerMenu && (
          <HamburgerModal onClose={handleCloseBurger}>
            <Nav onCLoseModal={handleCloseBurger} styles="flex flex-col px-4" />
          </HamburgerModal>
        )}
        <Nav onCLoseModal={() => {}} styles="sm:flex hidden" />
        {!burgerMenu && <Hamburger onClick={handleShowBurger} />}
      </header>
    </>
  );
}

export default MainNavigation;
