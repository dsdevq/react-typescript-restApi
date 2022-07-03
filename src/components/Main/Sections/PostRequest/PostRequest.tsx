import React from "react";
import FormBody from "./form/FormBody";

import './PostRequest.scss'

export interface SetAddedUser {
  setAddedUser: (addedUser: boolean) => void
}

export const PostRequest = ( { setAddedUser }: SetAddedUser  ) => {

  return (
    <section id="post-request" className="main__post-request">
      <div className="post-request__container container-request">
        <h1 className="post-request__title title">
          Working with POST request
        </h1>
        <FormBody 
        setAddedUser={setAddedUser}
        />
      </div>
    </section>
  )
}