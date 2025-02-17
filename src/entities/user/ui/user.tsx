import './user.css'

export interface UserData {
	uid: number
	name: string
	age: number
	comment: string
}
interface User {
	uid: number
	name: string
	age: number
	comment: string
	adminMode: boolean
	delete: (id: number) => void
	redact: (id: number, newName: string, newAge: number) => void
}

export const User: React.FC<User> = ({
	uid,
	name,
	age,
	comment,
	adminMode,
	delete: deleteUser,
	redact: redactUser,
}: User) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{age}</td>
			<td>
				<span>{comment}</span>
			</td>
			{adminMode && (
				<td onClick={() => deleteUser(uid)}>
					<button className='delete-btn'>удалить</button>
				</td>
			)}
			{adminMode && (
				<td onClick={() => redactUser(uid, name, age)}>
					<button className='reduct-btn'>изменить</button>
				</td>
			)}
		</tr>
	)
}
