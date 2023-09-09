function Tooltip({ children, text }) {
  return (
    <div className="group relative inline-block duration-200">
      {children}
      <div className="absolute left-[50%] top-full z-10 hidden -translate-x-[50%] transform  rounded-md bg-[rgba(41,37,36,0.8)] px-2 py-1 text-xs text-stone-100 duration-200 group-hover:block">
        {text}
      </div>
    </div>
  );
}

export default Tooltip;
