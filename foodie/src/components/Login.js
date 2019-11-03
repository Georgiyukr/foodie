import React, { Component } from "react";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, event) {
    this.setState({ [key]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.login();
  }

  // user login
  login() {
    if (!this.state.username || !this.state.password) {
      alert("Please enter username and password!");
      return;
    }

    fetch("http://localhost:8080/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      redirect: "follow",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true && responseJson.user) {
          console.log("USER LOGGEDIN", responseJson.user);
          this.setState({ username: "", password: "" });
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /REGISTER", err);
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={event => this.onSubmit(event)}>
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

export default Login;
