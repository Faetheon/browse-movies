import React from 'react';
import Movie from './Movie.jsx';

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = { results: [] };
	}

	componentDidMount() {
		fetch(`https:api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.API_KEY}`)
			.then(body => body.json())
			.then(data => this.setState({ results: data.results }))
			.catch(error => console.warn(error));
	}

	render() {
		return <div>{this.getResults.map(result => <Movie key={result.id} result={result} />)}</div>;
	}
}

export default Popular;
