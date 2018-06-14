import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router';
import $ from '../node_modules/jquery';
import logo from './logo.svg';
import arrow from './downArrow.png';
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
	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	handleSubmit = event => {
		fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${
				this.state.value
			}&page=1&include_adult=false` /*${process.env.API_KEY} optional {options}*/
		)
			.then(body => body.json())
			.then(data => this.setState({ results: data.results }))
			.catch(error => console.warn(error));
		event.preventDefault();
	};

	handleClick = event => {
		$('.collapsedMenu').hasClass('collapsedMenu')
			? $('.collapsedMenu')
					.addClass('expandedMenu')
					.removeClass('collapsedMenu')
			: $('.expandedMenu')
					.addClass('collapsedMenu')
					.removeClass('expandedMenu');
		$('.extraOptions').toggle();
	};

	// Added a helper method to get the results that need to be displayed
	get getResults() {
		const { results, value } = this.state;
		// Ideally all of your string comparisons should be done with lowercase text
		if (value) {
			// Here I am using filter in order to only display the results that match the filter parameters
			return results.filter(
				r =>
					r.title.toLowerCase().includes(value.toLowerCase()) ||
					r.overview.toLowerCase().includes(value.toLowerCase())
			);
		}
		return results;
	}

	render() {
		// Changed <input handleChange to <input onChange
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Movies!</h1>
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} value={this.state.value} />
						<input
							onKeyPress={e => {
								if (e.keyCode === 13) {
									this.handleSubmit;
								}
							}}
							type="submit"
							value="Search"
						/>
					</form>
				</header>
				<div className="menu">
					<div className="menuOptions">Home</div>
					<div className="menuOptions">Movies near you</div>
					<div className="menuOptions">About us</div>
					<a className="menuImage">
						<div onClick={this.handleClick} className="menuOptions">
							More...<img alt={arrow} src={arrow} className="menuImage" />
						</div>
					</a>
				</div>
				<div id="dropDownMenu" className="collapsedMenu">
					<div className="extraOptions">1</div>
					<div className="extraOptions">2</div>
					<div className="extraOptions">3</div>
					<div className="extraOptions">4</div>
					<div className="extraOptions">5</div>
					<div className="extraOptions">6</div>
				</div>
				<div className="movieContainer">
					{this.getResults.map(result => <Movie key={result.id} result={result} />)}
				</div>
			</div>
		);
	}
}

export default App;
