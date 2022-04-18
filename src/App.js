import './App.css';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
