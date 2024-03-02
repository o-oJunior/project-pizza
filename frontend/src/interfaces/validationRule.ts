type TValidationRule = (value: string) => string

export interface IValidationRule {
  [key: string]: TValidationRule
}
