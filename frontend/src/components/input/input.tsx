import { useState } from 'react'
import styles from './input.module.scss'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
}

export const Input: React.FC<IProps> = ({ type = 'text', ...props }) => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const isTypePassword = type === 'password'

  const showPassword = () => {
    setVisiblePassword(!visiblePassword)
  }

  return (
    <div className={styles.inputContainer}>
      <input
        type={isTypePassword && visiblePassword ? 'text' : type}
        className={`${styles.input} ${isTypePassword && styles.inputPassword} valid`}
        {...props}
      />
      {isTypePassword && (
        <i
          className={`${styles.icon} ${visiblePassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}`}
          onClick={() => showPassword()}
        ></i>
      )}
    </div>
  )
}
