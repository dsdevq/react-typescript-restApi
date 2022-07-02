import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { AfterSent } from '../afterSent/aftersent';
import Checkboxes from './checkboxes';
import File from './File';
import TextInput from './TextInput';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

interface FormValues {
  email: string,
  name: string,
  phone: string,
  photo: string,
  position_id: number,
}

// const schema = yup.object().shape({
//   photo: yup
//     .mixed()
//     .required()
//     .test((value) => {
//       if (value) {
//         return value && value[0].size <= 50
//       }
//     })
// })

// const newImage = (image: any) => {
//   const myImage = new Image()
//   myImage.src = window.URL.createObjectURL(image[0])
//   console.log(myImage.width)
//   console.log(myImage.onload = () => {
//     return myImage.width
//   })
//   return ((myImage.onload = () => myImage.width)())
// }

// const ValidateImg = (file: any) =>{
//   let img = new Image()
//   img.src = window.URL.createObjectURL(file)
//   return img.onload = () => {
//       if(img.width < 70 && img.height < 70){
//         alert("Correct size");
//         return true;
//       }
//       alert("Incorrect size");
//       return false;
//   }
// }


export default function Form({
  setAddedUser
}: any) {

  const [fileName, setFileName] = useState<string>('Upload your photo')

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
    // resolver: yupResolver(schema)
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

  // Submits form data
  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault()
    const token = await getTheToken(TOKEN_URL)
    await postUser(token, data)
    await setAddedUser(true)
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
        <div className="form__checkbox-container">
          <div className="form__checkbox-title">
            Select your position
          </div>
          {/* Checkboxes */}
          <Checkboxes register={register} />
        </div>

        {/* Photo */}
        <File
          fileName={fileName}
          setFileName={setFileName}
          register={register}
          // valid={schema}
          errors={errors}
          isSubmitSuccessful={isSubmitSuccessful}
        />

        <button type="submit" className="form__button button" disabled={!isValid}>
          Sign up
        </button>
      </form>
      {isSubmitted ?
        <AfterSent />
        : null
      }
    </>
  );
}
