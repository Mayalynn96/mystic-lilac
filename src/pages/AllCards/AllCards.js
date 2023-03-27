import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

function AllCards() {
    const [allCards, setallCards] = useState([])
    const [deckId, setdeckId] = useState(2)

    useEffect(() => {
        API.getAllCards(deckId).then(cards => {
            setallCards(cards)
        })
    }, [deckId])

    const deckChange = (e) => {
        setdeckId(e.target.value)
    }

    return (
        <main>
            <h2>Choose a deck</h2>
            <select name='deckSelection' id='deckSelection' onChange={deckChange}>
                <option value="2">Maya's deck</option>
                <option value="1">Rider-Waite</option>
            </select>
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