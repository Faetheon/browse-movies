import React from 'react';

const Movie = function(props) {
	return (
		<div className="movieAttributes">
			<div className="imageContainer">
				<img
					className="moviePoster"
					alt={`https://api.themoviedb.org/3${props.result.overview}?api_key=${process.env.API_KEY}`}
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
