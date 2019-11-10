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
      isLoggedIn: false,
      scanned: false
    };
    this.handleScan = this.handleScan.bind(this);
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
          tableNum: this.state.tableNum,
          scanned: true,
          isLoggedIn: true
        }
      });
    }
  }

  handleError(err) {
    console.error(err);
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
        },
        isLoggedIn: true
      });
    } else {
      this.props.history.push("/login");
    }
  }

  qrShow() {
    this.setState({ scanned: true });
  }

  render() {
    // console.log("HOME", this.state.user);
    return (
      <div>
        <Nav />
        {this.state.scanned ? (
          <div>
            <button className="home-order-button">ORDER</button>

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
      </div>
    );
  }
}

export default Home;
