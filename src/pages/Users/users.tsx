import { useState } from 'react'
import { User, UserData } from '../../entities/user/user'
import AddForm from '../../features/addUser/addForm'
import EditModal from '../../features/redactUser/redactForm'
import { usersData } from '../../processes/data/users'
import './users.css'

interface UserProps {
	adminMode: boolean
}

export const Users: React.FC<UserProps> = ({ adminMode }) => {
	const [users, setUsers] = useState(usersData)

	const [isModalOpen, setModalOpen] = useState(false)
	const [currentUser, setCurrentUser] = useState<UserData | null>(null)

	const deleteUser = (id: number) => {
		setUsers(users.filter(user => user.id !== id))
	}

	const handleEditUser = (id: number, name: string, age: number) => {
		setCurrentUser({ id, name, age })
		setUsers(
			users.map(user => (user.id === id ? { ...user, name, age } : user))
		)
		setModalOpen(true)
	}

	const addUser = (name: string, age: number) => {
		const newId =
			users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1
		const userToAdd = { id: newId, name, age }
		setUsers([...users, userToAdd])
	}

	return (
		<>
			<div className='userPageContainer'>
				<div className='userTableContainer'>
					{adminMode && <AddForm typeOffForm='user' onAdd={addUser} />}
					<table className='userTable'>
						<thead>
							<tr>
								<th>Имя</th>
								<th>Возраст</th>
								{adminMode && <th>Удалить</th>}
								{adminMode && <th>Изменить</th>}
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<User
									key={user.id}
									id={user.id}
									name={user.name}
									age={user.age}
									adminMode={adminMode}
									delete={() => {
										deleteUser(user.id)
									}}
									redact={() => {
										handleEditUser(user.id, user.name, user.age)
									}}
								/>
							))}
						</tbody>
					</table>

					{isModalOpen && (
						<EditModal
							typeOfForm='user'
							isOpen={isModalOpen}
							item={currentUser || { id: 0, name: '', age: 0 }}
							onEdit={handleEditUser}
							closeModal={() => {
								setModalOpen(false)
							}}
						/>
					)}
				</div>
			</div>
		</>
	)
}
