import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { closeModal } from "../state/modalActions/modalSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditTaskModal = ({ updateTaskList }: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<string>("");


  const { isModalopen, taskObj } = useSelector(
    (state: RootState) => state.modal
  );

  useEffect(() => {
    setTitle(taskObj.title)
    setDescription(taskObj.description)
    setIsCompleted(taskObj.isCompleted)
  }, [taskObj])

  const dispatch = useDispatch();


  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedTask = {
      title: title,
      description: description,
      isCompleted: isCompleted,
    };

    try {
      const res = await axios.put(`/api/task/${taskObj.id}`,updatedTask,{headers:{'Content-Type': 'application/json'}})
      if (res) {
        updateTaskList(res.data)
        toast.success('Task Updated!')
        setDescriptionError("")
        dispatch(closeModal())
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.errors) {
            if (error.response.data.errors.Description) {
                setDescriptionError(error.response.data.errors.Description);
            }
        } else {
            toast.error(error.message);
        }
    }
    }

  }

  const CloseHandle = ()=>{
    dispatch(closeModal())
    window.location.reload();
  }

  return (
    <div className={`modal-overlay ${isModalopen && "show-modal"}`}>
      <section className=" w-[60vw] relative  mx-auto mt-0 text-center place-items-center">
        <form onSubmit={submitHandle} className=" text-center bg-white pt-5 pb-8 px-28 shadow-md rounded">
          <div className="text-2xl text-center mb-2">Edit Task</div>
          <div>
            <div className="my-4 flex flex-col">
              <h4 className="text-base text-left float-left mb-0.5">Title</h4>
              <p className="bg-gray-50 w-full p-1 pl-3 mr-3 border-transparent text-base rounded text-left">
                {title}
              </p>
            </div>
            <div className="my-4">
              <label
                className="text-base text-left float-left mb-0.5"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="bg-gray-200 w-full h-20 p-1 pl-3 mr-3 border-[1px] border-slate-500 text-base rounded"
                id="description"
                defaultValue={description}
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
                  checked={isCompleted}
                  onChange={() => setIsCompleted((prev) => !prev)}
                />
                Completed
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="  w-1/4 bg-[#2CB1BC] hover:bg-[#0E7C86] rounded py-1"
          >
            Update
          </button>
        </form>
        <button
          className="close-modal-btn"
          onClick={CloseHandle}
        >
          <FaTimes />
        </button>
      </section>
    </div>
  );
};

export default EditTaskModal;
