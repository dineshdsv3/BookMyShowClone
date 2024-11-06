
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import store from './redux/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./pages/Profile/index";
import Partner from "./pages/Partner";
import Admin from "./pages/Admin";
import { setupAxiosInterceptors } from './api';
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (

    <Provider store={store}>

      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/partner"
          element={
            <ProtectedRoute>
              <Partner />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Provider>

  )
}

export default App
