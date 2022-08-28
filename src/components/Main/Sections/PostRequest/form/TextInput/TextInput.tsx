import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form/dist/types'
import { errorStyle } from '../FormBody'
import './TextInput.scss'

interface TextInputType {
  register: object,
  errors: FieldError | undefined,
  dirtyFields: boolean | undefined,
  name: string,
  placeholder: string,
  label: string,
  tip: string | ReactNode
}

export const TextInput = ({ register, errors, dirtyFields, name, placeholder, label, tip }: TextInputType) => {

  return (
    <div className="form__input-text-container text-input-container">
      {/* INPUT */}
      <input
        style={errors &&
          errorStyle.border()
        }
        {...register}
        className="text-input-container__text-input input-text"
        type="text"
        placeholder={placeholder}
      />
      {errors &&
        <div className="text-input-container__tip tip"
          style={errors && errorStyle.text()}>
          {tip}
        </div>
      }
      {/* LABEL */}
      {dirtyFields &&
        <label style={errors && errorStyle.text()} className="text-input-container__label label" htmlFor={name}>
          {label}
        </label>
      }
    </div>
  )
}
