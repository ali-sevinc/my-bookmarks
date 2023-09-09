function ErrorHandle({ children, title = "An Error Occured" }) {
  return (
    <div className="mx-auto mt-12 w-[60%] px-2 py-12 text-center text-2xl text-red-500">
      <h2 className="mb-12">{title}</h2>
      {children}
    </div>
  );
}

export default ErrorHandle;
