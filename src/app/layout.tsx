import { Outlet } from 'react-router-dom'
import { Navigation } from '../widgets/navigation'

const Layout = () => {
	return (
		<>
			<header>
				<Navigation />
			</header>

			<main>
				<Outlet />
			</main>
		</>
	)
}

export default Layout
