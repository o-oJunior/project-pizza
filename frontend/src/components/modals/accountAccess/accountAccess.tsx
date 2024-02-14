import { ChangeEvent } from 'react'
import styles from './accountAccess.module.scss'

type TProps = {
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
  handleAccountAccess: () => void
  closeModal: (event: boolean) => void
  hasAccount: boolean
}

const ModalAccountAccess = ({ handleChangeInput, closeModal, handleAccountAccess, hasAccount }: TProps) => {
  return (
    <>
      {hasAccount ? (
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
                  onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                  name="user"
                />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Senha</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Senha"
                  onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                  name="password"
                />
                <div style={{ marginLeft: '2px' }}>
                  <span className={styles.link}>Esqueceu sua senha?</span>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.buttonSignIn}>Entrar</button>
                <div className={styles.signup}>
                  <span className={styles.link} onClick={handleAccountAccess}>
                    Novo por aqui? Criar conta.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.btnCloseModal} onClick={() => closeModal(false)}>
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <form className={styles.form}>
              <span className={styles.text}>Criar conta</span>
              <div className={styles.groupContainer}>
                <div className={styles.group}>
                  <label className={styles.label}>Nome</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Nome completo"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                    name="name"
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>CPF</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="CPF"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                    name="cpf"
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>E-mail</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="E-mail"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                    name="email"
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>Telefone</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Telefone"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                    name="phone"
                  />
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>Senha</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Senha"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                    name="password"
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>Confirmar senha</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Confirmar senha"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => handleChangeInput(event)}
                    name="confirmPassword"
                  />
                </div>
              </div>

              {/* <div className={styles.groupContainer}></div> */}

              <div className={styles.buttonGroup}>
                <button className={styles.buttonSignUp}>Criar conta</button>
                <div className={styles.signin}>
                  <span className={styles.link} onClick={handleAccountAccess}>
                    Já tem conta? Entrar.
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalAccountAccess
