import React, { Component } from "react";
import Nav from "./Nav";

export class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav />
        <h1>Menu</h1>
        <p>Restaurant: {this.props.location.state.restaurantUsername}</p>
        <p>Table: {this.props.location.state.tableNum}</p>
      </div>
    );
  }
}

export default Menu;
