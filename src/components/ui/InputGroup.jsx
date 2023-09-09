function InputGroup({
  id,
  label,
  type,
  name,
  element,
  rows,
  value,
  setValue,
  setTouched,
  inputIsInvalid,
  errorMessage,
}) {
  let baseInputStyles =
    "rounded-sm border border-stone-600 px-2 py-[2px] text-xl tracking-wide text-stone-800 shadow-sm ";
  if (inputIsInvalid) baseInputStyles += " bg-red-200 border-red-500";

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <section className="mx-auto mb-4 flex w-[90%] flex-col ">
      <label htmlFor={id} className="text-xl font-bold text-stone-600 ">
        {label}
      </label>
      {!element && (
        <input
          onBlur={setTouched}
          onChange={handleChange}
          value={value}
          required
          id={id}
          name={name}
          type={type}
          className={baseInputStyles}
        />
      )}
      {element === "textarea" && (
        <textarea
          onBlur={setTouched}
          onChange={handleChange}
          value={value}
          required
          rows={rows}
          id={id}
          name={name}
          type={type}
          className={baseInputStyles}
        />
      )}
      {inputIsInvalid && (
        <p className="text-xs italic text-red-400">{errorMessage}</p>
      )}
    </section>
  );
}

export default InputGroup;
