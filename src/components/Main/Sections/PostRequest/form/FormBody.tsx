import React, { useEffect, useState } from 'react';
import './FormBody.scss'
import { useForm, UseFormRegister } from "react-hook-form";
import FileInput from './FileInput/FileInput';
import { AfterSent } from './AfterSent/AfterSent';
import TextInput from './TextInput/TextInput';
import { RadioContainer } from './RadioInput/RadioContainer';
import { SetAddedUser } from '../PostRequest';

const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

export interface FormValues {
  name: string,
  email: string,
  phone: string,
  photo: string,
  position_id: string,
}

const errorColor = '#CB3D40'
export const errorStyle = {
  border: {
    border: `2px solid ${errorColor}`
  },
  text: {
    color: `${errorColor}`
  }
}

export default function FormBody({
  setAddedUser
}: SetAddedUser) {

  const [fileName, setFileName] = useState<string>('Upload your photo')
  const [status, setStatus] = useState({
    status: false,
    message: ''
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isValid,
      errors,
      dirtyFields,
      isSubmitSuccessful,
      isSubmitted
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


  useEffect(() => {
    reset(
      {
        "name": "",
        "email": "",
        "position_id": undefined,
        "phone": '',
        "photo": "",
      },
      {
        keepIsSubmitted: true
      }
    );
  }, [isSubmitSuccessful]);

  const getTheToken = async (tokenUrl: string) => {
    try {
      const response = await fetch(tokenUrl)
      const result = await response.json()
      return result.token
    } catch (error) {
      console.log('getTheToken api error: ', error);
    }
  }

  const postUser = async (token: string, data: FormValues) => {
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
      return await response.json().then(function (data) {
        setStatus({
          status: data.success,
          message: data.message
        })
        if (data.success) { // success response 
          setAddedUser(true)
          console.log(data)
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
    const token = await getTheToken(TOKEN_URL)
    await postUser(token, data)
  })



  return (
    <>
      <form className="post-request__form form" onSubmit={onSubmit}>
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
          <TextInput register={
            {
              ...register('email', {
                required: true,
                minLength: 2,
                maxLength: 100,
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
          fileName={fileName}
          setFileName={setFileName}
          register={register}
          errors={errors}
          isSubmitSuccessful={isSubmitSuccessful}
        />
        <button type="submit" className="form__button button" disabled={!isValid}>
          Sign up
        </button>
      </form>
      {isSubmitted?.valueOf() &&
        <AfterSent status={status.status} message={status.message} />
      }
    </>
  );
}
