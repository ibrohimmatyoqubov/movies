import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'
import './movie-info.scss'

const MovieInfo = ({ movieId }) => {
	const [movie, setMovie] = useState(null)

	const { getDetailedMovie, loading, error } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [movieId])

	const updateMovie = () => {
		if (!movieId) {
			return
		}

		getDetailedMovie(movieId).then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} />
	) : null

	return (
		<div className='movieinfo'>
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}
MovieInfo.propTypes = {
	movieId: PropTypes.number,
}

export default MovieInfo

const Content = ({ movie }) => {
	const navigate = useNavigate()

	return (
		<>
			<div>
				<img src={movie.backdrop_path} alt='img' />
			</div>
			<div className='hero-moive__descr'>
				<h2>{movie.name}</h2>
				<p>{movie.description}</p>
				<button
					style={{ width: '100%' }}
					className='btn btn__light'
					onClick={() => navigate(`/movie/${movie.id}`)}
				>
					details
				</button>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
}
