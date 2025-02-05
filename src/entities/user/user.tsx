import './user.css'
interface User {
	id: number
	name: string
	age: number
	adminMode: boolean
	delete: (id: number) => void
}

export const User: React.FC<User> = ({
	id,
	name,
	age,
	adminMode,
	delete: deleteUser,
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
		</tr>
	)
}
