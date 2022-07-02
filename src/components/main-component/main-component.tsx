import React, { useEffect, useState } from "react";
import './main-component.scss'
import GetRequestComponent, { UserProps } from "./sections/get-request/get-request-component";
import PostRequestComponent from "./sections/post-request/post.request-component";
import TestAsignmentComponent from "./sections/test-asignment/test-asignment-component";

const MainComponent = () => {

  const [page, setPage] = useState(1)

  // Users from 1 page

  const [users, setUsers] = useState<UserProps[]>([])

  const [addedUser, setAddedUser] = useState(false)

  // ALL PAGES
  const [pagesCount, setPagesCount] = useState(null)

  // Loading
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getUsers(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
  }, [page, addedUser])

  const getUsers = async (URL: any) => {
    try {
      setLoading(true)
      const response = await fetch(URL)
      const result = await response.json()
      const totalPages = result.total_pages
      setPagesCount(totalPages)
      page === 1 ? 
      setUsers(result.users)
      : 
      addedUser 
      ? 
      setPage(1)
      :
      setUsers(oldArray => [...oldArray, ...result.users])
    } catch (error) {
      console.log('getUsers api error: ', error);
    }
    setLoading(false)
  }

  return (
    <main className="main">
      <TestAsignmentComponent />
      <GetRequestComponent
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        users={users}
        pagesCount={pagesCount}
      />
      <PostRequestComponent 
        page={page}
        setPage={setPage}
        users={users}
        setUsers={setUsers}
        setAddedUser={setAddedUser}
      />
    </main>
  )
}

export default MainComponent
