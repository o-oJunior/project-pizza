export default async function getPizzaSize() {
  const response: Response = await fetch('http://localhost:8080/api/pizzaSize')
  const results = await response.json()
  return results.data
}
