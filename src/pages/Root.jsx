import { Outlet } from "react-router-dom";
import MainNavigation from "../components/layout/MainNavigation";
import { motion } from "framer-motion";

function Root() {
  return (
    <>
      <MainNavigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mx-auto my-8  w-[80%] max-w-[40rem]  "
      >
        <Outlet />
      </motion.main>
    </>
  );
}

export default Root;
