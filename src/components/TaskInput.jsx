import { projectFirestore } from "../Firebase/config";
import { useState } from "react";

//assets
import Delete from "../assets/delete.svg";

const TaskInput = ({ setShowModal }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [inputError, setInputError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskTitle.length > 0) {
      const doc = { taskTitle, taskDescription, date: new Date().toString() };

      try {
        await projectFirestore.collection("tasks").add(doc);
      } catch (err) {
        console.log(err);
      }

      setTaskTitle("");
      setShowModal(false);
      setInputError(null);
    } else {
      setInputError("Please enter a task in the input field");
    }
  };

  return (
    <div className="taskInput">
      <img className="exitButton" src={Delete} alt="exit" onClick={() => setShowModal(false)} />
      <form onSubmit={handleSubmit}>
        {inputError && <p className="inputError">{inputError}</p>}
        <div className="field">
          <input
            type="text"
            placeholder="Enter Task Name"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className="line"></div>
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Enter Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <div className="line"></div>
        </div>

        <button className="submitButton" type="submit">
          ADD TASK
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
