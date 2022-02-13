import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css";
function EditDetail() {
  const navigate = useNavigate();
  const { editDetails } = useParams();
  const parsedJson = JSON.parse(editDetails);

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      id: parsedJson._id,
      checkedIn: document.getElementById('checkedIn').checked,
      checkedOut: document.getElementById('checkedOut').checked,
      Year: getDates(document.getElementById('date').value)[0],
      Month: getDates(document.getElementById('date').value)[1],
      Date: getDates(document.getElementById('date').value)[2],
      checkInHours: getTimes(document.getElementById('check-in-time').value)[0],
      checkInMinute: getTimes(document.getElementById('check-in-time').value)[1],
      checkInSecond: getTimes(document.getElementById('check-in-time').value)[2],
      checkOutHours: getTimes(document.getElementById('check-out-time').value)[0],
      checkOutMinute: getTimes(document.getElementById('check-out-time').value)[1],
      checkOutSecond: getTimes(document.getElementById('check-out-time').value)[2]
    };
    const token=localStorage.getItem('auth-token');
    const response = await fetch(
      "http://localhost:5000/api/attendance/update/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":token
        },
        body: JSON.stringify(body),
      }
    );
    const json=await response.json();
    if(!json.success){
        if(json.type===500){
            navigate('/error');
        }
    }else{
        navigate('/details');
    }
  }
  function getDates(str){
      try{

          let exp=str.split('-');
          if(exp.length!==3){
              return  [null,null,null]
          }
          return exp;
      }catch(e){
          return [null,null,null]
      }
  }
  function getTimes(str){
    try{

        let exp=str.split(':');
        if(exp.length!==3){
            return[null,null,null];
        }
        return exp;
    }catch(e){
        return [null,null,null]
    }
  }
  function checkedInCheck(e) {
    if (e.target.checked) {
      document.getElementById("check-out-div").classList.remove("hidden");
      document.getElementById("check-in-div").classList.remove("hidden");
    } else {
      document.getElementById("check-out-div").classList.add("hidden");
      document.getElementById("check-in-div").classList.add("hidden");
    }
  }
  function checkedOutCheck(e) {
    if (e.target.checked) {
      document.getElementById("check-out-div").classList.remove("hidden");
    } else {
      document.getElementById("check-out-div").classList.add("hidden");
    }
  }

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit}>
        <div>
             <div className="pair">
            <div>Date</div>
            <div>
              <input type={"date"} id="date" />
            </div>
          </div>
          <hr />
          <label htmlFor="checkedIn">Checked-In</label>
          <input type={"checkbox"} id="checkedIn" onChange={checkedInCheck} />
        </div>
        <div id="check-in-div">
         
          <div className="pair">
            <div>Check-In Time</div>
            <div>
              <input type={"time"} id="check-in-time" step={1}/>
            </div>
          </div>
          <div></div>
          <label htmlFor="checkedOut">Checked-Out</label>
          <input type={"checkbox"} id="checkedOut" onChange={checkedOutCheck} />
        </div>
        <div id="check-out-div">
          <div className="pair">
            <div>Check-Out Time</div>
            <div>
              <input type={"time"} id="check-out-time" step={1}  />
            </div>
          </div>
        </div>
        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
}

export default EditDetail;
