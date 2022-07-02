import React, { FunctionComponent } from "react";
import './get-request-item-component.scss'
import { UserProps } from "../get-request-component";

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
        <div className="content-request__email" data-hover={props.email}>
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