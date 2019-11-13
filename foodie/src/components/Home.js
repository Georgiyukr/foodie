import React, { Component } from "react";
import Nav from "./Nav";
import QrReader from "react-qr-reader";
import OrderedItem from "./OrderedItem";
import pic1 from "./pics/res1.jpg";
import pic2 from "./pics/res2.png";
import pic3 from "./pics/res3.jpeg";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      restaurantUsername: "",
      restaurantName: "",
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
    let json = JSON.stringify(eval("(" + user + ")"));
    let parsed = JSON.parse(json);
    if (user) {
      this.setState({
        user: {
          name: parsed.name,
          userid: parsed.userid,
          username: parsed.username
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
        tableNum: this.props.location.state.tableNum,
        restaurantName: this.props.location.state.restaurantName
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

  // submit payment to the user payment dB
  pay() {
    fetch("http://localhost:8080/pay", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify({
        username: this.state.user.username,
        total: this.state.total,
        restaurantName: this.state.restaurantName
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true && responseJson.user) {
          this.deleteOrder();
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /PAY", err);
      });
  }

  // delete order from the restaurant DB
  deleteOrder() {
    fetch("http://localhost:8080/deletecustomer", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify({
        restaurantUsername: this.state.restaurantUsername,
        tableNum: this.state.tableNum
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success === true && responseJson.restaurant) {
          console.log("HERE");
          this.props.history.push({
            pathname: "/success",
            state: {
              restaurantName: this.state.restaurantName
            }
          });
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /DELETECUSTOMER", err);
      });
  }

  render() {
    let _ = require("underscore");
    console.log("USERNAME", this.state.user);
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
              <button className="pay-btn" onClick={this.pay.bind(this)}>
                Pay
              </button>
              <div className="images">
                <img className="image image1" src={pic2} />
                <img className="image image2" src={pic1} />
                <img className="image image3" src={pic3} />
              </div>
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
              <div className="images">
                <img className="image image1" src={pic2} alt="image-2" />
                <img className="image image2" src={pic1} alt="image-1" />
                <img className="image image3" src={pic3} alt="image-3" />
              </div>
            </div>
          ) : (
            <div>
              <button className="qr-button" onClick={this.qrShow.bind(this)}>
                SCAN QR
              </button>
              <p className="quote">
                When you wait for a waiter in a restaurant, doesn't that make
                you the waiter?
              </p>
              <div className="images">
                <img className="image image1" src={pic2} alt="image-2" />
                <img className="image image2" src={pic1} alt="image-1" />
                <img className="image image3" src={pic3} alt="image-3" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
