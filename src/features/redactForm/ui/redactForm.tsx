import React, { useState } from 'react'
import './redactForm.css'
interface ItemProps {
	uid: number
	name: string
	price?: number
	age?: number
	comment?: string
}

interface EditModalProps {
	item: ItemProps
	onEdit: (
		uid: number,
		name: string,
		number: number,
		comment: string
	) => Promise<void>
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
	const [comment, setComment] = useState(item.comment || '')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await onEdit(item.uid, name, number, comment)
			closeModal(false)
		} catch (error) {
			console.error('Ошибка при редактировании:', error)
		}
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

							<div>
								<label htmlFor='comment'>Описание</label>
								<textarea
									id='comment'
									value={comment}
									onChange={e => setComment(e.target.value)}
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
