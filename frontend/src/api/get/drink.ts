export async function getSodas() {
  const URL_API = process.env.NEXT_PUBLIC_URL_API
  const response: Response = await fetch(`${URL_API}/drink/filter?type=Refrigerante`)
  const results = await response.json()
  return results.data
}

export async function getJuices() {
  const URL_API = process.env.NEXT_PUBLIC_URL_API
  const response: Response = await fetch(`${URL_API}/drink/filter?type=Suco`)
  const results = await response.json()
  return results.data
}
