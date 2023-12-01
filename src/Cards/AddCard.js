import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [frontCard, setFrontCard] = useState("");
    const [backCard, setBackCard] = useState("");
    const handleFrontCardChange = (event) => setFrontCard(event.target.value);
    const handleBackCardChange = (event) => setBackCard(event.target.value);

    // useEffect hook to fetch and set the deck data based on deckId
    useEffect( () => {
        const abortController = new AbortController();
        const { signal } = abortController;

        // Initiates an API call to retrieve deck data based on deckId using the 'readDeck' function
        readDeck(deckId, signal).then((deck) => {
            // Updates the state with the fetched deck data
            setDeck(deck)
        })
        
        // Cleanup function to abort the ongoing request upon component unmount or update
        return () => {
            abortController.abort();
        };
    }, [deckId]);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;

        // Create a card object with front and back properties from the form input values
        const card = {
            front: frontCard, 
            back: backCard,
        }

        // Makes an asynchronous call to create a new card in the specified deck using createCard function
        await createCard(deckId, card, signal);

        // Resets the frontCard and backCard state variables to empty strings after submission
        setFrontCard("");
        setBackCard("");
    }

    const breadcrumb = (
        <nav>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className='breadcrumb-item active'>
                    Add Card
                </li>
            </ol>
        </nav>
    );

    return (
        <>
            {breadcrumb}
            <h2> {deck.name}: Add Card</h2>
            <CardForm 
                deckId={deckId}
                frontCard={frontCard}
                backCard={backCard}
                handleFrontCardChange={handleFrontCardChange}
                handleBackCardChange={handleBackCardChange}
                handleSubmit={handleSubmit}
                isNewCard={true}
            />
        </>
        
    );
}

export default AddCard;