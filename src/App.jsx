import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(
      `https:api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key=${
        process.env.API_KEY
      }` /*${process.env.API_KEY} optional {options}*/
    )
      .then(body => body.json())
      .then(data => this.setState({ results: data.results }))
      .catch(error => console.warn(error));
  }

  // Changed this to an arrow function so you don't have to use .bind(this)
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  // Added a helper method to get the results that need to be displayed
  get getResults() {
    const { results, value } = this.state;
    // Ideally all of your string comparisons should be done with lowercase text
    if (value) {
      // Here I am using filter in order to only display the results that match the filter parameters
      return results.filter((r) => r.title.includes(value) || r.overview.includes(value));
    }
    return results;
  }

  render() {
    // Changed <input handleChange to <input onChange
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.value} />
            <input type="submit" value="Search" />
          </form>
        </header>
        <div className="movieContainer">
          {this.getResults.map(result => <Movie key={result.id} result={result} />)}
        </div>
      </div>
    );
  }
}

export default App;
