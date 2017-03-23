import React, {Component} from 'react';
import {Col} from 'react-bootstrap';

export default class ThumbProject extends Component {
  render() {
    return (
        <Col className="thumb-project" xs={12} md={4} onClick={this.props.onClick}>
          <div className="image-wrapper"><img src={this.props.image}/></div>
          <div className="description">{this.props.title}</div>
        </Col>
    );
  }
}