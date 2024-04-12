export function maskBirthDate(value: string) {
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '$1/$2')
  value = value.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
  return value
}
