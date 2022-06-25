import React from "react";
import './main-component.scss'
import GetRequestComponent from "./sections/get-request/get-request-component";
import PostRequestComponent from "./sections/post-request/post.request-component";
import TestAsignmentComponent from "./sections/test-asignment/test-asignment-component";

const MainComponent = () => {
  
  
  return (
    <main className="main">
      <TestAsignmentComponent />
      <GetRequestComponent />
      <PostRequestComponent />
    </main>
  )
}

export default MainComponent
