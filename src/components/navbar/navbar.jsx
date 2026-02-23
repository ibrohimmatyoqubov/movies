import { Link, NavLink } from 'react-router-dom'
import { navbar_links } from '../../constants'
import './navbar.scss'
import logoText from '/logo-text.svg'
import logo from '/logo.svg'

const Navbar = () => {
	return (
		<div className='navbar container'>
			<div className='navbar__logo'>
				<Link to={'/'}>
					<img className='navbar__logo-icon' src={logo} alt='Logo' />
					<img className='navbar__logo-text' src={logoText} alt='Logo Text' />
				</Link>
			</div>

			<nav className='navbar__menu'>
				<ul>
					{navbar_links.map(item => (
						<li key={item.route}>
							<NavLink
								to={item.route}
								className={({ isActive }) => (isActive ? 'active' : '')}
							>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

export default Navbar
