import axios from "axios";
import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTask = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const navigate = useNavigate()

  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      title: title,
      description: description,
      isCompleted: completed,
    };

    try {
      const res = await axios.post('/api/task',newTask,{headers:{'Content-Type': 'application/json'}})
      if (res) {
        setTitle('')
        setDescription('')
        toast.success('New Task Added!')
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.errors) {
            if (error.response.data.errors.Title) {
                setTitleError(error.response.data.errors.Title);
            }
            if (error.response.data.errors.Description) {
                setDescriptionError(error.response.data.errors.Description);
            }
        } else {
            toast.error(error.message);
        }
    }
    }

  };


  return (
    <main className="flex-col text-center">
      <section className=" w-[60vw] mx-auto mt-8 mb-10">
        <form
          onSubmit={submitHandle}
          className=" text-center bg-white pt-5 pb-8 px-28 shadow-md rounded"
        >
          <div className="text-2xl text-center mb-2">Add Task</div>
          <div>
            <div className="my-4">
              <label
                className="text-base text-left float-left mb-0.5"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                className="bg-gray-200 border-[1px] border-slate-500 w-full p-1 pl-3 mr-3 border-transparent text-base rounded"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {
                titleError && <div className="text-xs text-left pt-1 text-[#cc3030e1]">{titleError}</div>
              }
            </div>
            <div className="my-4">
              <label
                className="text-base text-left float-left mb-0.5"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="bg-gray-200 border-[1px] border-slate-500 w-full h-20 p-1 pl-3 mr-3 border-transparent text-base rounded"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              {
                descriptionError && <div className="text-xs text-left pt-1 text-[#cc3030e1]">{descriptionError}</div>
              }
            </div>
            <div className="my-4 block text-left">
              <label className="text-base" htmlFor="status">
                <input
                  type="checkbox"
                  id="status"
                  className="inline mr-3"
                  checked={completed}
                  onChange={() => setCompleted((prev) => !prev)}
                />
                Completed
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="  w-1/4 bg-[#2CB1BC] hover:bg-[#0E7C86] rounded py-1"
          >
            Add
          </button>
        </form>
      </section>
      <Link to={'/'} className="btn back-btn">back</Link>
    </main>
  );
};

export default AddTask;
