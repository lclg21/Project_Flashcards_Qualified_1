import React, { useState, useEffect } from "react";
import CardForm from "./CardForm";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from '../utils/api';

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [editedFrontCard, setEditedFrontCard] = useState("");
    const [editedBackCard, setEditedBackCard] = useState("");

    // useEffect hook to fetch and set the deck data based on deckId
    useEffect( () => {
        const abortController = new AbortController();
        const { signal } = abortController;

        // Initiates an API call to retrieve deck data based on deckId using the 'readDeck' function
        readDeck(deckId, signal).then((deck) => {
            // Updates the state with the fetched deck data
            setDeck(deck)
        })

        // Initiates an API call to retrieve card data based on cardId using the 'readCard' function
        readCard(cardId, signal).then((card) => {
            // Updates the state with the fetched card data
            setCard(card);
            setEditedFrontCard(card.front);
            setEditedBackCard(card.back);
        })
        
        // Cleanup function to abort the ongoing request upon component unmount or update
        return () => {
            abortController.abort();
        };
    }, [deckId, cardId]);

    const handleFrontCardChange = (event) => {
        setEditedFrontCard(event.target.value);
      }
    
    const handleBackCardChange = (event) => { 
        setEditedBackCard(event.target.value);
    }

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;

        // Calls the 'updatecard' function asynchronously to update the card data
        await updateCard({ ...card, front: editedFrontCard, back: editedBackCard }, signal);

        // Redirects the user to the updated deck's page upon successful submission
        history.push(`/decks/${deck.id}`);
    }; 

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
                    Edit Card {cardId}
                </li>
            </ol>
        </nav>
    );

    return (
        <>
            {breadcrumb}
            <h2>Edit Card</h2>
            <CardForm
                deckId={deckId} 
                frontCard={editedFrontCard}
                backCard={editedBackCard}
                handleFrontCardChange={handleFrontCardChange}
                handleBackCardChange={handleBackCardChange}
                handleSubmit={handleSubmit}
                isNewCard={false}
            />
        </>
        
    );
}

export default EditCard;