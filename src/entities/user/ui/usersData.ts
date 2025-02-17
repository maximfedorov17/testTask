import axios from 'axios'

export interface UserData {
	uid: number
	name: string
	age: number
	comment: string
}

async function getUsers(): Promise<UserData[] | null> {
	try {
		const response = await axios.get<UserData[]>(
			'https://testapi.nevial.org/users',
			{
				headers: {
					Accept: 'application/json',
				},
			}
		)

		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			console.error(
				'Ошибка при получении users:',
				response.status,
				response.statusText
			)
			return null
		}
	} catch (error) {
		console.error('Ошибка Axios:', error)
		return null
	}
}

export default getUsers
