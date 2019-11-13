import React, { Component } from "react";
import Nav from "./Nav";
export class MyPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      payments: []
    };
  }

  componentDidMount() {
    const user = window.localStorage.getItem("user");
    let json = JSON.stringify(eval("(" + user + ")"));
    let parsed = JSON.parse(json);
    if (user) {
      this.setState({
        username: parsed.username
      });
    }
    //fetching user payments data from user db
    fetch(`http://localhost:8080/history/${parsed.username}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success && responseJson.payments) {
          //console.log(responseJson.restaurant);
          let payments = responseJson.payments;
          this.setState({
            payments: payments
          });
        }
      })
      .catch(err => {
        console.log("ERROR in FETCH /RESTAURANT", err);
      });
  }
  render() {
    console.log(this.state.payments);
    return (
      <div>
        <Nav />
        <div className="payments-view">
          <div className="payment-sign">My Payments History</div>
          <div className="payment-list">
            {this.state.payments.map(payment => (
              <ul className="payment-item">
                <div className="pay-name">{payment.restaurantName}</div>
                <div className="pay-total">{payment.total}</div>
                <div className="pay-date">{payment.date}</div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPayments;
