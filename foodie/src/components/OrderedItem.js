import React, { Component } from "react";

export class OrderedItem extends Component {
  render() {
    return (
      <div>
        <div className="order-display-item ordered-name">{this.props.name}</div>
        <div className="order-display-item ordered-price">
          {this.props.price}
        </div>
      </div>
    );
  }
}

export default OrderedItem;
