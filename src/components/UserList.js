import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.name}`}</td>
              <td>{user.email}</td>
              <td>{/* Assuming Department is not available in the API */}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;