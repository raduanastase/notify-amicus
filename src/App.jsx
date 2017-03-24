import React, {Component} from 'react';
import {PageHeader, Grid, Row} from 'react-bootstrap';
import ThumbProject from './ThumbProject.jsx';
import ModalProject from './ModalProject.jsx';

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refreshCache = this.refreshCache.bind(this);

    this.state = {
      visibleModal: false,
      subscribeUrl: null,
      modalTitle: null
    };
  }

  render() {
    return (
      <Grid>
        <PageHeader onClick={this.refreshCache}>Notify Amicus</PageHeader>
        <Row>
          {this.props.data.map((list, index) => (
            <ThumbProject key={index} {...list} onClick={this.showModal}/>
          ))}
        </Row>
        <ModalProject closeModal={this.closeModal} visibleModal={this.state.visibleModal}
                      subscribeUrl={this.state.subscribeUrl} modalTitle={this.state.modalTitle}/>
      </Grid>
    );
  }

  showModal(subscribeUrl, modalTitle) {
    this.setState({
      visibleModal: true,
      subscribeUrl: subscribeUrl,
      modalTitle: modalTitle
    });
  }

  closeModal() {
    this.setState({visibleModal: false});
  }

  refreshCache() {
    fetch(`${this.props.baseUrl}api.php`)
      .then(response => {
        return response.json();
      })
      .then(() => {
        window.location.reload(true);
      });
  }
}
