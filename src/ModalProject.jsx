import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class ModalProject extends Component {
  render() {
    return (
      <Modal show={this.props.visibleModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}