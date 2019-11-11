import React, { Component } from "react";

export class FoodItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className="item"
        onClick={() => this.props.itemSelect(this.props.name, this.props.price)}
      >
        <div className="item-name">{this.props.name}</div>
        <div className="item-description">{this.props.description}</div>
        <div className="item-price">{this.props.price}</div>
      </button>
    );
  }
}

export default FoodItem;
