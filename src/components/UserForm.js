import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ isAdd, user, onSubmit }) => {
      // Defines state variables to manage form input values
  const [firstName, setFirstName] = useState(isAdd ? '' : user.name);
  const [email, setEmail] = useState(isAdd ? '' : user.email);
  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: firstName,
      email: email,
      
    };

    try {
      if (isAdd) {
        await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      } else {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, newUser);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  // Renders the user form component
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* ... other fields */}
      <button type="submit">{isAdd ? 'Add User' : 'Save Changes'}</button>
    </form>
  );
};

export default UserForm;