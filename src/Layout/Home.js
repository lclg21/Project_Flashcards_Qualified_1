import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckListItem from '../Decks/DeckListItem';

function Home() {
    const history = useHistory();
    const [decks, setDecks] = useState([])

    // useEffect hook to fetch and set the list of decks
    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        // Initiates an API call to retrieve the list of decks using the 'listDecks' function
        listDecks(signal).then((decks) => {
            // Updates the state with the fetched list of decks
            setDecks(decks)
        })
    
        // Cleanup function to abort the ongoing request upon component unmount or update
        return () => {
          abortController.abort();
        };
    }, []);

    // Mapping through the 'decks' array to create DeckListItem components
    const deck = decks.map((deck, index) => (
        <DeckListItem key={index} deck={deck} />
    ));

    return (
        <>
        <button onClick={() => history.push(`/decks/new`)}>Create Deck</button>
        {deck}
        </>
    );
}

export default Home;