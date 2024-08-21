import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Container from './components/Container/Container';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';


function App() {
  return ( <>
   <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<Signup/>}/>
        <Route path="/" element={<Container />} />
        <Route path="/status/:status" element={<Container />} />
      </Routes>
    </Router>
  </>);
}

export default App;
