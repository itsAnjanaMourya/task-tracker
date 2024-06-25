import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        // axios.get('http://localhost:3002/api/abc').then(res => {
        //     console.log(res)
        // })
        
        axios.post('http://localhost:3002/api/auth/register',{
            name,
            email,
            password
        }).then(response=>{
            console.log(response)
            if(response.data.status){
                navigate("/login");
            }
        }).catch(err=>{
            console.log(err)
        })

    }
    
    return (
        <div className="auth">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name="name" value={name} onChange={(e)=>setName(e.target.value)} /><br />
                <input type="email" placeholder="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} /><br />
                <input type="password" placeholder="password" value={password} name="password" onChange={(e)=>setPassword(e.target.value)} /><br />
                <button>Register</button>
                <span>
                     have an account? <Link to="/login">Login</Link>
                </span>
                
                <h1> Welcome to the Home Page!</h1>
            </form>
        </div>
    )
}
export default Register


