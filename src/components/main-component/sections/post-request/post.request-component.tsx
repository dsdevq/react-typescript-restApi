import React, { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import './post.request-component.scss'

interface FormValues {
  email: string,
  name: string,
  phone: number,
  photo: string,
  position_id: string,
}

const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

const POST_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users'


function PostRequestComponent()  {


  const [positions, setPositions] = useState<any[]>([])

  const [token, setToken] = useState('')

  const getPositions = async (api: string) => {
    const response = await fetch(api)
    const result = await response.json()
    console.log(result)
    setPositions(result.positions)
  }

  useEffect(() => {
    getPositions('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
  }, [])

  

  const {register, handleSubmit, formState: { errors } } = useForm<FormValues>({})


  const getTheToken = async (tokenUrl: string) => {
    const response = await fetch(tokenUrl)
    const result = await response.json()
    console.log(result)
    setToken(result.token)
  }

  const postUser = async (url: string, data: any) => {
    const response = await fetch(url,
      {
        method: 'POST',
        body: data,
        headers: {
          'Token': token
        }
      })
    const result = await response.json()
    console.log(result)
  }

  const onSubmit = handleSubmit(async (data) => {

    console.log(data)
    // await getTheToken(TOKEN_URL)
    // await postUser(POST_URL, data)


    // POST
    // console.log((data.photo[0]))
  })

  return (
    <section className="main__post-request">
      <div className="post-request__container container-request">
        <div className="post-request__title title">
        Working with POST request
        </div>

        <form className="post-request__form form"
        onSubmit={onSubmit}
        >
        <div className="form__text-container">

          {/* Name */}
          <input 
          {...register('name', {
            // required: true, 
            // minLength: 2, 
            // maxLength: 60
          })}
          className="form__text-input input-text" type="text" 
          placeholder="Your name" 
          />

          {/* Email */}
          <input 
          {...register('email', {
            // required: true, 
            // minLength: 2,
            // maxLength: 100,
            // pattern: /^\S+@\S+$/i
          })}
          className="form__text-input input-text" 
          type="text" 
          placeholder="Email" 
          />

          {/* Phone */}
          <input 
          {...register('phone', {
            // required: true, 
            // minLength: 6, 
            // maxLength: 12,
          })}
          className="form__text-input input-text" type="tel" 

          placeholder="Phone" 
          />
        </div>
        <label className="form__label" htmlFor="phone">
          +38 (XXX) XXX - XX - XX
        </label>


        {/* CHECKBOX */}
        <div className="form__checkbox-container">
          <div className="form__checkbox-title">Select your position</div>
            {positions.length > 0 ? positions.map(position => (
              <p key={position.id} className="form__checkbox-radio">
                <input 
                className="form__radio-input"
                type="radio" 
                {...register('position_id', {
                  // required: true
                })}
                id={position.name}
                value={position.name}
                />
                <label htmlFor={position.name}>
                  {position.name}
                </label>
            </p>
            )
            ): 
              (
                <div className="error">
                No positions found
                </div>
              ) 
            } 
        </div>
        <div className="form__upload-container container-upload">
          <input 
          type="file"  
          {...register('photo', {
            // required: true
          })}
          />
          <span className="container-upload__input"></span>
        </div>
        <button type="submit" className="form__button button">
          Sign up
        </button>
        </form>

      </div>
    </section>
  )


}

export default PostRequestComponent