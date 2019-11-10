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
        {/* loggedIn={this.state.loggedIn} */}
        <p1>MyPayments</p1>
      </div>
    );
  }
}

export default MyPayments;
