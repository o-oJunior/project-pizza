'use client'
import React from 'react'
import './navbar.scss'

const Navbar = () => {
  const showMenuMobile = () => {
    const menu = document.getElementById('menu')
    menu!.className = menu?.className === 'menu' ? 'menu-mobile' : 'menu'
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      const menu = document.getElementById('menu')
      menu!.className = 'menu'
    }
  })
  return (
    <nav className="navbar-container">
      <div className="title">
        <span className="color-green">Piz</span>
        <span className="color-white">za</span>
        <span className="color-red">ria</span>
      </div>

      <div className="toggle-menu">
        <button onClick={showMenuMobile}>
          <i className="bi bi-list"></i>
        </button>
      </div>

      <div id="menu" className="menu">
        <ul>
          <li>Pizzas</li>
          <li>Bebidas</li>
          <li>Combos</li>
        </ul>

        <div className="btn-container">
          <a href="#" className="btn-sign-up">
            Criar conta
          </a>
          <a href="#" className="btn-sign-in">
            Entrar
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
