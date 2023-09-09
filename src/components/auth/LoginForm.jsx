import { useInput } from "../ui/useInput";
import { useLogin } from "./useLogin";
import { emailRegex, inputLengthValidation } from "../../helpers/fncs";

import InputGroup from "../ui/InputGroup";

function LoginForm() {
  const {
    value: email,
    handleSetValue: setEmailValue,
    handleSetTouched: setEmailTouched,
    enteredValueIsValid: enteredEmailIsValid,
    inputInvalid: emailIsInvalid,
  } = useInput((value) => emailRegex.test(value));
  const {
    value: password,
    handleSetValue: setPasswordValue,
    handleSetTouched: setPasswordTouched,
    enteredValueIsValid: enteredPasswordIsValid,
    inputInvalid: passwordIsInvalid,
  } = useInput((value) => inputLengthValidation(value, 5));

  const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;
  const { loginFnc } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!formIsValid) {
      setPasswordTouched();
      setEmailTouched();
      return;
    }
    const inputValues = {
      email,
      password,
    };
    loginFnc(inputValues);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-24 w-[80%] bg-stone-200 px-8 py-4"
    >
      <InputGroup
        value={email}
        setValue={setEmailValue}
        setTouched={setEmailTouched}
        inputIsInvalid={emailIsInvalid}
        id="email"
        label="E-mail"
        name="email"
        type="email"
        errorMessage="Please enter a valid e-mail."
      />
      <InputGroup
        value={password}
        setValue={setPasswordValue}
        setTouched={setPasswordTouched}
        inputIsInvalid={passwordIsInvalid}
        id="password"
        label="Password"
        name="password"
        type="password"
        errorMessage="Please enter a valid password at least 5 chars..."
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
