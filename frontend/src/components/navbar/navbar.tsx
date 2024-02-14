import { useAppDispatch } from '@/redux/hooks'
import styles from './navbar.module.scss'
import { manageAccountAcess, openModal } from '@/redux/accountAccess/slice'

const Navbar = () => {
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
    dispatch(manageAccountAcess(hasAccount))
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        const menu = document.getElementById('menu')
        menu!.className = styles.menu
      }
    })
  }

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.title}>
        <span className={styles.colorGreen}>Piz</span>
        <span className={styles.colorWhite}>za</span>
        <span className={styles.colorRed}>ria</span>
      </div>

      <div className={styles.toggleMenu}>
        <button onClick={showMenuMobile}>
          <i className="bi bi-list"></i>
        </button>
      </div>

      <div id="menu" className={styles.menu}>
        <ul>
          <li onClick={() => scrollToSection('combos')}>
            <button>Combos</button>
          </li>
          <li onClick={() => scrollToSection('pizzas')}>
            <button>Pizzas</button>
          </li>
          <li onClick={() => scrollToSection('bebidas')}>
            <button>Bebidas</button>
          </li>
        </ul>

        <div className={styles.btnContainer}>
          <button className={styles.btnSignUp} onClick={() => openModalLogin(false)}>
            Criar conta
          </button>
          <button className={styles.btnSignIn} onClick={() => openModalLogin(true)}>
            Entrar
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
