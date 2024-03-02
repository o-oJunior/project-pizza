import { ChangeEvent, FormEvent } from 'react'
import styles from './accountAccess.module.scss'
import { IAuthUser } from '@/interfaces/user/auth'
import { ICreateUser } from '@/interfaces/user/create'

type TProps = {
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
  handleAccountAccess: () => void
  closeModal: (event: boolean) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  authUser: IAuthUser
  createUser: ICreateUser
  hasAccount: boolean
  requiredFieldText: string
}

const ModalAccountAccess = ({
  handleChangeInput,
  closeModal,
  handleAccountAccess,
  handleSubmit,
  authUser,
  createUser,
  hasAccount,
  requiredFieldText,
}: TProps) => {
  return (
    <>
      {hasAccount ? (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.btnCloseModal} onClick={() => closeModal(false)}>
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <form className={styles.form} id="form">
              <span className={styles.text}>Entrar</span>
              <div className={styles.group}>
                <label className={styles.label}>Usuário</label>
                <input
                  className={`${styles.input} valid`}
                  type="text"
                  placeholder="E-mail ou CPF"
                  onChange={handleChangeInput}
                  name="user"
                  value={authUser.user}
                />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Senha</label>
                <input
                  className={`${styles.input} valid`}
                  type="password"
                  placeholder="Senha"
                  onChange={handleChangeInput}
                  name="password"
                  value={authUser.password}
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
            <form className={styles.form} onSubmit={handleSubmit} method="post">
              <span className={styles.text}>Criar conta</span>
              <div className={styles.groupContainer}>
                <div className={styles.group}>
                  <label className={styles.label}>Nome*</label>
                  <input
                    className={`${styles.input} valid`}
                    type="text"
                    placeholder="Nome completo"
                    onChange={handleChangeInput}
                    name="fullName"
                    value={createUser.fullName}
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>CPF*</label>
                  <input
                    className={`${styles.input} valid`}
                    type="text"
                    placeholder="CPF"
                    onChange={handleChangeInput}
                    name="cpf"
                    value={createUser.cpf}
                    maxLength={14}
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>E-mail*</label>
                  <input
                    className={`${styles.input} valid`}
                    type="text"
                    placeholder="E-mail"
                    onChange={handleChangeInput}
                    name="email"
                    value={createUser.email}
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>Telefone*</label>
                  <input
                    className={`${styles.input} valid`}
                    type="text"
                    placeholder="Telefone"
                    onChange={handleChangeInput}
                    name="phone"
                    value={createUser.phone}
                    maxLength={15}
                  />
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>Senha*</label>
                  <input
                    className={`${styles.input} valid`}
                    type="password"
                    placeholder="Senha"
                    onChange={handleChangeInput}
                    name="password"
                    value={createUser.password}
                  />
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>Confirmar senha*</label>
                  <input
                    className={`${styles.input} valid`}
                    type="password"
                    placeholder="Confirmar senha"
                    onChange={handleChangeInput}
                    name="confirmPassword"
                    value={createUser.confirmPassword}
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                {requiredFieldText && <span className={styles.requiredFieldText}>{requiredFieldText}</span>}
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
