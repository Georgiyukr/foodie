import React, { Component } from "react";

export class FoodItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="item">
        <div className="item-name">{this.props.name}</div>
        <div className="item-description">{this.props.description}</div>
        <div className="item-price">{this.props.price}</div>
      </div>
    );
  }
}

export default FoodItem;
