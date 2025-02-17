import axios from 'axios'
import React, { useState } from 'react'
import './addForm.css'

interface AddFormProps {
	typeOffForm: string
	onAdd: () => void
}

const AddForm: React.FC<AddFormProps> = ({ typeOffForm, onAdd }) => {
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')
	const [comment, setComment] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (name && number) {
			try {
				const data = {
					name: name,
					age: typeOffForm === 'user' ? Number(number) : undefined,
					comment: comment,
					price: typeOffForm === 'good' ? Number(number) : undefined,
				}

				const typeOfFormForData = typeOffForm === 'user' ? 'users' : 'goods'

				const response = await axios.post(
					`https://testapi.nevial.org/${typeOfFormForData}`,
					data,
					{
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json',
						},
					}
				)

				if (response.status >= 200 && response.status < 300) {
					console.log('Пользователь успешно добавлен:', response.data)

					setName('')
					setNumber('')
					setComment('')
				} else {
					console.error(
						'Ошибка при добавлении пользователя:',
						response.status,
						response.statusText
					)
				}
			} catch (error) {
				console.error('Ошибка Axios:', error)
			}
		}
	}

	return (
		<>
			<form className='add-form' onSubmit={handleSubmit} onClick={onAdd}>
				<input
					className='nameInput'
					type='text'
					placeholder={typeOffForm === 'user' ? 'Имя' : 'Название'}
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					className='numberInput'
					type='number'
					placeholder={typeOffForm === 'user' ? 'Возраст' : 'Цена'}
					value={number}
					onChange={e => setNumber(e.target.value)}
				/>
				<textarea
					className='commentInput'
					placeholder='Описание'
					value={comment}
					onChange={e => setComment(e.target.value)}
				/>
				<button className='addBtn' type='submit'>
					Добавить
				</button>
			</form>
		</>
	)
}

export default AddForm
