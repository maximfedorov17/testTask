import { createBrowserRouter } from 'react-router-dom'
import Layout from '../../app/layout'
import { All } from '../../pages/All'
import { Goods } from '../../pages/Goods'
import { Users } from '../../pages/Users'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Users adminMode={true} /> },
			{ path: 'goods', element: <Goods adminMode={true} /> },
			{ path: 'all', element: <All /> },
		],
	},
])
