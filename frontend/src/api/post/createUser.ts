export default async function fetchPostCreateUser(user: object) {
  const URL_API = process.env.NEXT_PUBLIC_URL_API
  const response: Response = await fetch(`${URL_API}/client/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return response
}
