import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from './components/login/login';
import Logout from './components/logout/logout';
import AttendanceState from './contexts/attendances/attendanceState';
import Signup from './components/signup/signup';
import Details from './components/Details/details';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            exact
            element={<Login/>}
          />
          <Route
            path="/signup"
            exact
            element={<Signup/>}
          />
          <Route
            path="/details"
            exact
            element={<Details/>}
          />
          <Route
            path="/logout"
            exact
            element={<Logout/>}
          />
        </Routes>
      </Router>
      
    
      
    </div>
  );
}

export default App;
