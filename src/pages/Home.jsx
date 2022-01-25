import { useState, useEffect } from "react";
import { projectFirestore } from "../Firebase/config";

//components
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

//assets
import Add from "../assets/add.svg";
import Firebase from "../assets/firestore.svg";
import ReactLogo from "../assets/react-logo.svg";

const Home = () => {
  const [allTasks, setAllTasks] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const unsub = projectFirestore
      .collection("tasks")
      .orderBy("date", "desc")
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setError("No data found");
            setIsLoading(false);
          } else {
            let results = [];
            snapshot.docs.forEach((document) => {
              results.push({ id: document.id, ...document.data() });
            });
            console.log(results);
            setAllTasks(results);
            setIsLoading(false);
          }
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        }
      );
    return () => unsub();
  }, []);

  return (
    <div className="Home">
      <h1>Task App</h1>
      <h2 className="subtitle">
        Made using <img className="title-img" src={ReactLogo} alt="react" title="React" /> and{" "}
        <img className="title-img" src={Firebase} alt="firebase" title="Firebase" />
      </h2>
      <button className="addButton" title="Add Task" onClick={() => setShowModal(!showModal)}>
        <img src={Add} alt="addButton" className="addButtonImage" />
      </button>
      {showModal && <TaskInput setShowModal={setShowModal} />}
      {showModal && <div className="overlay"></div>}
      <TaskList tasks={allTasks} />
      <p className="credits">
        Made with <span>❤</span> by{" "}
        <a
          target="_blank"
          href="https://github.com/igor-ostojic"
          className="font-semibold hover:text-indigo-200"
        >
          Igor Ostojic
        </a>
      </p>
    </div>
  );
};

export default Home;
