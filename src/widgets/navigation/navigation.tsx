import { Link } from 'react-router-dom'
import './navigation.css'
export const Navigation = () => {
	return (
		<>
			<div className='tab-headers'>
				<Link to='/' className='tab-header' data-target='content1'>
					Вкладка 1
				</Link>
				<Link to='/goods' className='tab-header' data-target='content2'>
					Вкладка 2
				</Link>
				<Link to='/all' className='tab-header' data-target='content3'>
					Вкладка 3
				</Link>
			</div>
		</>
	)
}
