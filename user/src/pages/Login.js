import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    axios.defaults.withCredentials =true;
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3002/api/auth/login',{
            email,
            password
        }).then(response=>{
            if(response.data.status){
                navigate("/");
            }
            console.log(response)
        }).catch(err=>{
            console.log(err)
        })
       

    }
    
    return (
        <div className="auth">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} /><br />
                <input type="password" placeholder="password" value={password} name="password" onChange={(e)=>setPassword(e.target.value)} /><br />
                <span>
                    Don't you have an account? <Link to="/register">Register</Link>
                </span>
                <button>login</button>
                <h1> Welcome to the Home Page!</h1>

            </form>
        </div>
    )
}
export default Login


