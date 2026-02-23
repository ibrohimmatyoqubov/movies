import { Link } from 'react-router-dom'
import './footer.scss'

const Footer = () => {
	return (
		<footer className='app__footer'>
			<div className='app__footer-content container'>
				<div className='app__footer-top'>
					<ul className='app__footer-links'>
						<li>
							<Link to={'/trending'}>Trending</Link>
						</li>
						<li>
							<Link to={'/popular'}>Popular</Link>
						</li>
					</ul>

					<div className='app__footer-logo'>
						<img src='/logo.svg' alt='logo' />
						<img src='/logo-text.svg' alt='logo text' />
					</div>
				</div>

				<p className='app__footer-copy'>
					© {new Date().getFullYear()} FindMovies. All rights reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer
