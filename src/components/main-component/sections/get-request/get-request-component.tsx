import React, { useEffect, useState } from "react";
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

const GetRequestComponent = () => {

  // Users from 1 page
  const [users, setUsers] = useState<UserProps[]>([])
  
  // Current page
  const [page, setPage] = useState(1)

  // ALL PAGES
  const [pagesCount, setPagesCount] = useState(null)

  useEffect(() => {
    getUsers(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
  }, [page])
  

  const getUsers = async (URL: any) => {
    const response = await fetch(URL)
    const result = await response.json()
    const totalPages = result.total_pages
    setPagesCount(totalPages)
    console.log(result.users)
    users.length > 0 ? setUsers(oldArray => [...oldArray, ...result.users]) : setUsers(result.users)
  }

  const showMore = () => {
    setPage(page + 1)
  }


  return (
    <section className="main__get-request">
      <div className="get-request__container container-request">
        <div className="get-request__title title">
        Working with GET request
        </div>
        <div className="get-request__content content-request">
        {users.length > 0 && users.sort((a, b) => a.registration_timestamp > b.registration_timestamp ? 1 : -1).map(user => (
        <GetRequestItemComponent 

          registration_timestamp={user.registration_timestamp} 
          email={user.email} 
          id={user.id} 
          name={user.name} 
          phone={user.phone} 
          photo={user.photo} 
          position={user.position} 
          position_id={user.position_id}

          key={user.id}
          />
      ))}
        </div>
        <div className="get-request__button button" 
        style={
          pagesCount === page ? 
          {
            display: "none"
          } 
          : 
          {
          }
        }
        onClick={() => showMore()}
        >
          Show more
        </div>
      </div>
    </section>
  )
}

export default GetRequestComponent