import React /*{ useState }*/ from "react";

import Card from 'react-bootstrap/Card';
import pokedollar from '../../../assets/pokedollar.png'

function ItemCard(props){

  // const [cardBodyIdx, setCardBodyIdx] = useState(0);

  // const handleClick = () => {
  //   if(cardBodyIdx){
  //     setCardBodyIdx(0)
  //   } else {
  //     setCardBodyIdx(1)
  //   }
  // }

  return(
    <Card className="itemCard">
      <Card.Header className="itemCardHeader">
        <div>
          <img 
            src={props.item.sprite}
            alt={`Official sprite artwork for ${props.item.name}`}
          />
          <strong>{props.item.name}</strong>          
        </div>
        <div>
          <img
            className="pokedollar" 
            src={pokedollar}
            alt="The symbol for the currency used in Pokemon games"
          />{props.item.cost}               
        </div>
      </Card.Header>
      <Card.Body className="itemCardBody">
        {props.item.description}
        {/* <Button variant="outline" onClick={handleClick}>{`<`}</Button>
        {
          cardBodyIdx === 0 ? 
            props.item.description
          :
            <>
              {console.log(props.item.fling)}
            </>
        }
        <Button variant="outline" onClick={handleClick}>{`>`}</Button> */}
      </Card.Body>
    </Card>
  )

}

export default ItemCard;