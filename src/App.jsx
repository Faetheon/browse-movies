import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(
      `https:api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key=${
        process.env.API_KEY
      }` /*${process.env.API_KEY} optional {options}*/
    )
      .then(body => body.json())
      .then(data => this.setState({ data }))
      .catch(error => console.warn(error));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <form onSubmit={this.handleSubmit}>
            <input handleChange={this.handleChange.bind(this)} />
            <input type="submit" value="Search" />
          </form>
        </header>
        <div className="movieContainer">
          {this.state.data.results
            ? this.state.data.results.map(result => <Movie key={result.id} result={result} />)
            : null}
        </div>
      </div>
    );
  }
}

export default App;
