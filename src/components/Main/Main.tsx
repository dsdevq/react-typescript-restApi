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
  return (
    <main className="main">
      <TestAsignment />
      <GetRequestComponent />
      <PostRequest />
    </main>
  )
}