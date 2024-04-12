import { IResponse } from '@/interfaces/response'

export async function getSodas(): Promise<Object[] | void> {
  try {
    const URL_API = process.env.NEXT_PUBLIC_URL_API
    const response: Response = await fetch(`${URL_API}/drink/filter?type=Refrigerante`)
    const results = await response.json()
    return results.data
  } catch (error) {
    return console.log('Erro ao buscar os refrigerantes!')
  }
}

export async function getJuices(): Promise<IResponse> {
  try {
    const URL_API = process.env.NEXT_PUBLIC_URL_API
    const response: Response = await fetch(`${URL_API}/drink/filter?type=Suco`)
    const results = await response.json()
    return results.data
  } catch (error) {
    return { statusCode: 500, error: 'Erro ao buscar os sucos' }
  }
}
