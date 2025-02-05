interface Good {
	name: string
	price: number
}

import './good.css'
export const Good: React.FC<Good> = ({ name, price }: Good) => {
	return (
		<>
			<div className='product-card'>
				<div className='product-image'></div>
				<div className='product-details'>
					<h2 className='product-title'>{name}</h2>
					<div className='product-price'>
						<span className='price'>{price} ₽</span>
						<button className='buy-button'>Купить</button>
					</div>
				</div>
			</div>
		</>
	)
}
