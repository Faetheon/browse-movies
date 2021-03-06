import React from 'react';
import './Movie.css';

const Movie = function(props) {
	return (
		<div className="movieAttributes">
			<div className="imageContainer">
				<img
					className="moviePoster"
					alt={props.result.overview}
					src={`https://image.tmdb.org/t/p/w500${props.result.poster_path}?api_key=${process.env.API_KEY}`}
				/>
			</div>
			<div className="descriptionContainer">
				<p>Title: {props.result.title}</p>
				<p>Overview: {props.result.overview}</p>
				<p>Popularity: {props.result.popularity}</p>
				<p>Ratings: {props.result.vote_count}</p>
			</div>
		</div>
	);
};

export default Movie;
