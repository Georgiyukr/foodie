import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Nav extends Component {
  logout() {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      redirect: "follow"
    })
      .then(response => response.json())
      .then(responseJson => {
        window.localStorage.removeItem("user");
        console.log(responseJson);
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <div className="nav-bar-login">
          <Link to="/" className="logo">
            Foodie
          </Link>
          <span className="nav-bar-links">
            <Link className="my-payments" to="/payment-history">
              My Payments
            </Link>
            <Link
              to="/login"
              className="logout-btn"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Nav;
