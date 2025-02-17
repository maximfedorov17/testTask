import axios from 'axios'

export interface GoodData {
	uid: number
	name: string
	price: number
	comment: string
}

async function getGoods(): Promise<GoodData[] | null> {
	try {
		const response = await axios.get<GoodData[]>(
			'https://testapi.nevial.org/goods',
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
				'Ошибка при получении товаров:',
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

export default getGoods
