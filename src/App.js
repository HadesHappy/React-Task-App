import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";

//styles
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
