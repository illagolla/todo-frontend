import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "../state/modalActions/modalSlice";
import EditTaskModal from "./EditTaskModal";
import axios from "axios";
import { toast } from "react-toastify";

const TaskCard = ({ task, deleteTask, updateTaskList }: any) => {
  const dispatch = useDispatch();

  const toggleHandle = async (e: React.MouseEvent<any>) => {
    e.preventDefault()

    const updatedTask = {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted,
    };

    try {
      const response = await axios.put(`/api/task/${task.id}`, updatedTask, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data) {
        updateTaskList(response.data);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
            toast.error(error.response.data);
        } else {
            toast.error(error.message);
        }
    }
    }
  };

  return (
    <>
      <article className="bg-white shadow-md rounded flex flex-col justify-between">
        <header className="border-b-[1px] py-2 px-3">
          <h4 className=" text-lg font-semibold">{task.title}</h4>
        </header>
        <div className="py-2 px-3 taskcard-content h-full mb-1">
          <div>
            <p className="text-sm font-normal">{task.description}</p>
          </div>
          <div className=" flex justify-end">
            {task && task.isCompleted === true ? (
              <FaToggleOn
                style={{
                  color: "#64cb64",
                  fontSize: "25px",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
                onClick={toggleHandle}
              />
            ) : (
              <FaToggleOff
                style={{
                  color: "#cc3030e1",
                  fontSize: "25px",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
                onClick={toggleHandle}
              />
            )}
            {!task.isCompleted ? (
              <div className=" rounded text-center w-[120px] h-[25px] items-center bg-[#e0e8f9] text-[#647acb]">
                Not Completed
              </div>
            ) : (
              <div className=" rounded text-center w-[120px] h-[25px] items-center bg-[#e0f9ec] text-[#64cb64]">
                Done
              </div>
            )}
          </div>
        </div>
        <footer className=" flex pt-2 pb-4 px-3 justify-center gap-4">
          <button
            className="btn edit-btn"
            onClick={() => dispatch(openModal(task))}
          >
            Edit
          </button>
          <button
            className="btn delete-btn"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </footer>
      </article>
      <EditTaskModal updateTaskList={updateTaskList} />
    </>
  );
};

export default TaskCard;
