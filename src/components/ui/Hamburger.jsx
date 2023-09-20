function Hamburger({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex h-4 w-6 cursor-pointer flex-col justify-between hover:scale-105 sm:hidden"
    >
      <div className="h-1 w-full rounded bg-stone-200 " />
      <div className="h-1 w-full rounded bg-stone-200 " />
      <div className="h-1 w-full rounded bg-stone-200 " />
    </div>
  );
}

export default Hamburger;
