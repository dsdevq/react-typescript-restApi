import React, { ReactNode } from 'react'
import { FieldError } from 'react-hook-form/dist/types'
import { errorStyle } from '../FormBody'
import './TextInput.scss'

interface TextInput {
  register: object,
  errors: FieldError | undefined,
  dirtyFields: boolean | undefined,
  name: string,
  placeholder: string,
  label: string,
  tip: string | ReactNode
}

export default function TextInput({ register, errors, dirtyFields, name, placeholder, label, tip }: TextInput) {

  return (
    <div className="form__input-text-container text-input-container">
      {/* INPUT */}
      <input
        style={errors? { name }.valueOf() &&
        errorStyle.border
        : {}
        }
        {...register}
        className="text-input-container__text-input input-text"
        type="text"
        placeholder={placeholder}
      />
      {errors ? { name } &&
        <div className="text-input-container__tip tip" 
        style={errors ? { name } && errorStyle.text : {}}
        >
          {tip}
        </div>
        :
        null
      }
      {/* LABEL */}
      {dirtyFields ?
        <label style={errors ? { name } && errorStyle.text : {}} className="text-input-container__label label" htmlFor={name}>
          {label}
        </label>
        :
        null
      }
    </div>
  )
}
