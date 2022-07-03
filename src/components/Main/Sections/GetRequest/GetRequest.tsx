import React from "react";
import { Loader } from "../../../Loader/Loader";
import { UserProps } from "../../Main";
import './GetRequest.scss'
import GetRequestItemComponent from "./Item/Item";

interface GetRequest {
  page: number,
  setPage: (page: number) => void,
  isLoading: boolean,
  users: UserProps[],
  pagesCount: number
}

const GetRequestComponent = ({ page, setPage, isLoading, users, pagesCount }: GetRequest) => {

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
          <Loader />
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