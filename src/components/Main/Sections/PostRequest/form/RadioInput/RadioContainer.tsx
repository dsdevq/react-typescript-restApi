import React, { useEffect, useState } from 'react';
import { RadioInput } from './RadioInput';

export interface Position {
  id: string,
  name: string
}

export const RadioContainer = ({ register }: any) => {

  const [positions, setPositions] = useState<any[]>([])

  const getPositions = async (api: string) => {
    const response = await fetch(api)
    const result = await response.json()
    setPositions(result.positions)
  }

  // Renders only once when the page is loaded
  useEffect(() => {
    getPositions('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
  }, [])

  return (
    <div className="form__checkbox-container">
      <div className="form__checkbox-title">
        Select your position
      </div>
      {/* Checkboxes */}
      {positions?.length > 0 && positions.map(position => (
        <RadioInput key={position.id} position={position} register={register} />
      ))}
    </div>
  )
}
