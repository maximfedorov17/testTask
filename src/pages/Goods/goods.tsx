import { Good } from '../../entities/good/good'
import { goods } from '../../processes/data/goods'
import './goods.css'
export const Goods = () => {
	return (
		<>
			<div className='goods-container'>
				{goods.map(good => (
					<Good key={good.id} name={good.name} price={good.price} />
				))}
			</div>
		</>
	)
}
