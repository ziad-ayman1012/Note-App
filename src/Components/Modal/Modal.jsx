import { useFormik } from "formik";
import axios from "axios";
import * as yup from 'yup'

export default function Modal({
  setShowModal,
  setNotes,
  notes,
  values,
  isUpdating,
  setIsUpdating,
}) {
  console.log(values);

  async function callApi(modalInputs) {
    if (isUpdating === false) {
      try {
        const { data } = await axios.post(
          "https://note-sigma-black.vercel.app/api/v1/notes",
          modalInputs,
          {
            headers: {
              token: "3b8ny__" + localStorage.getItem("tkn"),
            },
          }
        );
        console.log(data);
        setShowModal(false);
        const newArr = structuredClone(notes);
        setNotes([...newArr, data.note]);
        // setNotes((prevState)=> [...prevState , data.note])
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.put(
          `https://note-sigma-black.vercel.app/api/v1/notes/${values.id}`,
          modalInputs,
          {
            headers: {
              token: "3b8ny__" + localStorage.getItem("tkn"),
            },
          }
        );
        console.log(data);
        setNotes((prevState) =>
          prevState.map((note) => (note._id === values.id ? data.note : note))
        );
        setShowModal(false);
        
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsUpdating(false);
      }
    }
  }
  const validateInputs = yup.object({
    title: yup.string().required("title is required!"),
    content: yup.string().required("content is required!"),
  });
  const modalForm = useFormik({
    initialValues: {
      title: isUpdating ? values.title : "",
      content: isUpdating ? values.content : "",
    },
    validationSchema: validateInputs,
    onSubmit: callApi,
  });
  function closeModal() {
    setShowModal(false);
    setIsUpdating(false)
  }
  return (
    <>
      <div className="bg-[rgba(0,0,0,0.7)]  h-screen absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="w-1/2 rounded-lg text-white  bg-gray-700">
          <form onSubmit={modalForm.handleSubmit} action="">
            <div className="text-3xl py-2 border-b-2 px-3 font-bold">
              {isUpdating ? <p>Update Note!</p> : <p>Add A New Note!</p>}
            </div>

            <div className="border-b-2">
              <div className="">
                <label htmlFor="title" className="ps-3 pe-1">
                  {" "}
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={modalForm.values.title}
                  onChange={modalForm.handleChange}
                  onBlur={modalForm.handleBlur}
                  className="w-[75%] rounded-lg mt-3 mx-2 text-black"
                />
              </div>
              {modalForm.errors.title && modalForm.touched.title && (
                <p className="text-red-500 py-2 text-center">
                  {modalForm.errors.title}
                </p>
              )}

              <div className="pt-5 flex items-center justify-center">
                <label htmlFor="content" className="ps-3 pe-1">
                  {" "}
                  Content
                </label>
                <textarea
                  className="rounded-lg w-[75%] h-28 mx-3 text-black"
                  name="content"
                  id="content"
                  value={modalForm.values.content}
                  onChange={modalForm.handleChange}
                  onBlur={modalForm.handleBlur}
                ></textarea>
              </div>
              {modalForm.errors.content && modalForm.touched.content && (
                <p className="text-red-500 py-2 text-center">
                  {modalForm.errors.content}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 px-3 py-3">
              <button onClick={closeModal} className="text-red-600 ">
                Close
              </button>
              <button
                disabled={!(modalForm.isValid && modalForm.dirty)}
                type="submit"
                className="text-white disabled:opacity-85 disabled:cursor-not-allowed bg-blue-500 rounded-lg px-3 py-2"
              >
                {isUpdating ? "Update Note" : "Add Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
