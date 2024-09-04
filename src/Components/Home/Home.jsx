import notFound from "../../assets/hand-drawn-no-data-concept/no data.jpg";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
export default function Home() {

  const [notes, setNotes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [values, setValues] = useState({})
  const [isUpdating, setIsUpdating] = useState(false)
  function handleModal() {
    setShowModal(true)
  }

 async function getUserNotes() {
    try {
      const { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes"
        , {
          headers: {
          token:'3b8ny__'+localStorage.getItem('tkn')
        }
        });
      console.log(data.notes);
      setNotes(data.notes)
      
    } catch (error) {
      console.log(error.response.data.msg);
      
    }
  }
  useEffect(() => {
    getUserNotes()
  }, [])

  async function deleteNote(id) {
    try {
      const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
          headers: {
            token:'3b8ny__'+localStorage.getItem('tkn')
          }
        }
      );
      console.log(data);
      const filteredArr = notes.filter((note) => note._id !== id)
      setNotes(filteredArr)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  function updateNote(id, title, content) {
    console.log(id, title, content);
    setValues({ id, title, content })
    setShowModal(true)
    setIsUpdating(true)
    
  }
  
  return (
    <>
      <div className="container mx-auto bg-slate-900  py-20 relative">
        <div className="bg-slate-950  m-10 relative py-32 rounded-md">
          <button
            onClick={handleModal}
            className="bg-blue-500 text-white rounded-lg py-3 px-4 absolute top-5 end-5"
          >
            {" "}
            Add Note{" "}
          </button>

          {notes.length === 0 ? (
            <div className="flex items-center justify-center flex-col">
              <img
                src={notFound}
                alt="not found"
                className="w-[300px] rounded-md"
              />
              <p className="py-3 text-[#7684F1] text-4xl font-bold">
                No Notes Found
              </p>
            </div>
          ) : (
            <div className="container mx-auto">
              <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1 px-10 text-white">
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className="item w-full flex items-center justify-center  flex-col rounded-lg bg-gray-800"
                  >
                    <div className="inner py-5 font-bold px-5 w-full  flex  justify-center flex-col">
                      <h2 className=" py-3 text-center text-3xl font-bold">
                        {note.title}
                      </h2>
                      <div className="flex items-center justify-between border-b-2 text-3xl">
                        <MdDelete
                          onClick={() => deleteNote(note._id)}
                          className="cursor-pointer "
                        />
                        <FaEdit
                          onClick={() =>
                            updateNote(note._id, note.title, note.content)
                          }
                          className="cursor-pointer "
                        />
                      </div>
                      <p className="py-4 text-md text-center">{note.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setNotes={setNotes}
          notes={notes}
          values={values}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
      )}
    </>
  );
}
