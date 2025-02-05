import './user.css'

export interface UserData {
	id: number
	name: string
	age: number
}
interface User {
	id: number
	name: string
	age: number
	adminMode: boolean
	delete: (id: number) => void
	redact: (id: number, newName: string, newAge: number) => void
}

export const User: React.FC<User> = ({
	id,
	name,
	age,
	adminMode,
	delete: deleteUser,
	redact: redactUser,
}: User) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{age}</td>
			{adminMode && (
				<td onClick={() => deleteUser(id)}>
					<button className='delete-btn'>удалить</button>
				</td>
			)}
			{adminMode && (
				<td onClick={() => redactUser(id, name, age)}>
					<button className='reduct-btn'>изменить</button>
				</td>
			)}
		</tr>
	)
}
