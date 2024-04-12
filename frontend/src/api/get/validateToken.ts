import { IResponse } from '@/interfaces/response'

export async function validateToken(): Promise<IResponse> {
  try {
    const URL_API = process.env.NEXT_PUBLIC_URL_API
    const response: Response = await fetch(`${URL_API}/client/token/validate`, {
      method: 'GET',
      credentials: 'include',
    })
    const results: IResponse = await response.json()
    return results
  } catch (error) {
    return { statusCode: 401, error: 'Token inválido!' }
  }
}
