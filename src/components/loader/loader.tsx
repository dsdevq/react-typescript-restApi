import React from "react";
import './loader.scss'
import loader from "../../Assets/Preloader.png"

export const LoaderComponent = () => {
  
  return (
    <div className="loader-container">
      <img id="loader" className="loader-image" src={loader} alt="Loader" />
    </div>
  )
}