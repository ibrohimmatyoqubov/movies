import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useLocation } from 'react-router-dom'
import useMovieService from '../../services/movie-service'
import Error from '../error/error'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import Spinner from '../spinner/spinner'
import './row-movies.scss'

const RowMovies = () => {
	const [movies, setMovies] = useState([])
	const [open, setOpen] = useState(false)
	const [movieId, setMovieId] = useState(null)
	const [page, setPage] = useState(2)
	const [newItemLoading, setNewItemLoading] = useState(false)

	const { pathname } = useLocation()

	const { getTrendingMovies, loading, error, getPopularMovies } =
		useMovieService()

	useEffect(() => {
		getMovies()
	}, [])

	const onClose = () => setOpen(false)

	const onOpen = id => {
		setMovieId(id)
		setOpen(true)
	}

	const getMovies = page => {
		if (pathname === '/popular') {
			getPopularMovies(page)
				.then(res => setMovies(movies => [...movies, ...res]))
				.finally(() => {
					setNewItemLoading(false)
				})
		} else {
			getTrendingMovies(page)
				.then(res => setMovies(movies => [...movies, ...res]))
				.finally(() => {
					setNewItemLoading(false)
				})
		}
	}

	const getMoreMovies = () => {
		setPage(page => page + 1)
		setNewItemLoading(true)
		getMovies(page)
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner width='100px' /> : null

	return (
		<div className='app__rowmovie'>
			<div className='app__rowmovie-top'>
				<div className='app__rowmovie-top__title'>
					<img src='/tranding.svg' alt='' />
					<h1>{pathname === '/popular' ? 'Popular' : 'Trending'}</h1>
				</div>
				<div className='hr' />
			</div>

			{errorContent}
			{loadingContent}

			<Content movies={movies} onOpen={onOpen} />

			{error ? null : (
				<div className='app__rowmovie-loadmore'>
					<button
						className='btn btn__secondary'
						onClick={getMoreMovies}
						disabled={newItemLoading}
					>
						Load More
					</button>
				</div>
			)}

			<Modal
				open={open}
				onClose={onClose}
				styles={{
					overlay: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '16px',
					},
					modalContainer: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
					},
					modal: {
						width: 'min(620px, 85vw)',
						maxHeight: '92vh',
						overflow: 'auto',
						padding: '16px',
						borderRadius: '14px',
					},
					closeButton: {
						top: '10px',
						right: '10px',
					},
				}}
			>
				<MovieInfo movieId={movieId} />
			</Modal>
		</div>
	)
}

export default RowMovies

const Content = ({ movies, onOpen }) => {
	return (
		<div className='app__rowmovie-lists'>
			{movies.map(movie => (
				<RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
			))}
		</div>
	)
}

Content.propTypes = {
	movies: PropTypes.array,
	onOpen: PropTypes.func,
}
