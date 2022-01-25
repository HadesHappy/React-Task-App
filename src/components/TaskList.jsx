import { Link } from "react-router-dom";
import { projectFirestore } from "../Firebase/config";

//assets
import Delete from "../assets/delete.svg";

const TaskList = ({ tasks }) => {
  const handleDelete = (id) => {
    projectFirestore.collection("tasks").doc(id).delete();
  };

  return (
    <div className="TaskList">
      {tasks &&
        tasks.map((task) => (
          <div key={task.id} className="toDoItem">
            <Link to={`/task/${task.id}`}>
              <h2>{task.taskTitle}</h2>          
            </Link>
            <img
              src={Delete}
              alt="delete task"
              className="deleteTaskButton"
              onClick={() => handleDelete(task.id)}
            />
          </div>
        ))}
    </div>
  );
};

export default TaskList;
