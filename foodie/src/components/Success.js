import React, { Component } from "react";
import Nav from "./Nav";
export class Success extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="success">
          <div className="payment-success">Payment Successful!</div>
          <div className="see-you">
            We hope to see you at {this.props.location.state.restaurantName}{" "}
            again!
          </div>
        </div>
      </div>
    );
  }
}

export default Success;
