import styles from './navbar.module.scss'

const Navbar = () => {
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
          <li>
            <button onClick={() => scrollToSection('combos')}>Combos</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('pizzas')}>Pizzas</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('bebidas')}>Bebidas</button>
          </li>
        </ul>

        <div className={styles.btnContainer}>
          <a href="#" className={styles.btnSignUp}>
            Criar conta
          </a>
          <a href="#" className={styles.btnSignIn}>
            Entrar
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
