import React from "react";
import success from "../../../../../Assets/success-image.svg"
import './aftersent.scss'

export const AfterSent = () => {

  return (
    <div className="after-sent">
      <div className="after-sent__container">
        <h1 className="after-sent__title title">
        User successfully registered
        </h1>
        <div className="after-sent__notification">
          <img src={success} alt="Image" />
        </div>
      </div>
    </div>
  )
}