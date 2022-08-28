import './Radio.scss'
import { Position } from './RadioContainer'

type Radio = {
  position: Position,
  register: any
}
export const RadioInput = ({ register, position }: Radio) => {

  return (
    <div className="form__checkbox-radio">
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
