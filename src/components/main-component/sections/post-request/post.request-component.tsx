import React, { useEffect, useState } from "react";
import Form from "./form/Form";

import './post.request-component.scss'



function PostRequestComponent( { setAddedUser }: any) {


  return (
    <section id="post-request" className="main__post-request">
      <div className="post-request__container container-request">
        <h1 className="post-request__title title">
          Working with POST request
        </h1>
        <Form 
        setAddedUser={setAddedUser}
        />
      </div>
    </section>
  )
}

export default PostRequestComponent