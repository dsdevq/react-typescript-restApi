import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './post.request-component.scss'

interface FormValues {
  email: string,
  name: string,
  phone: number,
  photo: string,
  position_id: number,
}

const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

function PostRequestComponent()  {

  const [positions, setPositions] = useState<any[]>([])
  const {register, handleSubmit, } = useForm<FormValues>({})


  const getPositions = async (api: string) => {
    const response = await fetch(api)
    const result = await response.json()
    setPositions(result.positions)
  }

  useEffect(() => {
    getPositions('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
  }, [])

  



  const getTheToken = async (tokenUrl: string) => {
    try {
      const response = await fetch(tokenUrl)
      const result = await response.json()
      return result.token
    } catch (error) {
      console.log('getTheToken api error: ', error);
    }
  }

  const postUser = async (token: string, data: any) => {
    try {
      const formData = new FormData()
      formData.append('position_id', data.position_id)
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('photo', data.photo[0])
      const requestOptions = {
        method: 'post',
        headers: { 
          Token: token
        },
        body: formData
      }
      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', requestOptions)
      return await response.json()
    } catch (error) {
      console.log('postUser api error: ', error);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const token = await getTheToken(TOKEN_URL)
    await postUser(token, data)
  })

  return (
    <section id="post-request" className="main__post-request">
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
            required: true, 
            // minLength: 2, 
            // maxLength: 60
          })}
          className="form__text-input input-text" 
          type="text" 
          placeholder="Your name" 
          />

          {/* Email */}
          <input 
          {...register('email', {
            required: true, 
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
            required: true, 
            // minLength: 6, 
            // maxLength: 12,
          })}
          className="form__text-input input-text" 
          type="tel" 
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
                  required: true
                })}
                id={position.id}
                value={position.id}
                />
                <label htmlFor={position.id}>
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
        {/* Photo */}
        <label htmlFor="input-file" className="form__upload-container container-upload">
          <span className="container-upload__button">
            Upload
          </span>
          <p className="file__placeholder input-text">
            Upload your photo
          </p>
          
          <input 
          type="file"  
          id="input-file"
          accept="image/jpeg,image/jpg"
          className="container-upload__file-input"
          {...register('photo', {
            required: true
          })}
          />

        </label>
        <button type="submit" className="form__button button">
          Sign up
        </button>
        </form>

      </div>
    </section>
  )


}

export default PostRequestComponent