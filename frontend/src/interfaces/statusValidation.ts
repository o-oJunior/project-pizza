export interface IValidationStatus {
  [key: number]: () => string | object | void
}
