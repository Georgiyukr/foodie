import React, { Component } from "react";
import Nav from "./Nav";
import QrReader from "react-qr-reader";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: "No result",
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
      this.setState({
        result: data
      });
    }
  }

  handleError(err) {
    console.error(err);
  }

  //redirect to login page if user is not logged in
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.user) {
        this.setState({
          user: {
            name: this.props.location.state.user.name,
            userid: this.props.location.state.user._id,
            username: this.props.location.state.user.username
          },
          isLoggedIn: true
        });
      }
    } else {
      this.props.history.push("/login");
    }
  }

  // checkIfLogged = (navData) => {
  //   this.setState({ isLoggedIn: navData });
  // };

  qrShow() {
    this.setState({ scanned: true });
  }

  render() {
    console.log("HOME", this.state.user);
    return (
      <div>
        {/* <p1>Home</p1> */}
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
              <p>{this.state.result}</p>
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
