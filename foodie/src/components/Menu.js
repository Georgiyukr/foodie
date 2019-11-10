import React, { Component } from "react";
import Nav from "./Nav";

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableNum: this.props.location.state.tableNum,
      menu: [],
      restaurantName: "",
      restaurantUsername: "",
      order: {}
    };
  }

  componentDidMount() {
    //request a restaurant information gotten from QR code scanning
    let restaurantUsername = this.props.location.state.restaurantUsername;
    fetch(`http://localhost:8080/restaurant/${restaurantUsername}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success && responseJson.restaurant) {
          let restaurant = responseJson.restaurant;
          this.setState({
            menu: restaurant.menu,
            restaurantName: restaurant.restaurantName,
            restaurantUsername: restaurantUsername
          });
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /RESTAURANT", err);
      });
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="menu-view">
          <p>Welcome to {this.state.restaurantName}</p>
          <p>Your table is {this.state.tableNum}</p>
          <p>Menu</p>
        </div>
      </div>
    );
  }
}

export default Menu;
