import React from 'react';
import $ from '../node_modules/jquery';
import logo from './logo.svg';
import arrow from './downArrow.png';
import Movie from './Movie.jsx';

class Display extends React.Component {
	constructor(props) {
		super(props);
		this.state = { results: [], value: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		fetch(`https:api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key=${process.env.API_KEY}`)
			.then(body => body.json())
			.then(data => this.setState({ results: data.results }))
			.catch(error => console.warn(error));
	}

	// Changed this to an arrow function so you don't have to use .bind(this)
	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	handleSubmit = event => {
		if (this.state.value === '') {
			fetch(`https:api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key=${process.env.API_KEY}`)
				.then(body => body.json())
				.then(data => this.setState({ results: data.results }))
				.catch(error => console.warn(error));
		} else {
			fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${
					this.state.value
				}&page=1&include_adult=false` /*${process.env.API_KEY} optional {options}*/
			)
				.then(body => body.json())
				.then(data => this.setState({ results: data.results }))
				.catch(error => console.warn(error));
		}
		event.preventDefault();
	};

	dropDown = event => {
		$('.collapsedMenu').hasClass('collapsedMenu')
			? $('.collapsedMenu')
					.addClass('expandedMenu')
					.removeClass('collapsedMenu')
			: $('.expandedMenu')
					.addClass('collapsedMenu')
					.removeClass('expandedMenu');
		$('.extraOptions').toggle();
	};

	handleClick = event => {
		// fetch(`https://api.themoviedb.org/3/movie/${searchTerm}?api_key=${process.env.API_KEY}`)
		// 	.then(body => body.json())
		// 	.then(data => this.setState({ results: data.results }))
		// 	.catch(error => console.warn(error));
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
									this.handleSubmit();
								}
							}}
							type="submit"
							value="Search"
						/>
					</form>
				</header>
				<div className="menu">
					<div className="menuOptions">Home</div>
					<div className="menuOptions">New releases</div>
					<div className="menuOptions">About us</div>
					<a className="menuImage">
						<div onClick={this.dropDown} className="menuOptions">
							More...<img alt={arrow} src={arrow} className="menuImage" />
						</div>
					</a>
				</div>
				<div id="dropDownMenu" className="collapsedMenu">
					<div className="extraOptions">Popular</div>
					<div className="extraOptions">Now playing</div>
					<div className="extraOptions">Top rated</div>
					<div className="extraOptions">Upcoming</div>
				</div>
				<div className="movieContainer">
					{this.getResults.map(result => <Movie key={result.id} result={result} />)}
				</div>
			</div>
		);
	}
}

export default Display;
