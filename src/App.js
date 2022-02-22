import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddCarPage from './pages/AddCarPage';
import CarPage from './pages/CarPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { CarProvider } from './contexts/CarContext';

function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute>< HomePage /></ProtectedRoute>} />
            <Route path="/add" element={<ProtectedRoute>< AddCarPage /></ProtectedRoute>} />
            <Route path="/cars/:id" element={<CarPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Router>
      </CarProvider>
    </AuthProvider>
  );
}

export default App;
