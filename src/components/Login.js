import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {
    const host = 'https://notes-managing-app-backend.herokuapp.com';
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            history.push("/home");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Notes Managing App</h1>
            <div className="row mt-5">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="d-flex justify-content-between">
                <button className="btn btn-primary">Login</button>
                
                <p className="">Not registered? Click on Signup.</p>
                <button className="btn btn-primary" onClick={()=> history.push('/signup')}>Signup</button>
               
                </div>
            </form>
                </div>
            </div>
            
        </div>
    )
}

export default Login;