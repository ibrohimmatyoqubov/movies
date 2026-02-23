import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import Spinner from '../spinner/spinner'

const MovieTrailer = ({ movieId }) => {
	const [trailer, setTrailer] = useState(null)

	const { getMovieTrailer, error, loading, clearError } = useMovieService()

	useEffect(() => {
		let cancelled = false

		const loadTrailer = async () => {
			if (!movieId) return
			clearError?.()
			setTrailer(null)

			const trailerURL = await getMovieTrailer(movieId)
			if (!cancelled) setTrailer(trailerURL)
		}

		loadTrailer()
		return () => {
			cancelled = true
		}
	}, [movieId, getMovieTrailer, clearError])

	if (loading) return <Spinner />
	if (error) return <Error />
	if (!trailer) return <p style={{ color: 'black' }}>Trailer not found</p>

	return (
		<div style={{ width: '100%', aspectRatio: '16 / 9' }}>
			<iframe
				src={trailer}
				title='Movie Trailer'
				allow='autoplay; fullscreen'
				allowFullScreen
				style={{ width: '100%', height: '100%', border: 0 }}
			/>
		</div>
	)
}

MovieTrailer.propTypes = {
	movieId: PropTypes.string,
}

export default MovieTrailer
