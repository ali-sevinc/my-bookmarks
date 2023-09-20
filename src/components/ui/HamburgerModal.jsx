import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
function HamburgerModal({ children, onClose }) {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 z-10 h-[100vh] w-full bg-[rgba(0,0,0,0.2)] backdrop-blur-sm "
      />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed left-0 top-0 z-20 w-full bg-stone-800 py-4  "
        >
          {children}
          <button
            onClick={onClose}
            className="absolute right-2 top-0 text-xl text-stone-200 hover:text-red-200"
          >
            &times;
          </button>
        </motion.div>
      </AnimatePresence>
    </>,
    document.getElementById("modal-overlay"),
  );
}

export default HamburgerModal;
