import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
export class Nav extends Component {
  constructor(props) {
    super(props);
  }
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
        console.log(responseJson);
      })
      .catch(err => {
        // console.log("from fetch", err);
        alert(err);
      });
  }

  // foodie = () => {
  //   this.props.logged(true);
  // };

  render() {
    console.log("NAV PROPS", this.props);
    return (
      <div>
        <div className="nav-bar-login">
          <Link to="/" className="logo">
            {/* onClick={() => this.foodie()} */}
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
