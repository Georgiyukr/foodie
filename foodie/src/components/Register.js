import React, { Component } from "react";

// import axios from "axios";
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", username: "", password: "" };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, event) {
    this.setState({ [key]: event.target.value });
  }

  //register a user
  register() {
    if (!this.state.username || !this.state.password || !this.state.name) {
      alert("Please enter username and password!");
      return;
    }

    fetch("http://localhost:8080/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      redirect: "follow",
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true && responseJson.user) {
          console.log("USER REGISTERED", responseJson.user);
          this.setState({ name: "", username: "", password: "" });
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /REGISTER", err);
      });
  }

  onSubmit(event) {
    event.preventDefault();
    this.register();
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={event => this.onSubmit(event)}>
          Name:
          <input
            type="text"
            value={this.state.name}
            onChange={event => this.handleChange("name", event)}
          />
          Username:
          <input
            type="text"
            value={this.state.username}
            onChange={event => this.handleChange("username", event)}
          />
          Password:
          <input
            type="text"
            value={this.state.password}
            onChange={event => this.handleChange("password", event)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Register;
