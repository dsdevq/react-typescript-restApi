import React from 'react'
import './Radio.scss'
import { Position } from './RadioContainer'


export const RadioInput = ( { register, position} : any) => {

  return (
    <div  className="form__checkbox-radio">
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
  </div>
  )
}
