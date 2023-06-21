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
                    <p>Our platform is designed for witches and anyone who is interested in exploring their spiritual side. Whether you're a seasoned practitioner or just starting out on your journey, our website provides a safe and inclusive space for you to connect with others and share your experiences.

With our journal keeping feature, you can record your thoughts, dreams, and insights in a private and secure space. You can also choose to share your entries with the community, allowing others to offer support and guidance as you navigate your spiritual path.

Our social media platform also includes a variety of features to help you connect with other witches from around the world. You can join groups based on your interests, participate in discussions, and even attend virtual events and workshops.

Our team is committed to creating a space that is respectful and supportive of all spiritual beliefs and practices. We believe that everyone has the right to explore their spirituality in their own way, and we are here to provide the tools and resources to help you on your journey.

Thank you for joining us on this exciting adventure, and we look forward to seeing you on our witchy themed journal keeping social media website!</p>
                </div>
            </div>
        </main>
    )
}

export default Home;