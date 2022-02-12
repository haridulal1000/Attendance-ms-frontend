import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './signup.css';
function Signup(){
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('auth-token')!==null){
            navigate('/attendance');
        }
    });
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(e.target.password.value!==e.target.cpassword.value){
            document.getElementById('error-header').innerHTML='Password did not match';
            return;
        }
        const response=await fetch('http://localhost:5000/api/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:e.target.username.value,password:e.target.password.value,name:e.target.name.value})
    
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem('auth-token',json.authToken);
            navigate('/details');
        }
        else{
            document.getElementById('error-header').innerHTML='Username/Password didn\'t match';
            e.target.username.value='';
            e.target.password.value='';
        }
    }
    return(
        <div className="signup-container">
            <h3 id='error-header'></h3>
        <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Full Name</label>
        <input type="text" id="name" name="name" minLength={5} required/>
        <label htmlFor='username'>Username</label>
        <input type="text" id="username" name="username" minLength={5} required/>
        <label htmlFor='password'>Password</label>
        <input type="password" id="password" name="password" minLength={5} required/>
        <label htmlFor='password'>Confirm Password</label>
        <input type="password" id="cpassword" name="cpassword" minLength={5} required/>
        <input type="submit" className="btn"/>
    </form>
    </div>
    );
}

export default Signup;