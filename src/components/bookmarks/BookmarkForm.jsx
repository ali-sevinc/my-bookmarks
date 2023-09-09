import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useNewBook } from "./useNewBook";
import { useEditBook } from "./useEditBook";
import { useInput } from "../ui/useInput";
import { inputLengthValidation, urlRegex } from "../../helpers/fncs";
import { useLoginContext } from "../../context/login-context";

import Modal from "../ui/Modal";
import InputGroup from "../ui/InputGroup";

function BookmarkForm({ formDatas }) {
  const {
    value: titleValue,
    handleSetValue: setTitleValue,
    handleSetTouched: setTitleTouched,
    inputInvalid: titleIsInvalid,
    enteredValueIsValid: enteredTitleIsValid,
  } = useInput((value) => inputLengthValidation(value, 3));

  const {
    value: urlValue,
    handleSetValue: setUrlValue,
    handleSetTouched: setUrlTouched,
    inputInvalid: urlIsInvalid,
    enteredValueIsValid: enteredUrlIsValid,
  } = useInput((value) => urlRegex.test(value));

  const {
    value: descriptionValue,
    handleSetValue: setDescriptionValue,
    handleSetTouched: setDescriptionTouched,
    inputInvalid: descriptionIsInvalid,
    enteredValueIsValid: enteredDescriptionIsValid,
  } = useInput((value) => inputLengthValidation(value, 5));

  const [tags, setTags] = useState("fun");

  useEffect(
    function () {
      if (formDatas) {
        setTitleValue(formDatas.title);
        setUrlValue(formDatas.url);
        setDescriptionValue(formDatas.description);
        setTags(formDatas.tag);
      }
    },
    [formDatas, setTitleValue, setUrlValue, setDescriptionValue],
  );

  const formIsValid =
    enteredTitleIsValid && enteredUrlIsValid && enteredDescriptionIsValid;

  const navigate = useNavigate();
  const { createBook } = useNewBook();
  const { editBookFnc } = useEditBook();
  const { user } = useLoginContext();

  function handleCloseModal() {
    navigate("..");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formIsValid) {
      setDescriptionTouched();
      setTitleTouched();
      setUrlTouched();
      return;
    }
    const inputValues = {
      title: titleValue,
      url: urlValue,
      description: descriptionValue,
      tag: tags,
    };

    if (formDatas) {
      editBookFnc(inputValues);
    } else {
      createBook(inputValues);
    }
  }

  useEffect(
    function () {
      if (!user) return navigate("/login");
    },
    [user, navigate],
  );

  return (
    <Modal onClose={handleCloseModal}>
      <form onSubmit={handleSubmit} className="w-full ">
        <h2 className="my-4 text-center text-2xl font-bold text-stone-600">
          {formDatas ? "Edit Mark" : "New Mark"}
        </h2>
        <InputGroup
          value={titleValue}
          setValue={setTitleValue}
          inputIsInvalid={titleIsInvalid}
          setTouched={setTitleTouched}
          label="Title"
          id="title"
          type="text"
          name="title"
          errorMessage="Please enter a valid title at least 3 chars..."
        />
        <InputGroup
          value={urlValue}
          setValue={setUrlValue}
          inputIsInvalid={urlIsInvalid}
          setTouched={setUrlTouched}
          label="URL"
          id="url"
          type="url"
          name="url"
          errorMessage="Please enter a valid URL"
        />
        <InputGroup
          value={descriptionValue}
          setValue={setDescriptionValue}
          inputIsInvalid={descriptionIsInvalid}
          setTouched={setDescriptionTouched}
          label="Description"
          id="description"
          type="text"
          element="textarea"
          name="description"
          rows="2"
          errorMessage="Pelease enter a description..."
        />
        <section className=" mx-auto mb-8 flex w-[90%]  gap-8 text-xl font-bold text-stone-600">
          <label htmlFor="tags">Select the book tag: </label>
          <select
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            name="tag"
            id="tags"
            className="cursor-pointer rounded-sm border border-stone-500"
          >
            <option value="fun">Fun</option>
            <option value="education">Education</option>
            <option value="social">Social</option>
          </select>
        </section>
        <section className="mx-auto my-4 flex w-[90%] items-center justify-end gap-8">
          <Link
            to={-1}
            className="font-bold text-stone-500 duration-200 hover:text-stone-800 "
          >
            Cancel
          </Link>
          <button className="border border-stone-800 bg-stone-500 px-8 py-2 font-bold text-stone-100 duration-200 hover:bg-stone-800 disabled:cursor-not-allowed  ">
            {formDatas ? "Update" : "Add"}
          </button>
        </section>
      </form>
    </Modal>
  );
}

export default BookmarkForm;
