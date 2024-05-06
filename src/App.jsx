import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Micuenta from './components/MiCuenta';
import Home from './components/Home';
import IniciarSesion from './components/IniciarSesion';
import Registrarse from './components/Registrarse';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
        <Route path="/mi-cuenta" element={<Micuenta />} />
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
