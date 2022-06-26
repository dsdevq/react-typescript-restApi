// import React from "react";
import logo from "../../Assets/Logo.svg";
import './header-component.scss'

const HeaderComponent = () => {

  return (
    <header className="header">
      <div className="header__container">
        {/* <div> 
        */}
          <a href="#" 
        className="header__logo"> 
            <img 
        className="header__img"
            src={logo} alt="Logo" />
          </a>
        {/* </div> */}
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