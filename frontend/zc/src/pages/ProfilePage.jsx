import Navbar from '../components/Navbar.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard.jsx';

function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/get-user/${localStorage.getItem('email')}`);
        console.log(res.data.user); // Ensure that the response is what you expect
        setUser(res.data.user); // Update state with the correct data format
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="w-full fixed top-0">
        <Navbar active="profile" />
      </div>
      <div className="flex flex-grow mt-16 p-4">
        <div className="w-full p-4">
          <p className="text-2xl font-bold">My Profile</p>
          <div className='flex justify-center items-center mt-10'>
            <ProfileCard user={user}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
