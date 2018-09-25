import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import $ from '../node_modules/jquery';
import logo from './logo.svg';
import Home from './Home.jsx';
import Popular from './Popular.jsx';
import arrow from './downArrow.png';
import './App.css';

class App extends React.Component {
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

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Welcome to Movies!</h1>
					</header>
					<div className="menu">
						<Link to="/" className="menuOptions">
							Home
						</Link>
						<div className="menuOptions">New releases</div>
						<div className="menuOptions">About us</div>
						<a className="menuImage">
							<div onClick={this.dropDown} className="menuOptions">
								More...<img alt={arrow} src={arrow} className="menuImage" />
							</div>
						</a>
					</div>
					<div id="dropDownMenu" className="collapsedMenu">
						<Link to="popular" className="extraOptions">
							Popular
						</Link>
						<div className="extraOptions">Now playing</div>
						<div className="extraOptions">Top rated</div>
						<div className="extraOptions">Upcoming</div>
					</div>
					<Switch>
						<Route path="/" component={Home} />
						<Route path="/popular/" component={Popular} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
