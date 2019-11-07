import React, { Component } from "react";
import Nav from "./Nav";
export class MyPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }
  // componentDidMount() {
  //   if (this.props.loggedIn) {
  //     this.setState({ logged: true });
  //   }
  // }

  // foodie() {
  //   this.history.push({ pathname: "/", state: { loggedIn: true } });
  // }
  render() {
    console.log("Payment PROPS", this.props);
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
