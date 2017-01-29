import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
    super(props);

    this.state = {
      results: []
    };

    this.performAPIRequest();
  }

  performAPIRequest() {
  	fetch(`/api/agencies-with-coverage`)
    .then(response => {
      response.json().then(data => {
        console.log('data',data);
        this.setState({results: data});
        console.log('results',this.state.results);
      });
    }).catch(error => {
      this.setState({results: null});
   });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Title</h2>
        </div>
      </div>
    );
  }
}

export default App;
