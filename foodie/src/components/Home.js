import React, { Component } from "react";
import Nav from "./Nav";
import QrReader from "react-qr-reader";

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
      order: {}
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
      this.setState({ order: this.props.location.state.order });
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

  handleError(err) {
    console.error(err);
  }

  qrShow() {
    this.setState({ scan: true });
  }

  render() {
    let _ = require("underscore");
    console.log("Order", this.state.order);
    return (
      <div>
        <Nav />
        <div className="homeView">
          <h1 className="home">Table ordering made simple!</h1>

          {_.isEmpty(this.state.order) === false ? (
            <div>
              <button className="orderMore-btn">Order</button>
              <div>
                My Order
                <button className="pay-btn">Pay</button>
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

//goes between Nav and last </div>
{
  /* <div className="homeView">
  <h1 className="home">Table ordering made simple!</h1>
  {this.state.scan ? (
    <div>
      <div className="qr-square">
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  ) : (
      <button className="qr-button" onClick={this.qrShow.bind(this)}>
        SCAN QR
            </button>
    )}
</div> */
}
