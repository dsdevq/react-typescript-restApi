import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AfterSent } from "./afterSent/aftersent";
import './post.request-component.scss'

interface FormValues {
  email: string,
  name: string,
  phone: string,
  photo: string,
  position_id: number,
}

const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

function PostRequestComponent() {

  // GET POSITIONS
  const [positions, setPositions] = useState<any[]>([])


  // UPLOADING FILE
  const [fileName, setFileName] = useState<string>('Upload your photo')

  const {
    register,
    handleSubmit,
    formState: {
      isValid,
      errors,
      dirtyFields,
      isSubmitSuccessful
    }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      "name": "",
      "email": "",
      "position_id": undefined,
      "phone": '',
      "photo": "",
    }
  })


  const getPositions = async (api: string) => {
    const response = await fetch(api)
    const result = await response.json()
    setPositions(result.positions)
  }

  // Renders only once when the page is loaded
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
      console.log(data)
      console.log(isSubmitSuccessful)
      // const formData = new FormData()
      // formData.append('position_id', data.position_id)
      // formData.append('name', data.name)
      // formData.append('email', data.email)
      // formData.append('phone', data.phone)
      // formData.append('photo', data.photo[0])
      // const requestOptions = {
      //   method: 'post',
      //   headers: {
      //     Token: token
      //   },
      //   body: formData
      // }
      // const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', requestOptions)
      // return await response.json()
    } catch (error) {
      console.log('postUser api error: ', error);
    }
  }

  // Submits form data
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
        {/* FORM */}
        <form className="post-request__form form" onSubmit={onSubmit}>
          <div className="form__text-container">
            {/* Name */}
            <div className="form__input-text-container text-input-container">
              {/* LABEL */}
              {dirtyFields?.name &&
                <label
                  style={errors?.name &&
                    { color: '#CB3D40' }
                  }
                  className="text-input-container__label label" htmlFor="phone">
                  Name
                </label>

              }
              {/* INPUT */}
              <input
                {...register('name', {
                  required: true,
                  minLength: 2,
                  maxLength: 60
                })}
                style={errors?.name &&
                {
                  borderColor: '#CB3D40',
                  border: '2px solid #CB3D40'
                }
                }
                className="text-input-container__text-input input-text"
                type="text"
                placeholder="Your name"
              />
              {/* TIP */}
              {errors?.name &&
                <div className="text-input-container__tip tip"
                  style={errors?.name &&
                  {
                    color: '#CB3D40',
                  }
                  }
                >
                  Username should contain 2-60 characters
                </div>
              }
            </div>

            {/* EMAIL */}
            <div className="form__input-text-container text-input-container">
              {/* INPUT */}
              <input
                style={errors?.email &&
                {
                  borderColor: '#CB3D40',
                  border: '2px solid #CB3D40'
                }
                }
                {...register('email', {
                  required: true,
                  minLength: 2,
                  maxLength: 100,
                  pattern: /^\S+@\S+$/i
                })}
                className="text-input-container__text-input input-text"
                type="text"
                placeholder="Email"
              />
              {errors?.email &&
                <div className="text-input-container__tip tip" style={errors?.email && { color: '#CB3D40', }}>
                  User email, must be a valid email according to <strong>RFC2822</strong>
                </div>
              }
              {/* LABEL */}
              {dirtyFields?.email &&
                <label style={errors?.email && { color: '#CB3D40' }} className="text-input-container__label label" htmlFor="email">
                  Email
                </label>
              }
            </div>

            {/* Phone */}
            <div className="form__input-text-container text-input-container">

              <input
                {...register('phone', {
                  required: true,
                  minLength: 6,
                  maxLength: 13,
                })}
                style={errors?.phone &&
                {
                  borderColor: '#CB3D40',
                  border: '2px solid #CB3D40'

                }
                }
                className="text-input-container__text-input input-text"
                type="tel"
                placeholder="Phone"
              />
              {dirtyFields?.phone &&
                <label
                  style={errors?.phone &&
                    { color: '#CB3D40' }
                  }
                  className="text-input-container__label label" htmlFor="phone">
                  Phone
                </label>
              }
              {errors?.phone &&
                <div
                  style={errors?.phone &&
                  {
                    color: '#CB3D40',
                  }
                  }
                  className="text-input-container__tip tip">
                  +38 (XXX) XXX - XX - XX
                </div>
              }
            </div>
          </div>

          {/* CHECKBOX */}
          <div className="form__checkbox-container">
            <div className="form__checkbox-title">
              Select your position
            </div>
            {positions?.length > 0 && positions.map(position => (
              <div key={position.id} className="form__checkbox-radio">
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
              </div>))}
          </div>
          {/* Photo */}
          <label htmlFor="input-file" className="form__upload-container container-upload">
            <span className="container-upload__button" style={errors?.photo && { border: '2px solid #CB3D40' }}>
              Upload
            </span>
            <div className="file__placeholder input-text" style={errors?.photo && { border: '2px solid #CB3D40' }}>
              {fileName}
            </div>

            <input
              type="file"
              id="input-file"
              accept="image/jpeg,image/jpg"
              className="container-upload__file-input"
              {...register('photo', {
                required: true,
                onChange: (e) => {
                  setFileName(e.target.files[0].name)
                }
              })}
            />

          </label>
          {errors?.photo &&
            <div className="text-input-container__tip tip"
              style={errors?.photo && { color: 'CB3D40' }}>
              Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb.
            </div>
          }

          <button type="submit" className="form__button button" disabled={!isValid}>
            Sign up
          </button>
        </form>
        {isSubmitSuccessful? 
        <AfterSent />
        : null
        }

      </div>
    </section>
  )


}

export default PostRequestComponent