import './login.css';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
function Login(){
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('auth-token')!==null){
            navigate('/details');
        }
    });
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})
    
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem('auth-token',json.authToken);
            navigate('/details');
        }else{
            if(json.type===500){
                navigate('/error')
            }else{
                 document.getElementById('error-header').innerHTML='Username/Password didn\'t match';
            e.target.username.value='';
            e.target.password.value='';
            }
           
        }
    }
    return(
        <div className="login-container">
            <h3 id='error-header'></h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input type="text" id="username" name="username" minLength={5} required/>
            <label htmlFor='password'>Password</label>
            <input type="password" id="password" name="password" minLength={5} required/>
            <input type="submit" className="btn"/>
        </form>
        </div>
        
    );
    
}

export default Login;