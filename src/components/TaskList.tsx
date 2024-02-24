import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TaskList = () => {

  const [taskList, setTaskList] = useState<Task[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/task');
      setTaskList(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteTask = async (id:number)=>{
    try {
      const res = await axios.delete(`/api/task/${id}`)
      if (res) {
        setTaskList(res.data)
        toast.success("Task Deleted")
      }
    } catch (error) {
      
    }
  }

  const updateTaskList =(updatedTask:Task)=>{
    setTaskList((prev:Task[])=>prev.map((task:Task)=>{
      if (task.id===updatedTask.id) {
        return{...task,...updatedTask}
      }
      return task
    }))
  }

  if (taskList && taskList.length === 0) {
    return (
      <div className="w-[60vw] mx-auto mt-8 text-center bg-white py-8 px-28 shadow-md rounded">
        <h3 className="text-2xl text-center mb-6">There is no task.</h3>
        <Link to={"addtask/"} className="btn add-btn">
          add tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
      {taskList && taskList.sort((a,b)=>{return b.id-a.id}).map((task, index) => {
        return <TaskCard key={index} task={task} deleteTask={deleteTask} updateTaskList={updateTaskList} />;
      })}
    </div>
  );
};

export default TaskList;
