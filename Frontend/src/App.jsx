
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import store from './redux/store';
import { Provider, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./pages/Profile/index";
import Partner from "./pages/Partner";
import Admin from "./pages/Admin";
import { setupAxiosInterceptors } from './api';
import { useEffect } from 'react';
import SingleMovie from './components/SingleMovie';
import BookShow from './components/BookShow';
import Forget from './components/Forget';
import Reset from './components/Reset';

function App() {

  const navigate = useNavigate();

  const { loading } = useSelector((state) => {
    return state.loader;
  });

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
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
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <SingleMovie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-show/:id"
          element={
            <ProtectedRoute>
              <BookShow />
            </ProtectedRoute>
          }
        />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>

  )
}

export default App
