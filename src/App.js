import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setIsAdding(true);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setIsAdding(false);
    setSelectedUser(user);
  };

  const handleFormSubmit = () => {
    setIsAdding(false);
    setSelectedUser(null);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <button onClick={handleAddUser}>Add User</button>
      {isAdding ? (
        <UserForm isAdd={true} onSubmit={handleFormSubmit} />
      ) : (
        <>
          {selectedUser ? (
            <UserForm isAdd={false} user={selectedUser} onSubmit={handleFormSubmit} />
          ) : (
            <UserList onEdit={handleEditUser} />
          )}
        </>
      )}
    </div>
  );
}

export default App;