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
  onClick() {
    this.props.history.push("/register");
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
      credentials: "include",
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
          let user = responseJson.user;
          this.setState({ username: "", password: "" });
          window.localStorage.setItem(
            "user",
            JSON.stringify({
              name: user.name,
              userid: user._id,
              username: user.username
            })
          );
          this.props.history.push({
            pathname: "/"
          });
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /REGISTER", err);
      });
  }

  render() {
    return (
      <div>
        <div className="nav-bar-login">
          <p className="logo">Foodie</p>
        </div>
        <div className="form">
          <h1 className="loginTitle">Login</h1>
          <form onSubmit={event => this.onSubmit(event)}>
            <p>
              <input
                placeholder="enter your username ..."
                className="input"
                type="text"
                value={this.state.username}
                onChange={event => this.handleChange("username", event)}
              />
            </p>
            <p>
              <input
                placeholder="enter your password ..."
                className="input"
                type="password"
                value={this.state.password}
                onChange={event => this.handleChange("password", event)}
              />
            </p>
            <p className="login-buttons">
              <input className="login-submit" type="submit" value="Submit" />
            </p>
          </form>
          <button
            onClick={this.onClick.bind(this)}
            className="login-to-register login-submit"
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
