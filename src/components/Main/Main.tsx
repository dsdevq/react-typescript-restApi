import React, { useEffect, useState } from "react";
import './Main.scss'
import GetRequestComponent from "./Sections/GetRequest/GetRequest";
import { PostRequest } from "./Sections/PostRequest/PostRequest";
import { TestAsignment } from "./Sections/TestAssignment/TestAsignment";

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

export const MainComponent = () => {

  // Current page
  const [page, setPage] = useState<number>(1)

  // Users from 1 page

  const [users, setUsers] = useState<UserProps[]>([])

  // Added user
  const [addedUser, setAddedUser] = useState<boolean>(false)

  // ALL PAGES
  const [pagesCount, setPagesCount] = useState<number>(0)

  // Loading
  const [isLoading, setLoading] = useState<boolean>(true)

  // Renders at start or when clicked ShowMore or user added
  useEffect(() => {
    getUsers(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
  }, [page, addedUser])

  const getUsers = async (URL: string) => {
    try {
      // Loader
      setLoading(true)
      
      const response = await fetch(URL)
      const result = await response.json()
      setPagesCount(result.total_pages)
      
      // ShowMore and Sign Up
      page === 1 ? setUsers(result.users) : addedUser ? setPage(1) : setUsers(oldArray => [...oldArray, ...result.users])
    } catch (error) {
      console.log('getUsers api error: ', error);
    }
    setLoading(false)
  }

  return (
    <main className="main">
      <TestAsignment />
      <GetRequestComponent
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        users={users}
        pagesCount={pagesCount}
      />
      <PostRequest
        setAddedUser={setAddedUser}
      />
    </main>
  )
}