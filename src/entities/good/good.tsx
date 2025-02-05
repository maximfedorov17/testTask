import './good.css'

export interface GoodData {
	id: number
	name: string
	price: number
}
interface Good {
	id: number
	name: string
	price: number
	adminMode: boolean
	delete: (id: number) => void
	redact: (id: number, newName: string, newAge: number) => void
}

export const Good: React.FC<Good> = ({
	id,
	name,
	price,
	adminMode,
	delete: deleteGood,
	redact: redactGood,
}: Good) => {
	return (
		<>
			<div className='product-card'>
				<div className='product-image'></div>
				<div className='product-details'>
					<h2 className='product-title'>{name}</h2>
					<div className='product-price'>
						<span className='price'>{price} ₽</span>
						{adminMode && (
							<button className='delete-btn' onClick={() => deleteGood(id)}>
								удалить
							</button>
						)}
						{adminMode && (
							<button
								onClick={() => redactGood(id, name, price)}
								className='reduct-btn'
							>
								изменить
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
