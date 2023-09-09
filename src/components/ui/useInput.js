import { useCallback, useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "input/setValue":
      return {
        ...state,
        value: action.payload,
      };
    case "input/setTouched":
      return {
        ...state,
        isTouched: true,
      };
    case "input/reset":
      return initialState;

    default:
      throw new Error("Unkown action...");
  }
}

export function useInput(validateFn) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { value, isTouched } = state;

  //checking user input value
  const enteredValueIsValid = validateFn(value);

  //if value is not valid and input is touched (onBlur)--> Invalid
  //if input is not touched (initially)-->Valid
  const inputInvalid = isTouched && !enteredValueIsValid;

  //we can now use use handleFunctions in useEffect!
  //why we use useEffect?--> newBookMark and editBookMark are use the same form. If there is a prop as formData, useEffect will autofill inputs with those data.
  const handleSetValue = useCallback(function (inputValue) {
    dispatch({ type: "input/setValue", payload: inputValue });
  }, []);
  const handleSetTouched = useCallback(function handleSetTouched() {
    dispatch({ type: "input/setTouched" });
  }, []);
  function handleReset() {
    dispatch({ type: "input/reset" });
  }

  return {
    value,
    handleSetTouched,
    handleSetValue,
    handleReset,
    inputInvalid,
    enteredValueIsValid,
  };
}
