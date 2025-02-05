// AddUserForm.tsx
import React, { useState } from 'react'
import './addForm.css'

interface AddFormProps {
	onAdd: (name: string, number: number) => void
	typeOffForm: string
}

const AddForm: React.FC<AddFormProps> = ({ onAdd, typeOffForm }) => {
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (name && number) {
			onAdd(name, Number(number))
			setName('') // Сброс поля имени
			setNumber('') // Сброс поля возраста
		}
	}

	return (
		<>
			<form className='add-form' onSubmit={handleSubmit}>
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
				<button className='addBtn' type='submit'>
					Добавить
				</button>
			</form>
		</>
	)
}

export default AddForm
