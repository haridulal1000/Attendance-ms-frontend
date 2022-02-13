import { Link, useNavigate } from 'react-router-dom';
import './header.css';
function Header(){
    const authToken=localStorage.getItem('auth-token');
    const navigate=useNavigate();
    if(authToken){

        return(
            <>
            <div className="header-container">
                <div className='grid-left'><h1 onClick={()=>{navigate('/')}}>Online-Attendance</h1></div>
            <div className='grid-right'><button onClick={()=>{navigate('/logout')}}>Logout</button></div>
            </div>
            </>
        );
    }else{
        return(

        <>
            <div className="header-container">
            <h1 className='grid-left'>Online-Attendance</h1>
            <div className='grid-right'>
                <button onClick={()=>{navigate('/login')}}>Login</button>
            <button onClick={()=>{navigate('/signup')}}>Signup</button>
            </div>
            </div>
            </>
        )
    }
}
export default Header;