import BookList from "../bookmarks/BookList";
import { motion, AnimatePresence } from "framer-motion";

function BookUL({ filteredData }) {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        initial={{ transition: { staggerChildren: 0.05 } }}
        className="flex max-h-[60vh] flex-col gap-4 overflow-scroll overflow-x-hidden border-b pb-4"
      >
        {filteredData.map((item) => (
          <BookList key={item.id} item={item} />
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}

export default BookUL;
