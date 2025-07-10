import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import UserProfile from './components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/login";
import User from "./pages/User";



function App() {
  const defaultText = "Selamat datang di react js";
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("Belajar state dengan React");

  function resetButton() {
    setTitle(defaultText);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>

  );
}

export default App;
