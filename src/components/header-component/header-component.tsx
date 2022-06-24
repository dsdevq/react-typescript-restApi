// import React from "react";
import logo from "../../Assets/Logo.svg";
import './header-component.scss'

const HeaderComponent = () => {

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="" className="header__img">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="header__buttons">
          <div className="header__button button">
            Users
          </div>
          <div className="header__button button">
            Sign up
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent