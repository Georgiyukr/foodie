import React, { Component } from "react";

export class OrderedItem extends Component {
  constructor(props) {
    super(props);
  }

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
