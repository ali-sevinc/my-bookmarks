import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
function Modal({ children, onClose }) {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 z-10 h-[100vh] w-full bg-[rgba(0,0,0,0.2)] backdrop-blur-sm "
      />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed left-[calc(50%-20rem)] top-40 z-20 mx-auto w-[40rem] bg-white "
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>,
    document.getElementById("modal-overlay"),
  );
}

export default Modal;
