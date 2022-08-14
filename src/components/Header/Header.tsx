// import React from "react";
import logo from "../../Assets/Logo.svg";
import './Header.scss'

const HeaderComponent = () => {

  return (
    <header className="header">
      <div className="header__container">
        <a href="."
          className="header__logo">
          <img
            className="header__img"
            src={logo} alt="Logo" />
        </a>
        <div className="header__buttons">
          <a href="#get-request" className="header__button button">
            Users
          </a>
          <a href="#post-request" className="header__button button">
            Sign up
          </a>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent