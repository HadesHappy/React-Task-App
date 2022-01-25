import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { projectFirestore } from "../Firebase/config";

const TaskPage = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    projectFirestore
      .collection("tasks")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsLoading(false);
          setTask(doc.data());
        } else {
          setIsLoading(false);
          setError("Could not find that task");
        }
      });
  }, []);

  return (
    <div className="TaskPage">
      {task && (
        <div>
          <div className="titleWrapper fade-in-left">
            <h2 className="taskPageTitle">{task.taskTitle}</h2>
            <p className="taskPageDate"><span>Created :</span>{task.date.split(" ", 5).join(" ")}</p>
          </div>
          <p className="taskPageDescription fade-in-right">{task.taskDescription}</p>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
