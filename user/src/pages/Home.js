import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
    const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
    const [task, setTask] = useState({ text: "", status: "", error: "" });
    const [list, setToList] = useState([]);
    const [currentUserTasks, setCurrentUserTasks] = useState([]);

    useEffect(() => {
        if (list.length != 0) {
            const fetchData = async () => {
                let res;
                try {
                    res = await axios.post(`http://localhost:3002/api/auth/myTask`, list)
                    console.log("sss")
                    console.log(res)
                }
                catch (err) {
                    console.log("saas")
                    console.log(err)
                }
                setCurrentUserTasks(res.data.list)
                console.log(currentUserTasks);
            }
            fetchData();
        }
    }, [list])
    function handleChange(e) {
        e.preventDefault();
        if (task.text.trim() && task.status !== '') {
            setToList((list) => {

                const newList = [...list, task]
                console.log(newList)
                return (newList)
            })
            setTask({ text: "", status: "", error: "" })
        }
        else {
            if (!task.text.trim()) {
                setTask({ ...task, error: "Enter your task" });
            } else if (task.status === '') {
                setTask({ ...task, error: "Enter your status for the task" });
            }
        }
    }

    return (
        <>
            <div className="row align-items-center">
                <div className="container justify-content-center" style={{ marginTop: "10%" }}>
                    <h1>Track your task</h1>
                    {isAuthenticated ? (
                        <>
                            <h2>Welcome, {currentUser.name}!</h2>
                            <button onClick={logout}>Logout</button>
                            <form onSubmit={handleChange}>
                                <input type="text" placeholder="Your task" name="text" value={task.text} onChange={(e) => setTask({ ...task, text: e.target.value })} />
                                <br />
                                status1
                                <input type="radio" style={{ marginRight: "20px" }} name="status" checked={task.status === "status1"} value="status1" onChange={(e) => setTask({ ...task, status: e.target.value })} />status2
                                <input type="radio" name="status" checked={task.status === "status2"} value="status2" onChange={(e) => setTask({ ...task, status: e.target.value })} />
                                <button type="submit">submit</button>
                            </form>
                            {task.error && <p style={{ color: "red" }}>{task.error}</p>}
                            <div>
                                {Array.isArray(currentUserTasks) && currentUserTasks.length > 0 && currentUserTasks.reverse().map((data, i) => (
                                    <div key={i}>
                                        <p>Task: {data.text} Status: {data.status}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Please log in to see your tasks.</p>
                    )}
                </div>
            </div>

        </>
    )
}

export default Home;