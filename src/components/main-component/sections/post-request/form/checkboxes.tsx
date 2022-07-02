import React, { useEffect, useState } from 'react'
import Checkbox from './checkbox'

export default function Checkboxes( { register } :any) {

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
    <>
    {positions?.length > 0 && positions.map(position => (
      <Checkbox key={position.id} position={position} register={register} />
     ))}
    </>
  )
}
