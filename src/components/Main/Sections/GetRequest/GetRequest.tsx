import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../featured/users/requests";
import { isAdded, isVisible, selectAllUsers, selectPage, showMore } from "../../../../featured/users/usersSlice";
import { Loader } from "../../../Loader/Loader";
import { UserProps } from "../../Main";
import './GetRequest.scss'
import GetRequestItemComponent from "./Item/Item";


export const GetRequestComponent = () => {

  const dispatch = useDispatch()
  const isUserAdded = useSelector(isAdded)
  const pageS = useSelector(selectPage)
  const buttonIsVisible = useSelector(isVisible)
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(getUsers(`?page=${pageS}&count=6`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageS, isUserAdded])

  return (

    <section id="get-request" className="main__get-request">
      <div className="get-request__container container-request">
        <div className="get-request__title title">
          Working with GET request
        </div>
        {!users.length ?
          <Loader />
          :
          <div className="get-request__content content-request">
            {users
              .map((user: JSX.IntrinsicAttributes & UserProps) => (
                <GetRequestItemComponent {...user} key={user.id} />
              ))}
          </div>
        }
        {
          buttonIsVisible &&
          <button className="get-request__button button"
            id="showMore"
            onClick={() => dispatch(showMore())}>
            Show more
          </button>
        }
      </div>
    </section>
  )
}