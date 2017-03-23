import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

export default class ThumbProject extends Component {
  constructor(...args) {
    super(...args);

    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
        <Col className="thumb-project" xs={12} md={4} onClick={this.onClick}>
          <div className="image-wrapper"><img src={this.props.image}/></div>
          <div className="description">{this.props.title}</div>
        </Col>
    );
  }

  onClick() {
    this.props.onClick(this.props.subscribe_link);
  }
}