import { Link } from 'react-router-dom';
import Logout from '../pages/Logout'; // Correct path if Logout.tsx is in the pages folder

const Navbar: React.FC = () => {
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Logout /> {/* Include the Logout button here */}
      </nav>
    );
};

export default Navbar;