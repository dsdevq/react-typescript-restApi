import React, { useEffect, useState } from "react";
import './get-request-component.scss'
import GetRequestItemComponent from "./get-request-item/get-request-item-component";

interface UserProps {
  email: string,
  id: number,
  name: string,
  phone: number,
  photo: string,
  position: string,
  position_id: number,
}

// const USERS_URL = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`
// const USERS_URL2 = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=2&count=6`


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
    users.length > 0 ? setUsers(oldArray => [...oldArray, result.users[0], result.users[1], result.users[2], result.users[3], result.users[4], result.users[5]]) : setUsers(result.users)
  }

  const showMore = () => {
    setPage(page + 1)
    // setPages(oldArray => [...oldArray, [2, 3, 4]])
    // console.log(pages)


  }


  return (
    <section className="main__get-request">
      <div className="get-request__container">
        <div className="get-request__title title">
        Working with GET request
        </div>
        <div className="get-request__content content-request">
        {users.length > 0 && users.sort().map(user => (
        <GetRequestItemComponent 
            registration_timestamp={0} email={""} id={0} name={""} phone={0} photo={""} position={""} position_id={0}
            {...(user as {})} key={user.id}/>
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
            display: 'grid'
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