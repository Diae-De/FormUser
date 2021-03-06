import './App.css';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserDashBoardSignUp from './components/UserDashBoardSignUp';
import UserDashBoardlogin from './screens/userdashboardlogin/UserDashBoardlogin';
import ResetPassUser from './components/ResetPassUser';
import ManagerAccount from './screens/manageraccount/ManagerAccount';
import UserWLogout from './components/UserWLogout';
import Acceuil from './components/Acceuil';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path="/signin" element={<UserDashBoardlogin/>} />
          <Route path="/signup" element={<UserDashBoardSignUp/>} />
          <Route path="/userform" element={<Home/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/userdashboard" element={<UserWLogout/>} />
          <Route path="/" element={<Acceuil/>} />
          <Route path="/manager" element={<ManagerAccount/>} />
          <Route path="/resetpass" element={<ResetPassUser/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
