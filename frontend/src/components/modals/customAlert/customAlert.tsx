import styles from './customAlert.module.scss'

export interface ICustomAlert {
  status: string
  message: string
}

interface IValidationAlert {
  [key: string]: string
}

export const CustomAlert: React.FC<ICustomAlert> = ({ status, message }) => {
  const iconAwait = 'bi-clock'
  const iconSuccess = 'bi-check-circle'
  const iconError = 'bi-x-circle'

  const validationStatus: IValidationAlert = {
    await: `${iconAwait} ${styles.iconAwait}`,
    success: `${iconSuccess} ${styles.iconSuccess}`,
    error: `${iconError} ${styles.iconError}`,
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <i className={`${styles.icon} bi ${validationStatus[status]}`}></i>
        <span className={styles.textMessage}>{message}</span>
      </div>
    </div>
  )
}
