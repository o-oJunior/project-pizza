export async function getCombo(): Promise<object[]> {
  const URL_API = process.env.NEXT_PUBLIC_URL_API
  const response: Response = await fetch(`${URL_API}/combo`)
  const results = await response.json()
  return results.data
}
