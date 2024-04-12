import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import styles from './navbar.module.scss'
import { manageAccountAccess, openModal } from '@/redux/accountAccess/slice'
import { IUserData, userLogout, useUser } from '@/redux/user/slice'
import { useState } from 'react'
import CustomAlert from '../modals/customAlert/customAlert'
import { IAlert, initialValueAlert } from '@/interfaces/alert'
import { IResponse } from '@/interfaces/response'
import { logout } from '@/api/get/logout'

const Navbar = () => {
  const [dropdownOptionsUser, setDropdownOptionsUser] = useState<boolean>(false)
  const [customAlert, setCustomAlert] = useState<IAlert>(initialValueAlert)
  const { user }: IUserData = useAppSelector(useUser)
  const dispatch = useAppDispatch()

  const showMenuMobile = () => {
    const menu = document.getElementById('menu')
    menu!.className = menu?.className === styles.menu ? styles.menuMobile : styles.menu
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openModalLogin = (hasAccount: boolean) => {
    const modal = true
    dispatch(openModal(modal))
    dispatch(manageAccountAccess(hasAccount))
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        const menu = document.getElementById('menu')
        menu!.className = styles.menu
      }
    })
  }

  const handleDropdownOptionsUser = () => {
    setDropdownOptionsUser(!dropdownOptionsUser)
  }

  const handleLogout = async () => {
    const reponse: IResponse = await logout()
    if (reponse.statusCode === 200) {
      setCustomAlert({ message: 'Conta desconectada com sucesso!', status: 'success', modal: true })
      dispatch(userLogout())
      setTimeout(() => setCustomAlert(initialValueAlert), 2000)
    }
  }

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.title}>
        <span className={styles.colorGreen}>Piz</span>
        <span className={styles.colorWhite}>za</span>
        <span className={styles.colorRed}>ria</span>
      </div>

      <div className={styles.mobile}>
        <i className={`fa-solid fa-cart-shopping ${styles.iconCartMobile}`}></i>

        {user.firstName !== '' && (
          <div className={styles.userContainerMobile} onClick={() => handleDropdownOptionsUser()}>
            <div className={styles.userContent}>
              <i className={`fa-solid fa-user ${styles.iconUser}`}></i>
              {dropdownOptionsUser ? (
                <i id="angleUp" className={`fa-solid fa-angle-up ${styles.angleUp}`}></i>
              ) : (
                <i id="angleDown" className={`fa-solid fa-angle-down ${styles.angleDown}`}></i>
              )}
            </div>

            {dropdownOptionsUser && (
              <div id="dropdownContainer" className={styles.dropdownContainer}>
                <div className={styles.dropdown}>
                  <div className={styles.userNameContainer}>
                    <span className={styles.text}>Olá,</span>
                    <span className={styles.userName}>{user.firstName}</span>
                  </div>
                  <ul>
                    <li>Meus Pedidos</li>
                    <li>Endereços</li>
                    <li>Configurações</li>
                    <li onClick={() => handleLogout()}>Sair</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.toggleMenu}>
        <button onClick={showMenuMobile}>
          <i className="bi bi-list"></i>
        </button>
      </div>

      <div id="menu" className={styles.menu}>
        <ul className={styles.listContainer}>
          <li className={styles.itemList} onClick={() => scrollToSection('combos')}>
            <button>Combos</button>
          </li>
          <li className={styles.itemList} onClick={() => scrollToSection('pizzas')}>
            <button>Pizzas</button>
          </li>
          <li className={styles.itemList} onClick={() => scrollToSection('bebidas')}>
            <button>Bebidas</button>
          </li>
        </ul>

        <div className={styles.btnContainer}>
          <i className={`fa-solid fa-cart-shopping ${styles.iconCartDesktop}`}></i>
          {user.firstName !== '' ? (
            <div className={styles.userContainerDesktop} onClick={() => handleDropdownOptionsUser()}>
              <div className={styles.userContent}>
                <i className={`fa-solid fa-user ${styles.iconUser}`}></i>
                {dropdownOptionsUser ? (
                  <i id="angleUp" className={`fa-solid fa-angle-up ${styles.angleUp}`}></i>
                ) : (
                  <i id="angleDown" className={`fa-solid fa-angle-down ${styles.angleDown}`}></i>
                )}
              </div>

              {dropdownOptionsUser && (
                <div id="dropdownContainer" className={styles.dropdownContainer}>
                  <div className={styles.dropdown}>
                    <div className={styles.userNameContainer}>
                      <span className={styles.text}>Olá,</span>
                      <span className={styles.userName}>{user.firstName}</span>
                    </div>
                    <ul>
                      <li>Meus Pedidos</li>
                      <li>Endereços</li>
                      <li>Configurações</li>
                      <li onClick={() => handleLogout()}>Sair</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className={styles.btnSignIn} onClick={() => openModalLogin(true)}>
                Entrar
              </button>
              <button className={styles.btnSignUp} onClick={() => openModalLogin(false)}>
                Criar conta
              </button>
            </>
          )}
        </div>
      </div>

      {customAlert.modal && <CustomAlert message={customAlert.message} status={customAlert.status} />}
    </nav>
  )
}

export default Navbar
