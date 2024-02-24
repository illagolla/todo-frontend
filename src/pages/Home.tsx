// import EditTaskModal from "../components/EditTaskModal";
import TaskList from "../components/TaskList";

const Home = () => (
  <main>
    <section className="w-[65vw] mx-auto my-8">
      <div className="text-2xl text-center mb-6">Task List</div>
      <TaskList />
    </section>
    {/* <EditTaskModal /> */}
  </main>
);

export default Home;
