import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './components/Login/login';
import Logout from './components/Logout/logout';
import Signup from './components/Signup/signup';
import Details from './components/Details/details';
import Header from './components/Header/header';
import EditDetail from './components/EditDetail/edit';
import Home from './components/Home/home';
import Error from './components/Error/error';
import NotFound from './components/NotFound/notfound';

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
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
            path="/edit/:editDetails"
            exact
            element={<EditDetail/>}
          />
          <Route
            path="/logout"
            exact
            element={<Logout/>}
          />
          <Route
            path="/"
            exact
            element={<Home/>}
          />
          <Route
            path="/error"
            exact
            element={<Error/>}
          />
           <Route
            path="*"
            exact
            element={<NotFound/>}
          />
        </Routes>
      </Router>
      
    
      
    </div>
  );
}

export default App;
