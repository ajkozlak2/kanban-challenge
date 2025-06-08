import { Outlet, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login'; // Import your Login component
import Home from './pages/Home'; // Ensure this path is correct

const INACTIVITY_TIMEOUT = 300000; // 5 minutes in milliseconds

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      inactivityTimer = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    };

    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove the JWT from local storage
      navigate('/login'); // Redirect to the login page after logout
    };

    // Set up event listeners for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Start the inactivity timer
    resetTimer();

    // Clean up event listeners and timer on component unmount
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [navigate]);

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Route for the Login component */}
          <Route path="/" element={<Home />} /> {/* Example for a Home component */}
          {/* You can add more routes for other components */}
        </Routes>
        <Outlet />
      </main>
    </div>
  );
}

export default App;