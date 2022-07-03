import React, { FunctionComponent } from "react";
import { UserProps } from "../../../Main";
import './Item.scss'

const GetRequestItemComponent: FunctionComponent<UserProps> = ( { photo, name, position, email, phone } ) => {
  return (
    <div className="content-request__item">
      <div className="content-request__photo">
        <img src={photo} alt="Photo" />
      </div>
      <div className="content-request__name">
        {name}
      </div>
      <div className="content-request__details">
        <div className="content-request__position">
          {position}
        </div>
        <div className="content-request__email" data-hover={email}>
          {email}
        </div>
        <div className="content-request__phone">
          {phone}
        </div>
      </div>
    </div>
  )
}

export default GetRequestItemComponent