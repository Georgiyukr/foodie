import React, { Component } from "react";
import Nav from "./Nav";
import QrReader from "react-qr-reader";
import OrderedItem from "./OrderedItem";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      restaurantUsername: "",
      tableNum: "",
      user: {
        name: "",
        userid: "",
        username: ""
      },
      scan: false,
      order: {},
      total: Number
    };
    this.handleScan = this.handleScan.bind(this);
  }

  //redirect to login page if user is not logged in
  componentDidMount() {
    const user = window.localStorage.getItem("user");
    console.log(user);
    if (user) {
      this.setState({
        user: {
          name: user.name,
          userid: user.userid,
          username: user.username
        }
      });
    } else {
      this.props.history.push("/login");
    }

    if (this.props.location.state) {
      let total = 0;
      Object.entries(this.props.location.state.order).map(([key, value]) => {
        total += Number(value);
        console.log("TOTAL", total);
      });
      this.setState({
        order: this.props.location.state.order,
        total: total,
        restaurantUsername: this.props.location.state.restaurantUsername,
        tableNum: this.props.location.state.tableNum
      });
    }
  }

  handleScan(data) {
    if (data) {
      let split = data.split(" ");
      this.setState({
        restaurantUsername: split[0],
        tableNum: split[1]
      });

      this.props.history.push({
        pathname: "/menu",
        state: {
          restaurantUsername: this.state.restaurantUsername,
          tableNum: this.state.tableNum
        }
      });
    }
  }

  orderMore() {
    this.props.history.push({
      pathname: "/menu",
      state: {
        restaurantUsername: this.state.restaurantUsername,
        tableNum: this.state.tableNum,
        order: this.state.order
      }
    });
  }

  handleError(err) {
    console.error(err);
  }

  qrShow() {
    this.setState({ scan: true });
  }

  render() {
    let _ = require("underscore");
    console.log("Order", Object.keys(this.state.order));
    return (
      <div>
        <Nav />
        <div className="homeView">
          <h1 className="home">Table ordering made simple!</h1>

          {_.isEmpty(this.state.order) === false ? (
            <div>
              <h1 className="myorder-sign">My Order</h1>

              <div className="order-display">
                {Object.entries(this.state.order).map(([key, value]) => (
                  <OrderedItem name={key} price={value} />
                ))}
              </div>
              <div className="total">Total: ${this.state.total}</div>
              <button
                className="orderMore-btn"
                onClick={this.orderMore.bind(this)}
              >
                Order More
              </button>
              <button className="pay-btn">Pay</button>
            </div>
          ) : this.state.scan ? (
            <div>
              <div className="qr-square">
                <QrReader
                  delay={this.state.delay}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: "100%" }}
                />
              </div>
              Maybe Pictures
            </div>
          ) : (
            <button className="qr-button" onClick={this.qrShow.bind(this)}>
              SCAN QR
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
