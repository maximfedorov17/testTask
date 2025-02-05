import { useState } from 'react'
import { User } from '../../entities/user/user'
import AddUserForm from '../../features/addUser/addUser'
import { usersData } from '../../processes/data/users'
import './users.css'

interface UserProps {
	adminMode: boolean
}

export const Users: React.FC<UserProps> = ({ adminMode }) => {
	const [users, setUsers] = useState(usersData)

	const deleteUser = (id: number) => {
		setUsers(users.filter(user => user.id !== id))
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
					<table className='userTable'>
						<thead>
							<tr>
								<th>Имя</th>
								<th>Возраст</th>
								{adminMode && <th>Удалить</th>}
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
								/>
							))}
						</tbody>
					</table>
					{adminMode && <AddUserForm onAddUser={addUser} />}
				</div>
			</div>
		</>
	)
}
