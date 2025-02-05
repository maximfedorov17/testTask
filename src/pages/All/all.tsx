import { Goods } from '../Goods/goods'
import { Users } from '../Users/users'
import './all.css'
export const All = () => {
	return (
		<>
			<div className='allContainer'>
				<Users adminMode={false} />
				<Goods />
			</div>
		</>
	)
}
