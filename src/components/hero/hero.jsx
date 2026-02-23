import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
					Step into the world of unlimited entertainment. From blockbuster films
					to top-rated TV series, find the stories that keep you watching.
					Browse curated collections crafted for every mood and dive into genres
					made just for you.
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
	const navigate = useNavigate()
	return (
		<>
			<div>
				<img
					style={{ height: '300px' }}
					src={movie.backdrop_path || '/image-not-found.png'}
					alt={movie.name || 'movie'}
					onError={e => {
						e.currentTarget.onerror = null
						e.currentTarget.src = '/image-not-found.png'
					}}
				/>
			</div>
			<div className='app__hero-moive__descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length >= 200
						? `${movie.description.slice(0, 200)}...`
						: movie.description}
				</p>
				<button
					className='btn btn__primary'
					onClick={() => navigate(`movie/${movie.id}`)}
				>
					DETAILS
				</button>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
}
