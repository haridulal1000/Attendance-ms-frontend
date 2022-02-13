import { useNavigate } from 'react-router-dom';
import './home.css';
function Home(){
    const navigate=useNavigate();
return(
    <div className="home-container">
        <button className="btn" onClick={()=>{navigate('/details')}}>CheckIn/CheckOut</button>
    </div>
);
}
export default Home;