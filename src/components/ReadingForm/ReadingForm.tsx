import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import './ReadingForm.css'
import 'react-datepicker/dist/react-datepicker.css';
import { Slider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from '../../components/SearchBar/SearchBar';
import dayjs from 'dayjs';

function ReadingForm({ token, addReadingVis, setAddReadingVis, setAddReadingBtnVis }) {
    const today = dayjs().format("YYYY-MM-DD")
    const [readingDate, setReadingDate] = useState(today);
    const [eventDate, setEventDate] = useState<String | null>(today);
    const [question, setQuestion] = useState('')
    const [generalTake, setGeneralTake] = useState('')
    const [outcome, setOutcome] = useState('')
    const [accuracyInput, setAccuracyInput] = useState(0);
    const [accuracy, setAccuracy] = useState<null | Number>(null);
    const [allCards, setAllCards] = useState<any[]>([]);
    const [positions, setPositions] = useState([{
        cardName: "null",
        cardId: null,
        position: "null",
        personalInterpretation: "null",
        isReversed: false
    }]);

    useEffect(() => {
        const fetchCards = async () => {
            const fetchedCards = await API.getAllCardsSimple();
            setAllCards(fetchedCards);
        }

        fetchCards()
            .catch(console.error);
    }, []);

    const handleChange = (event) => {
        event.preventDefault();

        if (event.target.id === "questionInput") {
            setQuestion(event.target.value)
        } else if (event.target.id === "generalTakeInput") {
            setGeneralTake(event.target.value)
        } else if (event.target.id === "outcomeInput") {
            setOutcome(event.target.value)
        } else if (event.target.id === "accuracy") {
            setAccuracyInput(event.target.value)
        } else if (event.target.id === "readingDate") {
            setReadingDate(event.target.value)
        } else if (event.target.id === "eventDate") {
            setEventDate(event.target.value)
            setNotNullEventDate(event.target.value)
        }
    }

    const handleChange2 = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setAccuracyInput(newValue);
            setAccuracy(newValue)
        }
    };

    const disableEventDate = (event) => {
        event.preventDefault()

        if (event.target.id === "disableEventDate") {
            const eventDateInput = (document.getElementById("eventDate") as any);

            const disableEventDate = (document.getElementById("eventDate") as any);
            const disableEventDateLabel = (document.getElementById("eventDateLabel") as any);

            if (eventDateInput && disableEventDate.style.display === "") {
                disableEventDate.style.display = "none";
                disableEventDateLabel.style.display = "none";
                event.target.textContent = "Add Event Date";
                setEventDate(null)
                setNotNullEventDate(today)
            } else if (eventDateInput && disableEventDate.style.display === "none") {
                disableEventDate.style.display = "";
                disableEventDateLabel.style.display = "";
                event.target.textContent = "x";
            }
        } else if (event.target.id === "disableOutcome") {
            const outcomeInput = (document.getElementById("outcomeInput") as any);

            const disableOutcome = (document.getElementById("outcomeInput") as any);
            const disableOutcomeLabel = (document.getElementById("outcomeLabel") as any);

            if (outcomeInput && disableOutcome.style.display === "") {
                disableOutcome.style.display = "none";
                disableOutcomeLabel.style.display = "none";
                event.target.textContent = "Add Outcome";
                setOutcome('')
            } else if (outcomeInput && disableOutcome.style.display === "none") {
                disableOutcome.style.display = "";
                disableOutcomeLabel.style.display = "";
                event.target.textContent = "No Outcome yet";
            }
        } else if (event.target.id === "disableAccuracy") {
            const disableAccuracy = (document.getElementById("accuracyInput") as any);
            const accuracyLabel = (document.getElementById("accuracyLabel") as any);

            if (disableAccuracy && disableAccuracy.style.display === "") {
                disableAccuracy.style.display = "none";
                accuracyLabel.style.display = "none";
                event.target.textContent = "Add Accuracy";
                setAccuracy(null)
            } else if (disableAccuracy && disableAccuracy.style.display === "none") {
                disableAccuracy.style.display = "";
                accuracyLabel.style.display = "";
                event.target.textContent = "No Accuracy yet";
                setAccuracy(accuracyInput)
            }
        }
    }

    const [allCardsSearch, setAllCardsSearch] = useState<any[]>([]);
    const [displayCardPosition, setDisplayCardPosition] = useState("none")

    const openAddPosition = (event) => {
        event.preventDefault();
        // setAllCardsSearch(allCards);
        setDisplayCardPosition("flex")
    }

    const [selectedCard, setSelectedCard] = useState({
        id: null,
        cardName: "null"
    })
    const [isAddingCard, setIsAddingCard] = useState(false);

    const selectCard = (card) => {
        setSelectedCard(card)
        setIsAddingCard(true)
    }

    const [positionInput, setPositionInput] = useState("")
    const [personalInterpretationInput, setPersonalInterpretationInput] = useState("")
    const [isReversed, setIsReversed] = useState(false)

    const addPosition = () => {
        const newPosition = {
            cardName: selectedCard.cardName,
            cardId: selectedCard.id,
            position: positionInput,
            personalInterpretation: personalInterpretationInput,
            isReversed: isReversed
        }
        setPositions(current => [...current, newPosition])
        setDisplayCardPosition("none")
        setSelectedCard({
            id: null,
            cardName: "null"
        })
        setPositionInput("")
        setPersonalInterpretationInput("")
        setIsAddingCard(false)
        setIsReversed(false)
    }

    const closeAddPosition = (event) => {
        event.preventDefault()
        setDisplayCardPosition("none")
        setSelectedCard({
            id: null,
            cardName: "null"
        })
        setPositionInput("")
        setPersonalInterpretationInput("")
        setIsAddingCard(false)
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#EFA9AE',
            },
            secondary: {
                main: '#EFA9AE',
            },
        },
    });

    const addNewReading = async () => {
        const allPositions: any[] = positions.map(position => {
            if (position.cardId !== null) {
                const thisPosition = {
                    cardId: position.cardId,
                    position: position.position,
                    personalInterpretation: position.personalInterpretation,
                    isReversed: position.isReversed
                }
                return thisPosition
            } else {
                return null
            }
        })

        allPositions.shift();

        const readingObj = {
            readingDate: readingDate,
            eventDate: eventDate,
            question: question,
            generalTake: generalTake,
            outcome: outcome,
            accuracy: accuracy,
            positions: allPositions
        }

        const addedReading = await API.createReading(readingObj, token)

        console.log(addedReading)
        if (addedReading.hasFailed) {
            console.log(addedReading.msg)
        } else {
            setReadingDate(today);
            setEventDate(today);
            setQuestion('');
            setGeneralTake('');
            setOutcome('');
            setAccuracyInput(0);
            setAccuracy(null);
            setPositions([{
                cardName: "null",
                cardId: null,
                position: "null",
                personalInterpretation: "null",
                isReversed: false
            }]);
            setAddReadingVis("none");
            setAddReadingBtnVis("");
            console.log(addedReading.msg)
        }
    }

    const closeAddReading = () => {
        setAddReadingVis("none");
        setAddReadingBtnVis("");
    }

    const [notNullEventDate, setNotNullEventDate] = useState(today)
    
    return (
        <div id="ReadingFormDiv" style={{display: addReadingVis}}>
            <h2>Adding a reading</h2>
            <form id="readingForm">
                <div id="readingDateDiv">
                    <label>Reading Date:</label>
                    <input className="dateInputField" type="date" onChange={handleChange} id="readingDate" value={readingDate}/>
                </div>
                <div id='eventDateDiv'>
                    <label id="eventDateLabel">Event Date:</label>
                    <input className="dateInputField" type="date" onChange={handleChange} id="eventDate" value={notNullEventDate} />
                    <button id='disableEventDate' onClick={disableEventDate}>x</button>
                </div>
                <div className='formDiv'>
                    <label>Question:</label>
                    <input type='text' id='questionInput' value={question} onChange={handleChange} />
                </div>
                <div className='formDiv'>
                    <label>General Take:</label>
                    <textarea id='generalTakeInput' value={generalTake} onChange={handleChange} />
                </div>
                <div className='formDiv'>
                    <label id='outcomeLabel' style={{ display: "none" }}>Outcome:</label>
                    <input type='text' id='outcomeInput' value={outcome} onChange={handleChange} style={{ display: "none" }} />
                    <button id='disableOutcome' onClick={disableEventDate}>Add Outcome</button>
                </div>
                <div className='formDiv'>
                    <label id='accuracyLabel' style={{ display: "none" }}>Accuracy: {accuracyInput}%</label>
                    <ThemeProvider theme={theme}>
                        <Slider id="accuracyInput" aria-label="accuracyInput" onChange={handleChange2} color="secondary" min={0} max={100} disabled={false} style={{ display: "none" }} />
                    </ThemeProvider>
                    <button id='disableAccuracy' onClick={disableEventDate}>Add Accuracy</button>
                </div>
            </form>
            <div id="addPositionDiv" style={{ display: displayCardPosition }}>
                <div id="innerPositionDiv">
                    <button id='closeAddPositionBtn' onClick={closeAddPosition}>X</button>
                    <h1>Add Position</h1>
                    <h2>Card:</h2>
                    {isAddingCard
                        ? <><div id="selectedCardInput"><p>{selectedCard.cardName}</p><button id="xOutBtn" onClick={() => setIsAddingCard(false)}>X</button></div></>
                        : <><SearchBar originalList={allCards} setList={setAllCardsSearch} className="searchBar" /><div id='SearchResults'> {allCardsSearch.map((card, index) => <p className="cardSelection" key={index} onClick={() => selectCard(card)}>{card.cardName}</p>)} </div></>
                    }
                    <input type='text' placeholder='Position' id='positionInput' value={positionInput} onChange={(event) => setPositionInput(event.target.value)} />
                    <textarea placeholder='Personal Interpretation' id='personalInterpretationInput' value={personalInterpretationInput} onChange={(event) => setPersonalInterpretationInput(event.target.value)}></textarea>
                    <div>
                        <label>This card is reversed</label>
                        <input type="checkbox" id='reversedCheckbox' checked={isReversed} onChange={() => { setIsReversed(!isReversed) }} />
                    </div>
                    <div id="addBtnPosition">
                        <button onClick={addPosition}>Add Card</button>
                    </div>
                </div>
            </div>
            <div id="allAddedCards">
                {positions.map((position, index) => {
                    if (position.position !== "null") {
                        return (
                            <div key={index} className='cardBox'>
                                <h3>{position.cardName}</h3>
                                <h4>Position: {position.position}</h4>
                                <p>{position.personalInterpretation}</p>
                                {position.isReversed ? <h4>Reversed</h4> : null}
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
                <div className='cardBox'>
                    <h3>Add a card and it's position</h3>
                    <button id="addPositionBtn" onClick={openAddPosition}>+</button>
                </div>
            </div>
            <button onClick={addNewReading}>Add Reading</button>
            <button onClick={closeAddReading}>Nevermind</button>
        </div>
    )
}

export default ReadingForm;