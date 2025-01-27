import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "", email: "", company: { name: "" } },
      error: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.fetchUser(id);
    }
  }

  fetchUser = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState({ user: response.data });
    } catch (error) {
      this.setState({ error: "Failed to fetch user details." });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { user } = this.state;
    try {
      if (id) {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      } else {
        await axios.post("https://jsonplaceholder.typicode.com/users", user);
      }
      this.props.history.push("/");
    } catch (error) {
      this.setState({ error: "Failed to save user details." });
    }
  };

  render() {
    const { user, error } = this.state;
    return (
      <div>
        <h2>{this.props.match.params.id ? "Edit User" : "Add User"}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={this.handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={this.handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Department:</label>
            <input
              type="text"
              name="company.name"
              value={user.company.name}
              onChange={(e) =>
                this.setState((prevState) => ({
                  user: {
                    ...prevState.user,
                    company: { name: e.target.value },
                  },
                }))
              }
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {this.props.match.params.id ? "Update" : "Add"} User
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(UserForm);
