import { Outlet, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login'; // Import your Login component

function App() {
  return (
    <div className='container'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Route for the Login component */}
          {/* Add other routes here as needed */}
          <Route path="/" element={<Home />} /> {/* Example for a Home component */}
          {/* You can add more routes for other components */}
        </Routes>
        <Outlet />
      </main>
    </div>
  );
}

export default App;