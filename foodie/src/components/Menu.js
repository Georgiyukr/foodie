import React, { Component } from "react";
import Nav from "./Nav";
import FoodItem from "./FoodItem";

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableNum: this.props.location.state.tableNum,
      menu: [],
      restaurantName: "",
      restaurantUsername: "",
      order: []
    };
  }

  componentDidMount() {
    //request a restaurant information gotten from QR code scanning
    let restaurantUsername = this.props.location.state.restaurantUsername;
    fetch(`http://localhost:8080/restaurant/${restaurantUsername}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success && responseJson.restaurant) {
          console.log(responseJson.restaurant);
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
          <h1 className="welcome">Welcome to {this.state.restaurantName}!</h1>
          {/* <div className="table-sign">Your table is {this.state.tableNum}</div> */}
          <div className="menu-sign">Menu</div>

          <div className="menu-list">
            {this.state.menu.map(item => (
              <FoodItem
                key={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))}
          </div>

          <button className="place-order-btn">Place Order</button>
        </div>
      </div>
    );
  }
}

export default Menu;
