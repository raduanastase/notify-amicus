import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export default class ModalProject extends Component {
  constructor(...args) {
    super(...args);

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onIframeLoad = this.onIframeLoad.bind(this);

    this.state = {
      iframeLoaded: false
    }
  }

  render() {
    return (
      <Modal show={this.props.visibleModal} onHide={this.onCloseModal} bsSize="large" className="modal-project">
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src={this.props.subscribeUrl} onLoad={this.onIframeLoad} className={!this.state.iframeLoaded && 'hidden'}>
            <p>Your browser does not support iframes.</p>
          </iframe>
          {!this.state.iframeLoaded && (<img src="build/loading.gif"/>)}
        </Modal.Body>
      </Modal>
    );
  }

  onIframeLoad(event) {
    this.resizeIframe(event.currentTarget);
    this.setState({iframeLoaded: true});
  }

  resizeIframe(obj) {
    console.log(obj);
    //obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }

  onCloseModal() {
    this.setState({iframeLoaded: false});

    this.props.closeModal();
  }
}