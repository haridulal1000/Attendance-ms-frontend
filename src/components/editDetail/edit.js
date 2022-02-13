import { useNavigate, useParams } from 'react-router-dom';
import './edit.css';
function EditDetail(){
    const navigate=useNavigate();
   // const {editDetails}=props;
   const {editDetails}=useParams();
   const parsedJson=JSON.parse(editDetails);
   
    async function handleSubmit(e){
        e.preventDefault();
        const url='http://localhost:5000/api/attendance/update/';
        
        const newObject={
            checkIn:{
            id:parsedJson.checkIn._id,
            checkedIn:document.getElementById('checkedIn').checked,
           year:document.getElementById('checkIn-year').value,
           month:document.getElementById('checkIn-month').value,
           date:document.getElementById('checkIn-date').value,
           hours:document.getElementById('checkIn-hours').value,
           minute:document.getElementById('checkIn-minute').value,
           second:document.getElementById('checkIn-second').value
            },
            checkOut:{
            id:parsedJson.checkOut?parsedJson.checkOut._id:null,
            checkedOut:true,
           year:document.getElementById('checkOut-year').value,
           month:document.getElementById('checkOut-month').value,
           date:document.getElementById('checkOut-date').value,
           hours:document.getElementById('checkOut-hours').value,
           minute:document.getElementById('checkOut-month').value,
           second:document.getElementById('checkOut-second').value
            }
        }

        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(newObject)
        });
        const json = await response.json();
        if (!json.success) {
            if(json.type===500){
                navigate('/details');
            }
        }
    }

    return(
        <div className="edit-container">

        <form onSubmit={handleSubmit}>
        <div><label htmlFor="checkedIn">Checked-In</label> <input type={'checkbox'} id="checkedIn" /></div>
        <div>Check-In Date</div>
        <div><input type={"text"} className="input-text"  id="checkIn-year" required/>-<input type={"text"} className="input-text" id="checkIn-month" required />-<input type={"text"} className="input-text"  id="checkIn-date" required/></div>
        <div>Check-In Time</div>
        <div><input type={"text"} className="input-text"  id="checkIn-hours" max={24} min={0} required/>-<input type={"text"} className="input-text"  id="checkIn-minute" max={60} min={0} required/>-<input type={"text"} className="input-text"  id="checkIn-second" max={60} min={0} required/></div>
        <hr/>
        <div><label htmlFor="checkout-check">Checked-Out</label> <input type={'checkbox'} id="checkedOut" /></div>
        <div>Check-Out Date</div>
        <div><input type={"text"} className="input-text"  id="checkOut-year" required/>-<input type={"text"} className="input-text"  id="checkOut-month" required/>-<input type={"text"} className="input-text"  id="checkOut-date" required/></div>
        <div>Check-Out Time</div>
        <div><input type={"text"} className="input-text"  id="checkOut-hours" max={24} min={0}required />-<input type={"text"} className="input-text"  id="checkOut-minute" max={60} min={0} required/>-<input type={"text"} className="input-text" id="checkOut-second" max={60} min={0} required/></div>
        <input type="submit" className="submit-btn"/>
    </form>
        </div>
    );
}
export default EditDetail;