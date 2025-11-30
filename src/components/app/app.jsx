import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'
import Spinner from '../spinner/spinner'
import './app.scss'

const HomePage = lazy(() => import('../../pages/home-page'))
const TrendingPage = lazy(() => import('../../pages/trending-page'))
const PopularPage = lazy(() => import('../../pages/popular-page'))
const DetailedPage = lazy(() => import('../../pages/detailed-page'))
const NotFoundPage = lazy(() => import('../../pages/not-found-page'))

const App = () => {
	return (
		<div className='app'>
			<Navbar />
			<Suspense fallback={<Spinner width='70px' />}>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/trending' element={<TrendingPage />} />
					<Route path='/popular' element={<PopularPage />} />
					<Route path='/movie/:movieId' element={<DetailedPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Suspense>

			<div className='line' />
			<Footer />
		</div>
	)
}

export default App
