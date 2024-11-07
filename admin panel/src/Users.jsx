import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/allusers');
        setUsers(res.data);
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        setError('Error fetching users');  // Set error message
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <div className="p-20">Loading...</div>;
  }

  if (error) {
    return <div className="p-20 text-red-500">{error}</div>;
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul className="divide-y divide-gray-200 bg-white shadow-lg rounded-lg p-6">
        {users.map((user) => (
          <li key={user._id} className="py-4 flex">
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
              {user.phone_no && <p className="text-gray-500">{user.phone_no}</p>}
            </div>
            <div className="text-right">
              {user.profession && <p className="text-gray-500">{user.profession}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
