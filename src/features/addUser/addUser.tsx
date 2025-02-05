// AddUserForm.tsx
import React, { useState } from 'react'
import './addUser.css'

interface AddUserFormProps {
	onAddUser: (name: string, age: number) => void
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
	const [name, setName] = useState('')
	const [age, setAge] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (name && age) {
			onAddUser(name, Number(age))
			setName('') // Сброс поля имени
			setAge('') // Сброс поля возраста
		}
	}

	return (
		<>
			<form className='add-user-form' onSubmit={handleSubmit}>
				<input
					className='nameInput'
					type='text'
					placeholder='Имя'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					className='ageInput'
					type='number'
					placeholder='Возраст'
					value={age}
					onChange={e => setAge(e.target.value)}
				/>
				<button className='addUserBtn' type='submit'>
					Добавить пользователя
				</button>
			</form>
		</>
	)
}

export default AddUserForm
