import { ChangeEvent } from 'react'
import styles from './userAccount.module.scss'

type TProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  closeModal: (event: boolean) => void
}

const ModalUserAccount = ({ handleChange, closeModal }: TProps) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.btnCloseModal} onClick={() => closeModal(false)}>
          <i className="bi bi-x-circle-fill"></i>
        </div>
        <form className={styles.form}>
          <span className={styles.text}>Entrar</span>
          <div className={styles.group}>
            <label className={styles.label}>Usuário</label>
            <input
              className={styles.input}
              type="text"
              placeholder="E-mail, CPF ou Telefone"
              onChange={(e: ChangeEvent<HTMLInputElement>): void => handleChange(e)}
              name="user"
            />
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Senha</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Senha"
              onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChange(event)}
              name="password"
            />
            <div style={{ marginLeft: '2px' }}>
              <span className={styles.link}>Esqueceu sua senha?</span>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.button}>Entrar</button>
            <div className={styles.signup}>
              <span className={styles.link}>Novo por aqui? Criar conta.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalUserAccount
