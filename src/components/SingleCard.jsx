import { useState } from "react";
import "./SingleCard.css"

function SingleCard({data: card, flip }) {
    const [flipped,setFlipped] = useState(false)

    const flipCard=(e)=>{
        flip(card)
        setFlipped(!flipped)
    }

    return (
        <div className='grid-item' id={card.id} onClick={flipCard}>
            <img className="back" src="/assets/cover.png" alt="" height="150" width="175" />
            <img className="front" src={card.src} alt="" height="150" width="175" />
        </div>
    );
}

export default SingleCard;