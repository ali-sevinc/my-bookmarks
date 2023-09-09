import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useNewBook } from "./useNewBook";
import { useEditBook } from "./useEditBook";
import { useLoginContext } from "../context/login-context";

import Modal from "./Modal";
import InputGroup from "./InputGroup";

function BookmarkForm({ formDatas }) {
  const navigate = useNavigate();
  const { createBook } = useNewBook();
  const { editBookFnc } = useEditBook();
  const { user } = useLoginContext();

  const [inputValues, setInputValues] = useState({
    title: formDatas ? formDatas.title : "",
    url: formDatas ? formDatas.url : "",
    description: formDatas ? formDatas.description : "",
    tag: formDatas ? formDatas.tag : "fun",
  });

  function handleCloseModal() {
    navigate("..");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !inputValues.title.length ||
      !inputValues.url.length ||
      !inputValues.description.length
    )
      return;

    if (formDatas) {
      editBookFnc(inputValues);
    } else {
      createBook(inputValues);
    }
  }

  function handleInputChanges(event) {
    setInputValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
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
          value={inputValues.title}
          setValue={handleInputChanges}
          label="Title"
          id="title"
          type="text"
          name="title"
        />
        <InputGroup
          value={inputValues.url}
          setValue={handleInputChanges}
          label="URL"
          id="url"
          type="url"
          name="url"
        />
        <InputGroup
          value={inputValues.description}
          setValue={handleInputChanges}
          label="Description"
          id="description"
          type="text"
          element="textarea"
          name="description"
          rows="2"
        />
        <section className=" mx-auto mb-8 flex w-[90%]  gap-8 text-xl font-bold text-stone-600">
          <label htmlFor="tags">Select the book tag: </label>
          <select
            value={inputValues.tag}
            onChange={handleInputChanges}
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
            to=".."
            className="font-bold text-stone-500 duration-200 hover:text-stone-800 "
          >
            Cancel
          </Link>
          <button className="border border-stone-800 bg-stone-500 px-8 py-2 font-bold text-stone-100 duration-200 hover:bg-stone-800  ">
            {formDatas ? "Update" : "Add"}
          </button>
        </section>
      </form>
    </Modal>
  );
}

export default BookmarkForm;
