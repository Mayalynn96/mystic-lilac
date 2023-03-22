import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

function Home() {
    const [randomCard, setrandomCard] = useState({
        Images:[
            {src:"https://raw.githubusercontent.com/Mayalynn96/MyWitchyJournal/Dev/public/images/tarotCards/majorArcana/00TheFool.png"}
    ]})

    useEffect(() => {
        API.getAllCards(2).then(cards => {
            setrandomCard(cards[Math.floor(Math.random()*cards.length)])
            console.log(cards[Math.floor(Math.random()*cards.length)])
            const interval = setInterval(() => {
                setrandomCard(cards[Math.floor(Math.random()*cards.length)])
            }, 10000);
            return () => clearInterval(interval);
        })
        
    }, []);
    

    return (
        <main>
            <h2>Welcome!</h2>
            <div id="indexRandom">
                <img className="randomCard" src={randomCard.Images[0].src} alt="Card {{randomeCard.cardNumber}}: {{randomeCard.cardName}}" />
                <div>
                    <h3 id="randomCardTitle">Random Card</h3>
                    <p>Hello, my name is Maya and I'm a big fan of all things witchy! I have been dabbling in tarot card readings
                        for a few years now. I decided that I wanted to make my very own deck using Midjourney AI.</p>
                    <p>Here is a random card of the ones I've made so far! If you want to see all of them, simply click on the tab
                        labeled "Tarot Cards" in the top bar.</p>
                </div>
            </div>
        </main>
    )
}

export default Home;