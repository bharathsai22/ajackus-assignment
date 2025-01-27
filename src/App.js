import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">User Management App</h1>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;