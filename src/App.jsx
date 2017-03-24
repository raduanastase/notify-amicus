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
      subscribe_link: '',
      title: '',
      image: '',
      description: ''
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
        <ModalProject closeModal={this.closeModal} baseUrl={this.props.baseUrl} {...this.state}/>
      </Grid>
    );
  }

  showModal(projectData) {
    this.setState({
      visibleModal: true,
      subscribe_link: projectData.subscribe_link,
      title: projectData.title,
      image: projectData.image,
      description: projectData.description,
      listId: projectData.id
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
