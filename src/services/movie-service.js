import { useCallback } from 'react'
import { useHttp } from '../hooks/use-http'

const useMovieService = () => {
	const { loading, error, request, clearError } = useHttp()

	const _apiBase = 'https://api.themoviedb.org/3'
	const _apiLng = 'language=en-US'
	const _apiKey = 'api_key=bede3a7502714a7bf84c61ace86e8d45'
	const _apiImg = 'https://image.tmdb.org/t/p/original'
	const _apiPage = 1

	const getPopularMovies = async (page = _apiPage) => {
		const response = await request(
			`${_apiBase}/movie/popular?${_apiLng}&page=${page}&${_apiKey}`
		)
		const movies = response.results
		return movies && movies.map(movie => _transformMovie(movie))
	}

	const getTrendingMovies = async (page = _apiPage) => {
		const response = await request(
			`${_apiBase}/movie/top_rated?${_apiLng}&page=${page}&${_apiKey}`
		)
		const movies = response.results
		return movies && movies.map(movie => _transformMovie(movie))
	}

	const getMovieTrailer = useCallback(
		async id => {
			try {
				const response = await request(
					`${_apiBase}/movie/${id}/videos?${_apiLng}&${_apiKey}`
				)

				if (!response || !response.results || response.results.length === 0) {
					return null
				}

				const video =
					response.results.find(
						v => v.type === 'Trailer' && v.site === 'YouTube'
					) || response.results.find(v => v.site === 'YouTube')

				if (!video) return null

				return `https://www.youtube.com/embed/${video.key}`
			} catch (err) {
				console.error('Trailerni olishda xatolik:', err)
				return null
			}
		},
		[request]
	)

	const getDetailedMovie = useCallback(
		async id => {
			const movie = await request(
				`${_apiBase}/movie/${id}?${_apiLng}&${_apiKey}`
			)
			return _transformMovie(movie)
		},
		[request]
	)

	const getRandomMovie = async () => {
		const res = await getPopularMovies()
		const movie = res[Math.floor(Math.random() * res.length)]
		return movie
	}

	const _transformMovie = movie => {
		return {
			name: movie.original_title,
			description: movie.overview,
			backdrop_path: `${_apiImg}${movie.backdrop_path}`,
			poster_path: `${_apiImg}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average,
		}
	}

	return {
		getPopularMovies,
		getTrendingMovies,
		getMovieTrailer,
		getDetailedMovie,
		getRandomMovie,
		clearError,
		loading,
		error,
	}
}

export default useMovieService
