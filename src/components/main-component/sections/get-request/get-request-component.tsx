import React, { useEffect, useState } from "react";
import { LoaderComponent } from "../../../loader/loader";
import './get-request-component.scss'
import GetRequestItemComponent from "./get-request-item/get-request-item-component";

export interface UserProps {
  email: string,
  id: number,
  name: string,
  phone: number,
  photo: string,
  position: string,
  position_id: number,
  registration_timestamp: number,
}

const GetRequestComponent = ({ page, setPage, isLoading, users, pagesCount }: any) => {


  const showMore = () => {
    setPage(page + 1)
  }

  return (

    <section id="get-request" className="main__get-request">
      <div className="get-request__container container-request">
        <div className="get-request__title title">
          Working with GET request
        </div>
        {isLoading ?
          <LoaderComponent />
          :
          <div className="get-request__content content-request">
            {users.length > 0 && users.sort((a: { registration_timestamp: number; }, b: { registration_timestamp: number; }) => a.registration_timestamp < b.registration_timestamp ? 1 : -1)
              .map((user: JSX.IntrinsicAttributes & UserProps) => (
                <GetRequestItemComponent {...user} key={user.id} />
              ))}
          </div>
        }
        <button className="get-request__button button"
          style={
            pagesCount === page ?
              {
                display: "none"
              }
              :
              {
              }
          }
          id="showMore"
          onClick={() => showMore()}>
          Show more
        </button>
      </div>
    </section>
  )
}

const memoizedGetRequestComponent = React.memo(GetRequestComponent)

export default memoizedGetRequestComponent