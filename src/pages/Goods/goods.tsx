import { useState } from 'react'
import { Good, GoodData } from '../../entities/good/good'
import AddForm from '../../features/addUser/addForm'
import EditModal from '../../features/redactUser/redactForm'
import { goodsData } from '../../processes/data/goods'
import './goods.css'

interface GoodsProps {
	adminMode: boolean
}
export const Goods: React.FC<GoodsProps> = ({ adminMode }) => {
	const [goods, setGoods] = useState(goodsData)

	const [isModalOpen, setModalOpen] = useState(false)
	const [currentGood, setCurrentGood] = useState<GoodData | null>(null)

	const deleteGood = (id: number) => {
		setGoods(goods.filter(good => good.id !== id))
	}

	const handleEditGood = (id: number, name: string, price: number) => {
		setCurrentGood({ id, name, price })
		setGoods(
			goods.map(good => (good.id === id ? { ...good, name, price } : good))
		)
		setModalOpen(true)
	}

	const addGood = (name: string, price: number) => {
		const newId =
			goods.length > 0 ? Math.max(...goods.map(good => good.id)) + 1 : 1
		const goodToAdd = { id: newId, name, price }
		setGoods([...goods, goodToAdd])
	}
	return (
		<>
			{adminMode && <AddForm typeOffForm='good' onAdd={addGood} />}
			<div className='goods-container'>
				{goods.map(good => (
					<Good
						id={good.id}
						delete={deleteGood}
						redact={handleEditGood}
						adminMode={adminMode}
						key={good.id}
						name={good.name}
						price={good.price}
					/>
				))}
			</div>
			{isModalOpen && (
				<EditModal
					typeOfForm='good'
					isOpen={isModalOpen}
					item={currentGood || { id: 0, name: '', age: 0 }}
					onEdit={handleEditGood}
					closeModal={() => {
						setModalOpen(false)
					}}
				/>
			)}
		</>
	)
}
