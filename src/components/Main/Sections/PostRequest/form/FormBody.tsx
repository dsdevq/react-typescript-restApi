import { useState } from 'react';
import './FormBody.scss'
import { useForm } from "react-hook-form";
import { FileInput } from './FileInput/FileInput';
import { AfterSent } from './AfterSent/AfterSent';
import { RadioContainer } from './RadioInput/RadioContainer';
import { useDispatch } from 'react-redux';
import { userAdded } from '../../../../../featured/users/usersSlice';
import { TextInput } from './TextInput/TextInput';

const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

export interface FormValues {
  name: string,
  email: string,
  phone: string,
  photo: string,
  position_id: string,
}
export const errorStyle = {
  errorColor: '#CB3D40',
  border: function () {
    return {
      border: `2px solid ${this.errorColor}`
    }
  },
  text: function () {
    return {
      color: this.errorColor
    }
  },
}

export default function FormBody() {
  const [status, setStatus] = useState({
    status: false,
    message: ''
  })

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isValid,
      errors,
      dirtyFields,
    }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      "name": "",
      "email": "",
      "position_id": undefined,
      "phone": '',
      "photo": "",
    },
  })


  const postUser = async (data: FormData) => {
    try {
      const token = await fetch(TOKEN_URL)
      const tokenJsoned = await token.json()
      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        method: 'post',
        headers: {
          Token: tokenJsoned.token
        },
        body: data
      })
      return await response.json().then((data) => {
        setStatus({
          status: data.success,
          message: data.message
        })
        if (data.success) { // success response 
          reset(
            {
              "name": "",
              "email": "",
              "position_id": undefined,
              "phone": '',
              "photo": "",
            },
          );
          console.log(data)
          // $ Refresh is okay
          dispatch(userAdded())
          setTimeout(() => {
            setStatus({
              status: false,
              message: ''
            })
          }, 5000)
        } else { // server errors 
          console.log(data)
        }
      })
    } catch (error) {
      console.log('postUser api error: ', error);
    }
  }

  // Submits form data
  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault()
    const formData = new FormData()
    formData.append('position_id', data.position_id)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('photo', data.photo[0])
    await postUser(formData)
  })

  return (
    <>
      <form id='form' className="post-request__form form" onSubmit={onSubmit}>
        <div className="form__text-container">
          {/* NAME */}
          <TextInput
            register={
              {
                ...register('name', {
                  required: true,
                  minLength: 2,
                  maxLength: 60
                })
              }
            }
            errors={errors.name}
            dirtyFields={dirtyFields.name}
            name='name'
            label='Name'
            placeholder='Your name'
            tip='Username should contain 2-60 characters'
          />
          {/* EMAIL */}
          <TextInput
            register={
              {
                ...register('email', {
                  required: true,
                  minLength: 2,
                  maxLength: 100,
                  // eslint-disable-next-line no-control-regex
                  pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
                })
              }
            }
            errors={errors.email}
            dirtyFields={dirtyFields.email}
            name='email'
            placeholder='Email'
            label="Email"
            tip={
              (
                <div>
                  User email, must be a valid email according to <strong>RFC2822</strong>
                </div>
              )
            }
          />
          {/* Phone */}
          <TextInput
            register={
              {
                ...register('phone', {
                  required: true,
                  minLength: 6,
                  maxLength: 13,
                  // eslint-disable-next-line no-useless-escape
                  pattern: /^[\+]{0,1}\+380([0-9]{9})$/
                })
              }
            }
            errors={errors.phone}
            dirtyFields={dirtyFields.phone}
            name="phone"
            placeholder="Phone"
            label="Phone"
            tip="+38 (XXX) XXX - XX - XX"
          />
        </div>
        {/* CHECKBOX */}
        <RadioContainer
          register={register}
        />
        {/* Photo */}
        <FileInput
          register={register}
          errors={errors}
        />
        <button type="submit" className="form__button button"
          disabled={!isValid}
        >
          Sign up
        </button>
      </form>
      {status.status &&
        <AfterSent status={status.status} message={status.message} />
      }
    </>
  );
}
