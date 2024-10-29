
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import store from './redux/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}

export default App
