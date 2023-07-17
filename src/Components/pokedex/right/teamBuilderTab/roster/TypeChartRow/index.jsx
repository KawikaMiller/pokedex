import React from 'react'
import { determineTypeEffectiveness } from '../../../../../../lib/typeEffectiveness';

function TypeChartRow (props){

  let typeEffectiveness = determineTypeEffectiveness(props.typeInfo);

  return(
    <tr key={`${props.typeInfo.name}_typechart_row`}>
      <td key={`${props.typeInfo.name}_label`}>
        <strong>
          {`${props.pokemonName[0].toUpperCase()}${props.pokemonName.slice(1).toLowerCase()}`}
        </strong>
      </td>
      {
        typeEffectiveness ? 
          typeEffectiveness.map(element => (
            <td>{`${element.effectiveness}x`}</td>
          )) 
        : 
          null 
      }
    </tr>
  )
}

export default TypeChartRow