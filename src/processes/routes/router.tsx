import { createBrowserRouter } from 'react-router-dom'
import Layout from '../../app/layout'
import { All } from '../../pages/All/all'
import { Goods } from '../../pages/Goods/goods'
import { Users } from '../../pages/Users/users'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Users adminMode={true} /> },
			{ path: 'goods', element: <Goods /> },
			{ path: 'all', element: <All /> },
		],
	},
])
