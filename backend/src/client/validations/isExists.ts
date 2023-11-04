// value: result of the database query
// atrribute: checked atrribute
export function isExists(value: object, attribute: string): object {
  if (Object.values(value).length > 0) {
    return { statusCode: 400, error: `O ${attribute} já está cadastrado!` }
  }

  return undefined
}
