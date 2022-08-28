import { useState, useEffect } from 'react';
import { RadioInput } from './RadioInput';

export interface Position {
  id: string,
  name: string
}

export const RadioContainer = ({ register }: any) => {

  const [positions, setPositions] = useState<Position[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        const result = await response.json()
        setPositions(result.positions)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className="form__checkbox-container">
      <div className="form__checkbox-title">
        Select your position
      </div>
      {/* Checkboxes */}
      {positions && positions.map((position: Position) => (
        <RadioInput key={position.id} position={position} register={register} />
      ))}
    </div>
  )
}
