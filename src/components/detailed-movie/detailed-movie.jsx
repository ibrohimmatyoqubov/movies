import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import { useParams } from 'react-router-dom'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import MovieTrailer from '../movie-trailer/movie-trailer'
import Spinner from '../spinner/spinner'
import './detailed-movie.scss'

const DetailedMovie = () => {
	const [movie, setMovie] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { movieId } = useParams()

	const { getDetailedMovie, error, loading } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [movieId])

	const updateMovie = () => {
		if (!movieId) {
			return
		}

		getDetailedMovie(movieId).then(res => setMovie(res))
	}

	const openTrailerModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading || !movie) ? (
		<Content movie={movie} onWatchTrailer={openTrailerModal} />
	) : null

	return (
		<>
			{errorContent}
			{loadingContent}
			{content}

			<Modal
				open={isModalOpen}
				onClose={closeModal}
				center
				styles={{
					overlay: {
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					},
					modalContainer: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
					},
					modal: {
						padding: '1.5rem',
						width: 'min(1000px, 92vw)',
						maxHeight: '90vh',
						overflow: 'auto',
						borderRadius: '12px',
						overflowX: 'hidden',
					},
					closeButton: {
						top: '5px',
						right: '5px',
						width: '25px',
						height: '25px',
						borderRadius: '50%',
						boxShadow: '0 0 5px rgba(0,0,0,0.2)',
					},
				}}
			>
				{isModalOpen && <MovieTrailer movieId={movieId} />}
			</Modal>
		</>
	)
}

export default DetailedMovie

const Content = ({ movie, onWatchTrailer }) => {
	return (
		<div className='detailedmovie'>
			<div className='detailedmovie__image'>
				<img src={movie.poster_path} alt={movie.name} />
			</div>
			<div className='detailedmovie__descr'>
				<h1>{movie.name}</h1>
				<p>{movie.description}</p>
				<div className='detailedmovie__descr-info'>
					<img src='/date.svg' alt='date' />
					<p>{movie.release_date}</p>
					<div className='dot' />
					<p>{movie.vote_average.toFixed(1)}</p>
					<img src='/star.svg' alt='star' />
				</div>
				<button className='btn btn__secondary' onClick={onWatchTrailer}>
					Watch Trailer
				</button>
			</div>
		</div>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
	onWatchTrailer: PropTypes.func.isRequired,
}
