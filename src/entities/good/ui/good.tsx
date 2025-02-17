import './good.css'

export interface GoodData {
	uid: number
	name: string
	price: number
	comment: string
}
interface Good {
	uid: number
	name: string
	price: number
	comment: string
	adminMode: boolean
	delete: (id: number) => void
	redact: (id: number, newName: string, newAge: number) => void
}

export const Good: React.FC<Good> = ({
	uid,
	name,
	price,
	comment,
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
					<h3>{comment}</h3>
					<div className='product-price'>
						<span className='price'>{price} ₽</span>

						{adminMode && (
							<button className='delete-btn' onClick={() => deleteGood(uid)}>
								удалить
							</button>
						)}
						{adminMode && (
							<button
								onClick={() => redactGood(uid, name, price)}
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
