export interface IResponse {
  statusCode: number
  data?: object | object[]
  message?: string
  error?: string
}
