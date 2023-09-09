import { useState } from "react";
import { useLogin } from "./useLogin";

import InputGroup from "./InputGroup";

function LoginForm() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const { loginFnc } = useLogin();

  function handleChangeInputs(e) {
    setInputValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValues.email || !inputValues.password) return;
    loginFnc(inputValues);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-24 w-[80%] bg-stone-200 px-8 py-4"
    >
      <InputGroup
        value={inputValues.email}
        setValue={handleChangeInputs}
        id="email"
        label="E-mail"
        name="email"
        type="email"
      />
      <InputGroup
        value={inputValues.password}
        setValue={handleChangeInputs}
        id="password"
        label="Password"
        name="password"
        type="password"
      />
      <div className="mx-auto w-full px-6 text-end">
        <button className="border border-stone-600 bg-stone-500 px-4 py-2 text-xl font-bold text-stone-200 duration-200 hover:bg-stone-800">
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
