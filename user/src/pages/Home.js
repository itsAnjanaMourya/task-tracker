import { useState } from "react";
function Home() {

    const [task, setTask] = useState({ text: "", status: "", error:""});
    const [list, setToList] = useState([]);


   
    function handleChange(e) {
        e.preventDefault();
        if (task.text.trim() && task.status!=='') {
            setToList((list) => {
                const newList = [...list, task]
                console.log(newList)
                return (newList)
            })
            setTask({ text: "", status: "", error:"" })
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
                <div className="container justify-content-center" style={{ "marginTop": "10%" }}>

                    <h1>Track your task</h1>
                    <form onSubmit={handleChange}>
                        <input type="text" placeholder="Your task" name="text" value={task.text} onChange={(e) => setTask({ ...task, text: e.target.value })} />
                        <br />
                        status1
                        <input type="radio" style={{ marginRight: "20px" }} name="status" checked={task.status === "status1"} value="status1" onChange={(e) => setTask({ ...task, status: e.target.value })} />status2
                        <input type="radio" name="status" checked={task.status === "status2"} value="status2" onChange={(e) => setTask({ ...task, status: e.target.value })} />
                        <button type="submit" >submit</button>
                        </form>
                        {task.error && <p style={{ color: "red" }}>{task.error}</p>}
                        <div>
                        {
                            Array.isArray(list) && list != [] && [...list].reverse().map((data, i) => (
                                <div key={i}>
                                    <p>Task:{data.text} Status:{data.status}</p>
                                </div>
                            ))
                        }
                        </div>
                    
                </div>
            </div>
        </>
    )
}

export default Home;