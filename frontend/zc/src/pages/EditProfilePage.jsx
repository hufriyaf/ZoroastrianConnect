import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function EditProfilePage() {
  const [user, setUser] = useState({
    name: '',
    phone_no: '',
    email: '',
    city: '',
    profession: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/get-user/${localStorage.getItem('email')}`);
        setUser(res.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const response = await axios.put(`http://localhost:5000/api/auth/update-user/${localStorage.getItem('email')}`, user);
      console.log(response.data);
      navigate('/profile'); // Redirect to profile page after update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar active="editprofile"/>
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Edit Profile</h2>
          <div className="mb-6">
            <label className="block text-blue-700 text-sm font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-700 text-sm font-semibold mb-2" htmlFor="phone_no">Phone Number</label>
            <input
              type="text"
              name="phone_no"
              id="phone_no"
              value={user.phone_no}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-700 text-sm font-semibold mb-2" htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={user.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-blue-700 text-sm font-semibold mb-2" htmlFor="profession">Profession</label>
            <input
              type="text"
              name="profession"
              id="profession"
              value={user.profession}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
