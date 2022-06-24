import React, { FunctionComponent } from "react";
import './get-request-item-component.scss'

interface UserProps {
  email: string,
  id: number,
  name: string,
  phone: number,
  photo: string,
  position: string,
  position_id: number,
  registration_timestamp: number,
}

const GetRequestItemComponent: FunctionComponent<UserProps> = (props) => {
  return (
    <div className="content-request__item">
      <div className="content-request__photo">
        <img src={props.photo} alt="Photo" />
      </div>
      <div className="content-request__name">
        {props.name}
      </div>
      <div className="content-request__details">
      <div className="content-request__position">
        {props.position}
      </div>
      <div className="content-request__email">
        {props.email}
      </div>
      <div className="content-request__phone">
        {props.phone}
      </div>
      </div>
    </div>
  )
}

export default GetRequestItemComponent