import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";


function DeckListItem({deck}) {
    const history = useHistory();

    // Asynchronous function to handle the deletion of a deck
    const deleteDeckHandler = async (deckId) => {
        // Displays a confirmation dialog using window.confirm before deleting the deck
        if (window.confirm(
            'Delete this deck? You will not be able to recover it.'
          )) {
            await deleteDeck(deckId);

            // Refreshes the page to update the UI after card deletion
            history.go(0);
          }
    };    

    return (
        <>
            <div style={{border: '1px solid #ccc'}}>
                <h2>{deck.name}</h2>
                <p>{deck.cards.length} cards</p>
                <h4>{deck.description}</h4>

                <button onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                <button onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                <button onClick={() => deleteDeckHandler(deck.id)}>Delete</button>
            </div>
        </>
    );
}

export default DeckListItem;