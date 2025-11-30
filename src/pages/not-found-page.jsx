import { Link } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '70vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<img src='/error.gif' alt='error' width={'300px'} />
			<h1>Page not found</h1>
			<button className='btn btn-secondary' style={{ marginTop: '20px' }}>
				<Link to={'/'}>Home Page</Link>
			</button>
		</div>
	)
}

export default NotFoundPage
