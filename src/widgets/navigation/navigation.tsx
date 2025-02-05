import { Link } from 'react-router-dom'
import './navigation.css'
export const Navigation = () => {
	return (
		<>
			<div className='tab-headers'>
				<Link to='/' className='tab-header' data-target='content1'>
					Users
				</Link>
				<Link to='/goods' className='tab-header' data-target='content2'>
					Goods
				</Link>
				<Link to='/all' className='tab-header' data-target='content3'>
					All
				</Link>
			</div>
		</>
	)
}
