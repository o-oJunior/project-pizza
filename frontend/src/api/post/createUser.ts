import { IResponse } from '@/interfaces/response'

export default async function fetchPostCreateUser(user: object): Promise<IResponse> {
  try {
    const URL_API = process.env.NEXT_PUBLIC_URL_API
    const response: Response = await fetch(`${URL_API}/client/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const results = response.json()
    return results
  } catch (error) {
    return { statusCode: 500, error: 'Ocorreu um erro ao criar o usuário!' }
  }
}
