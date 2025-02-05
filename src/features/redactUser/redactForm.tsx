import React, { useState } from 'react'

import './redactForm.css'

interface ItemProps {
	id: number
	name: string
	price?: number
	age?: number
}
interface EditModalProps {
	item: ItemProps
	onEdit: (id: number, name: string, number: number) => void
	isOpen: boolean
	closeModal: (state: boolean) => void
	typeOfForm: string
}

const EditModal: React.FC<EditModalProps> = ({
	item,
	onEdit,
	closeModal,
	isOpen,
	typeOfForm,
}) => {
	const [name, setName] = useState(item.name)
	const [number, setNumber] = useState(item.age || item.price || 0)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onEdit(item.id, name, number)
		closeModal(!isOpen)
	}

	return (
		<>
			{isOpen && (
				<div className='modalOverlay'>
					<div className='redactUser'>
						<h2>Редактировать </h2>
						<form onSubmit={handleSubmit}>
							<div>
								<label htmlFor='name'>
									{typeOfForm === 'user' ? 'Имя' : 'Название'}
								</label>
								<input
									type='text'
									id='name'
									value={name}
									onChange={e => setName(e.target.value)}
									required
								/>
							</div>
							<div>
								<label htmlFor='number'>
									{typeOfForm === 'user' ? 'Возраст' : 'Цена'}
								</label>
								<input
									type='number'
									id='number'
									value={number}
									onChange={e => setNumber(Number(e.target.value))}
									required
								/>
							</div>
							<div className='button-splitter'>
								<button type='submit'>Сохранить</button>
								<button type='button' onClick={() => closeModal(!isOpen)}>
									Отменить
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default EditModal
