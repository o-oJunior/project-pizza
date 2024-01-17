export async function getBorder(): Promise<object[]> {
  const URL_API = process.env.URL_API
  const response: Response = await fetch(`${URL_API}/border`)
  const results = await response.json()
  return results.data
}
