import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Layout from "./Layout";
import AddTask from "./pages/AddTask";
import axios from "axios";


function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addtask/" element={<AddTask />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
