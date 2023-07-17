import React from "react";
import TypeBadge from "../../../../../type/Badge";

function TypeMatchup({typeEffectiveness}) {

  return(
    <div id='type_effectiveness'>
      <div className="type_badge_row" >
        <p>Weak: </p>
        <div className="type_badges">
          {typeEffectiveness.map(element => {
            if(element.effectiveness >= 2){
              return <TypeBadge type={element.type} effectiveness={element.effectiveness} />
            } else return null
          })}          
        </div>

      </div>
    
      <div className="type_badge_row" >
        <p>Resistant: </p>
        <div className="type_badges">
          {typeEffectiveness.map(element => {
            if(element.effectiveness < 1 && element.effectiveness > 0){
              return <TypeBadge type={element.type} effectiveness={element.effectiveness} />
            } else return null;
          })}          
        </div>

      </div>
    
      <div className="type_badge_row" >
        <p>Immune: </p>
        <div className="type_badges">
          {typeEffectiveness.map(element => {
            if(element.effectiveness === 0){
              return <TypeBadge type={element.type} />
            } else return null;
          })}          
        </div>

      </div>
    </div>
  )
}

export default TypeMatchup;