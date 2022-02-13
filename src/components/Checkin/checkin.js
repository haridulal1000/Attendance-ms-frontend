import { Navigate } from 'react-router-dom';
import './checkin.css';
function CheckIn(){
    const checkInUrl='http://localhost:5000/api/checkin/';
    const checkOutUrl='http://localhost:5000/api/checkout/';
    async function checkIn(){
        const authToken=localStorage.getItem('auth-token');
        const remarks=document.getElementById('remarks').value;
        const response=await fetch(checkInUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':authToken,
                body:JSON.stringify({remarks:remarks})
            }
        });
        const json=await response.json(); 
        if(!json.success){
            if(json.type===500){
                Navigate('/error');
            }else if(json.type===400){

                document.getElementById('error').innerHTML="You can't Check-In twice.";
            }
        }else{
            window.location.reload();
        }
    }

    async function checkOut(){
        const authToken=localStorage.getItem('auth-token');
        const remarks=document.getElementById('remarks').value===''?null:document.getElementById('remarks').value;
        const response=await fetch(checkOutUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':authToken,
                body:JSON.stringify({remarks:remarks})
            }
        });
        const json=await response.json(); 
        if(!json.success){
            if(json.type===500){
                Navigate('/error');
            }else if(json.type===400){

                document.getElementById('error').innerHTML="You can't Check-Out twice or Check-Out without Checking-in.";
            }
        }else{
            window.location.reload();
        }
    }
    
    return(
        <>
        <h3 id='error'></h3>
        <div className='check-in-container'>
        <div className="checkin-container"><button className='btn-left' onClick={checkIn}>CHECK IN</button> <button className='btn-right' onClick={checkOut}>CHECK OUT</button><input type={'text'} id="remarks" placeholder='Remarks'/> </div>
        </div>
        </>
    );
}

export default CheckIn;