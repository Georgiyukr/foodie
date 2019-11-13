import React, { Component } from "react";
import Nav from "./Nav";
export class MyPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="payments-view">
          <div>My Payments History</div>
        </div>
      </div>
    );
  }
}

export default MyPayments;
