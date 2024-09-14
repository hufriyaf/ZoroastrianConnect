import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the logout route
      // const response = await axios.post('http://localhost:5000/api/auth/logout');
      // console.log(response.data);

      // Clear any client-side authentication data (e.g., token)
      localStorage.setItem('isLoggedIn',false);

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
