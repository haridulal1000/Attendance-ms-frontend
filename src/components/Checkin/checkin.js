import './checkin.css';
function CheckIn(){
    const checkInUrl='http://localhost:5000/api/checkin/';
    const checkOutUrl='http://localhost:5000/api/checkout/';
    async function checkIn(){
        const authToken=localStorage.getItem('auth-token');
        const response=await fetch(checkInUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':authToken
            }
        });
        const json=await response.json(); 
        if(!json.success){
            alert('not loaded');
        }else{
            console.log('checkedIn');
            window.location.reload();
        }
    }

    async function checkOut(){
        const authToken=localStorage.getItem('auth-token');
        const response=await fetch(checkOutUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':authToken
            }
        });
        const json=await response.json(); 
        if(!json.success){
            alert('not loaded');
        }else{
            console.log('checkedIn');
            window.location.reload();
        }
    }
    
    return(
        <>
        <div className="checkin-container"><button className='btn-left' onClick={checkIn}>CHECK IN</button> <button className='btn-right' onClick={checkOut}>CHECK OUT</button></div>
        </>
    );
}

export default CheckIn;