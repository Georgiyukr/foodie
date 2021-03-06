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
      restaurantUsername: ""
    };
    this.order = {};
  }

  componentDidMount() {
    //request a restaurant information gotten from QR code scanning
    let restaurantUsername = this.props.location.state.restaurantUsername;
    fetch(`http://localhost:8080/restaurant/${restaurantUsername}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success && responseJson.restaurant) {
          //console.log(responseJson.restaurant);
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

    if (this.props.location.state.hasOwnProperty("order")) {
      this.order = this.props.location.state.order;
    }
  }

  // add or remove a selected item to/from order
  itemSelect(name, price) {
    if (!this.order.hasOwnProperty(`${name}`)) {
      this.order[name] = price;
    } else {
      delete this.order[name];
    }
  }

  //place an order for the restaurant DB, navigate Home
  placeOrder() {
    fetch("http://localhost:8080/placeorder", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify({
        restaurantUsername: this.state.restaurantUsername,
        tableNum: this.state.tableNum,
        order: this.order
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true && responseJson.restaurant) {
          this.props.history.push({
            pathname: "/",
            state: {
              order: this.order,
              restaurantUsername: this.state.restaurantUsername,
              tableNum: this.state.tableNum,
              restaurantName: this.state.restaurantName
            }
          });
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /REGISTER", err);
      });
  }

  render() {
    console.log("ORDER", this.order);
    return (
      <div>
        <Nav />
        <div className="menu-view">
          <h1 className="welcome">Welcome to {this.state.restaurantName}!</h1>
          <div className="menu-sign">Menu</div>

          <div className="menu-list">
            {this.state.menu.map(item => (
              <FoodItem
                key={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                itemSelect={() => this.itemSelect(item.name, item.price)}
              />
            ))}
          </div>

          <button
            className="place-order-btn"
            onClick={this.placeOrder.bind(this)}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default Menu;
