import React, { Component } from "react";

export class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  render() {
    return (
      <button
        className={`${this.state.clicked ? "selected-item" : "item"}`}
        onClick={() => {
          this.props.itemSelect(this.props.name, this.props.price);
          this.setState({ clicked: !this.state.clicked });
        }}
      >
        <div className="item-name">{this.props.name}</div>
        <div className="item-description">{this.props.description}</div>
        <div className="item-price">{this.props.price}</div>
      </button>
    );
  }
}

export default FoodItem;
