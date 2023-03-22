import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

function AllCards() {
    const [allCards, setallCards] = useState([])
    useEffect(() => {
        API.getAllCards(2).then(cards => {
            setallCards(cards)
        })
    }, [])

    return (
        <main>
            <h2>See all my cards so far!</h2>
            <ul id="allCards">
                {allCards.map((card, index) => {
                    const alt = `Card ${card.cardNumber}: ${card.cardName}`
                    let side = 'even'
                    if(index%2!==0){
                        side = 'odd'
                    }
                    return (
                        <li key={index}>
                            <div className={side} >
                                <img className="randomCard" src={card.Images[0].src} alt={alt} />
                                <h3>{card.cardName}</h3>
                                {/* <h3 className="is-hidden">{{ cardNumber }}, {{ arcana }}</h3> */}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

export default AllCards;