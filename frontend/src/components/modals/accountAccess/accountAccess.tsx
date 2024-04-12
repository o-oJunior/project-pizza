import { ChangeEvent, FormEvent } from 'react'
import styles from './accountAccess.module.scss'
import { IAuthUser } from '@/interfaces/user/auth'
import { ICreateUser } from '@/interfaces/user/create'
import { Input } from '@/components/input/input'

type TProps = {
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void
  handleAccountAccess: () => void
  closeModal: (event: boolean) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  authUser: IAuthUser
  createUser: ICreateUser
  hasAccount: boolean
  errorMessage: string
}

const ModalAccountAccess: React.FC<TProps> = ({
  handleChangeInput,
  closeModal,
  handleAccountAccess,
  handleSubmit,
  authUser,
  createUser,
  hasAccount,
  errorMessage,
}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.btnCloseModal} onClick={() => closeModal(false)}>
          <i className="bi bi-x-circle-fill"></i>
        </div>
        {hasAccount ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <span className={styles.text}>Entrar</span>
            <div className={styles.group}>
              <label className={styles.label}>Usuário</label>
              <Input
                type="text"
                placeholder="E-mail ou CPF"
                onChange={handleChangeInput}
                name="user"
                value={authUser.user}
              />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Senha</label>
              <Input
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
              {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
              <button className={styles.buttonSignIn}>Entrar</button>
              <div className={styles.signup}>
                <span className={styles.link} onClick={handleAccountAccess}>
                  Novo por aqui? Criar conta.
                </span>
              </div>
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <span className={styles.text}>Criar conta</span>
            <div className={styles.groupContainer}>
              <div className={styles.group}>
                <label className={styles.label}>Nome*</label>
                <Input
                  type="text"
                  placeholder="Nome"
                  onChange={handleChangeInput}
                  name="firstName"
                  value={createUser.firstName}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Sobrenome*</label>
                <Input
                  type="text"
                  placeholder="Sobrenome"
                  onChange={handleChangeInput}
                  name="lastName"
                  value={createUser.lastName}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>CPF*</label>
                <Input
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
                <Input
                  type="text"
                  placeholder="E-mail"
                  onChange={handleChangeInput}
                  name="email"
                  value={createUser.email}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Telefone*</label>
                <Input
                  type="text"
                  placeholder="Telefone"
                  onChange={handleChangeInput}
                  name="phone"
                  value={createUser.phone}
                  maxLength={15}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Data de Nascimento*</label>
                <Input
                  type="text"
                  placeholder="__/__/____"
                  onChange={handleChangeInput}
                  name="birthDate"
                  value={createUser.birthDate}
                  maxLength={10}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Senha*</label>
                <Input
                  type="password"
                  placeholder="Senha"
                  onChange={handleChangeInput}
                  name="password"
                  value={createUser.password}
                />
              </div>

              <div className={styles.group}>
                <label className={styles.label}>Confirmar senha*</label>
                <Input
                  type="password"
                  placeholder="Confirmar senha"
                  onChange={handleChangeInput}
                  name="confirmPassword"
                  value={createUser.confirmPassword}
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
              <button className={styles.buttonSignUp}>Criar conta</button>
              <div className={styles.signin}>
                <span className={styles.link} onClick={handleAccountAccess}>
                  Já tem conta? Entrar.
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ModalAccountAccess
