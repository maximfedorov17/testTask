import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Good, GoodData } from '../../../entities/good'
import getGoods from '../../../entities/good/ui/goodsData'
import AddForm from '../../../features/addForm/ui/addForm'
import EditModal from '../../../features/redactForm/ui/redactForm'
import './goods.css'

interface GoodsProps {
	adminMode: boolean
}

export const Goods: React.FC<GoodsProps> = ({ adminMode }) => {
	const [goods, setGoods] = useState<GoodData[]>([])
	const [isModalOpen, setModalOpen] = useState(false)
	const [currentGood, setCurrentGood] = useState<GoodData | null>(null)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateCards = () => {
		console.log('updateCards')
	}
	useEffect(() => {
		const fetchGoods = async () => {
			try {
				const data = await getGoods()
				if (data) {
					setGoods(data)
				} else {
					console.error('Failed to load goods getGoods returned null')
				}
			} catch (error) {
				console.error('Failed to load goods data:', error)
			}
		}

		fetchGoods()
	}, [updateCards])

	const deleteGood = async (uid: number) => {
		try {
			const responce = await axios.delete(
				`https://testapi.nevial.org/goods/${uid}`
			)

			if (responce.status >= 200 && responce.status < 300) {
				setGoods(goods.filter(good => good.uid !== uid))
				console.log('Товар успешно удален')
			}
		} catch (error) {
			console.error('Failed to delete good:', error)
		}
	}

	const handleEditGood = async (
		uid: number,
		name: string,
		price: number,
		comment: string
	) => {
		try {
			const data = { name, price, comment }
			const response = await axios.put(
				`https://testapi.nevial.org/goods/${uid}`,
				data,
				{
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
				}
			)

			if (response.status >= 200 && response.status < 300) {
				setGoods(
					goods.map(good =>
						good.uid === uid ? { ...good, name, price, comment } : good
					)
				)
			} else {
				console.error(
					'Ошибка при обновлении товара:',
					response.status,
					response.statusText
				)
			}
		} catch (error) {
			console.error('Ошибка Axios:', error)
		}
	}

	const closeModal = () => {
		setModalOpen(false)
		setCurrentGood(null)
	}

	const openModal = (good: GoodData) => {
		setCurrentGood(good)
		setModalOpen(true)
	}

	return (
		<>
			{adminMode && <AddForm typeOffForm='good' onAdd={updateCards} />}
			<div className='goods-container'>
				{goods.map(good => (
					<Good
						uid={good.uid}
						delete={deleteGood}
						redact={() => openModal(good)}
						adminMode={adminMode}
						key={good.uid}
						name={good.name}
						price={good.price}
						comment={good.comment}
					/>
				))}
			</div>
			{currentGood && (
				<EditModal
					typeOfForm='good'
					isOpen={isModalOpen}
					item={currentGood}
					onEdit={handleEditGood}
					closeModal={closeModal}
				/>
			)}
		</>
	)
}
