import { Goods } from '../../Goods'
import { Users } from '../../Users'
import './all.css'
export const All = () => {
	return (
		<>
			<div className='allContainer'>
				<Users adminMode={false} />
				<Goods adminMode={false} />
			</div>
		</>
	)
}
