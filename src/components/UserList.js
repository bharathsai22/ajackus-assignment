import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.setState({ users: response.data });
    } catch (error) {
      this.setState({ error: "Failed to fetch users." });
    }
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState({ users: this.state.users.filter((user) => user.id !== id) });
    } catch (error) {
      this.setState({ error: "Failed to delete user." });
    }
  };

  render() {
    const { users, error } = this.state;
    return (
      <div>
        {error && <p className="text-red-500">{error}</p>}
        <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add User</Link>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name.split(" ")[0]}</td>
                <td>{user.name.split(" ")[1] || ""}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>
                  <Link to={`/edit/${user.id}`} className="text-blue-500 mr-2">Edit</Link>
                  <button onClick={() => this.handleDelete(user.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;