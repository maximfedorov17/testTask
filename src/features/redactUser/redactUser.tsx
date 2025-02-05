import React, { useState } from 'react'

import { UserData } from '../../entities/user/user'
import './redactUser.css'

interface EditUserModalProps {
	user: UserData
	onEditUser: (id: number, name: string, age: number) => void
	isOpen: boolean
	closeModal: (state: boolean) => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({
	user,
	onEditUser,
	closeModal,
	isOpen,
}) => {
	const [name, setName] = useState(user.name)
	const [age, setAge] = useState(user.age)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onEditUser(user.id, name, age)
		closeModal(!isOpen)
	}

	return (
		<>
			{isOpen && (
				<div className='modalOverlay'>
					<div className='redactUser'>
						<h2>Редактировать пользователя</h2>
						<form onSubmit={handleSubmit}>
							<div>
								<label htmlFor='name'>Имя:</label>
								<input
									type='text'
									id='name'
									value={name}
									onChange={e => setName(e.target.value)}
									required
								/>
							</div>
							<div>
								<label htmlFor='age'>Возраст:</label>
								<input
									type='number'
									id='age'
									value={age}
									onChange={e => setAge(Number(e.target.value))}
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

export default EditUserModal
