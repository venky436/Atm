import './App.css';
import HomaPage from './Pages/HomaPage';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import NavbarComponent from './components/NavBar/Navbar';
import Transaction from './Pages/Transaction';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent/>
        <Routes>
          <Route exact path="/" element={<HomaPage/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/transaction" element={<Transaction/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
