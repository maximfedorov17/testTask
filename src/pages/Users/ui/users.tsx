import axios from 'axios'
import { useEffect, useState } from 'react'
import { User, UserData } from '../../../entities/user'
import getUsers from '../../../entities/user/ui/usersData'
import AddForm from '../../../features/addForm/ui/addForm'
import EditModal from '../../../features/redactForm/ui/redactForm'
import './users.css'

interface UserProps {
	adminMode: boolean
}

export const Users: React.FC<UserProps> = ({ adminMode }) => {
	const [users, setUsers] = useState<UserData[]>([])
	const [isModalOpen, setModalOpen] = useState(false)
	const [currentUser, setCurrentUser] = useState<UserData | null>(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateUsers = () => {
		console.log('updateUsers')
	}
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getUsers()
				if (data) {
					setUsers(data)
				} else {
					console.error('Failed to load users getUsers returned null')
				}
			} catch (error) {
				console.error('Failed to load users data:', error)
			}
		}

		fetchUsers()
	}, [updateUsers])

	const deleteUser = async (uid: number) => {
		try {
			const responce = await axios.delete(
				`https://testapi.nevial.org/users/${uid}`
			)

			if (responce.status >= 200 && responce.status < 300) {
				setUsers(users.filter(user => user.uid !== uid))
				console.log('Товар успешно удален')
			}
		} catch (error) {
			console.error('Failed to delete user:', error)
		}
	}

	const handleEditUser = async (
		uid: number,
		name: string,
		age: number,
		comment: string
	) => {
		try {
			const data = { name, age, comment }
			const response = await axios.put(
				`https://testapi.nevial.org/users/${uid}`,
				data,
				{
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
				}
			)

			if (response.status >= 200 && response.status < 300) {
				setUsers(
					users.map(user =>
						user.uid === uid ? { ...user, name, age, comment } : user
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
		setCurrentUser(null)
	}

	const openModal = (user: UserData) => {
		setCurrentUser(user)
		setModalOpen(true)
	}

	return (
		<>
			<div className='userPageContainer'>
				{adminMode && <AddForm typeOffForm='user' onAdd={updateUsers} />}
				<div className='userTableContainer'>
					<table className='userTable'>
						<thead>
							<tr>
								<th>Имя</th>
								<th>Возраст</th>
								<th>Комментарий</th>
								{adminMode && <th>Удалить</th>}
								{adminMode && <th>Изменить</th>}
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<User
									key={user.uid}
									uid={user.uid}
									name={user.name}
									age={user.age}
									comment={user.comment}
									adminMode={adminMode}
									delete={() => {
										deleteUser(user.uid)
									}}
									redact={() => openModal(user)}
								/>
							))}
						</tbody>
					</table>

					{isModalOpen && (
						<EditModal
							typeOfForm='user'
							isOpen={isModalOpen}
							item={currentUser || { uid: 0, name: '', age: 0 }}
							onEdit={handleEditUser}
							closeModal={closeModal}
						/>
					)}
				</div>
			</div>
		</>
	)
}
