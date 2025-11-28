import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './hero.scss'

const Hero = () => {
	const [movie, setMovie] = useState({})

	const { getRandomMovie, loading, error, clearError } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [])

	const updateMovie = () => {
		clearError()
		getRandomMovie().then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} updateMovie={updateMovie} />
	) : null

	return (
		<div className='app__hero'>
			<div className='app__hero-info'>
				<h2>FIND MOVIES</h2>
				<h1>TV shows and more</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
					sapiente sit placeat minus dolorum, magnam, tempora quas neque quasi,
					sequi odit doloremque velit saepe autem facilis! Laudantium
					consequatur accusantium mollitia.
				</p>
				<div>
					<button className='btn btn__secondary' onClick={updateMovie}>
						RANDOM MOVIE
					</button>
				</div>
			</div>
			<div className='app__hero-moive'>
				{errorContent}
				{loadingContent}
				{content}
			</div>
		</div>
	)
}

export default Hero

const Content = ({ movie }) => {
	return (
		<>
			<div>
				<img src={movie.backdrop_path} alt='img' />
			</div>
			<div className='app__hero-moive__descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length >= 200
						? `${movie.description.slice(0, 200)}...`
						: movie.description}
				</p>
				<button className='btn btn__primary'>DETAILS</button>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
}
