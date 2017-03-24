import React, {Component} from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';

export default class ModalProject extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      email: '',
      firstName: '',
      lastName: ''
    };

    this.onSubscribeClick = this.onSubscribeClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  render() {
    return (
      <Modal show={this.props.visibleModal} onHide={this.props.closeModal} bsSize="large" className="modal-project">
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="image-wrapper">
            <Col xs={12}>
              <img src={this.props.image && this.props.image}/>
            </Col>
          </Row>
          <Row className="text-wrapper">
            <Col xs={12}>
              <Row>
                <Col xs={12}>
                  {this.props.description}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <label htmlFor="email">
                    Email<span className="asterisk">*</span>
                    <input name="email" type="email" id="email" value={this.state.email} onChange={this.handleEmailChange}/>
                  </label>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <label htmlFor="first-name">
                    Prenumele
                    <input name="first-name" type="text" id="first-name"/>
                  </label>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <label htmlFor="last-name">
                    Numele
                    <input name="last-name" type="text" id="last-name"/>
                  </label>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button onClick={this.onSubscribeClick}>Subscribe</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  handleEmailChange() {
    this.setState({email: event.target.value});
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange() {
    this.setState({lastName: event.target.value});
  }

  onSubscribeClick() {
    fetch(`${this.props.baseUrl}api.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        json_data: {
          "email_address": this.state.email,
          "status": "pending",
          "merge_fields": {
            "FNAME": this.state.firstName,
            "LNAME": this.state.lastName
          }
        },
        list_id: this.props.id,
      })
    })
      .then(() => {
        console.log('OK');
      })
      .catch(() => {
        alert('A aparut o eroare la inscriere!');
      });
  }
}