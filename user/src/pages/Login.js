import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Login Details: ", data);
        navigate("/home");
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev, [name]: value
        }
        ))
    }

    return (
        <div className="auth">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name="name" value={data.name} onChange={handleChange} /><br />
                <input type="email" placeholder="email" value={data.email} name="email" onChange={handleChange} /><br />
                <input type="password" placeholder="password" value={data.password} name="password" onChange={handleChange} /><br />
                <span>
                    Don't you have an account? <Link to="/register">Register</Link>
                </span>
                <button onClick={() => navigate("/login")}>login</button>
                <h1> Welcome to the Home Page!</h1>

            </form>
        </div>
    )
}
export default Login


