import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck } from '../utils/api';
import ViewCard from '../Cards/ViewCard';

function Deck() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const history = useHistory();

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

    // Asynchronous function to handle the deletion of a deck
    const deleteDeckHandler = async (deckId) => {
        // Displays a confirmation dialog using window.confirm before deleting the deck
        if (window.confirm(
            'Delete this deck? You will not be able to recover it.'
          )) {
            await deleteDeck(deckId);

            // Navigates the user back to the homepage after successful deletion
            history.push('/');
          }
    };   
    
    const breadcrumb = (
        <nav>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item active'>
                    {deck.name}
                </li>
            </ol>
        </nav>
    );

    return (
        <>
            {breadcrumb}
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            
            <button onClick={() => history.push(`/decks/${deckId}/edit`)}>Edit</button>
            <button onClick={() => history.push(`/decks/${deckId}/study`)}>Study</button>
            <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
           
            <button  onClick={() => deleteDeckHandler(deckId)}>Delete</button>

            <h2>Cards</h2>

            {/*Conditionally maps through the cards in the deck if the 'deck.cards' array exists*/}
            {(deck.cards) ? deck.cards.map((card, index) => (
                <ViewCard 
                    key={index} 
                    card={card}
                    deckId={deckId}
                />
            )) : null}
        </>
    );
}

export default Deck;