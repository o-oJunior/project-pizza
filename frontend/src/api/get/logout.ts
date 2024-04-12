import { IResponse } from '@/interfaces/response'

export async function logout(): Promise<IResponse> {
  try {
    const URL_API = process.env.NEXT_PUBLIC_URL_API
    const response: Response = await fetch(`${URL_API}/client/logout`, {
      method: 'GET',
      credentials: 'include',
    })
    const results = await response.json()
    return results
  } catch (error) {
    return { statusCode: 500, message: 'Ocorreu um erro inesperado!' }
  }
}
