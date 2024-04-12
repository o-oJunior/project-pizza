import { IResponse } from '@/interfaces/response'

export async function getPizzaSize(): Promise<IResponse> {
  try {
    const URL_API = process.env.NEXT_PUBLIC_URL_API
    const response: Response = await fetch(`${URL_API}/pizzaSize`)
    const results = await response.json()
    return results.data
  } catch (error) {
    return { statusCode: 500, error: 'Erro ao buscar as pizzas!' }
  }
}
