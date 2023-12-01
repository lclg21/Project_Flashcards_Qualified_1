import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from '../utils/api';

function StudyDeck() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const [insufficientCards, setInsufficientCards] = useState(false);
    const history = useHistory();
    const [count, setCount] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // useEffect hook to fetch and set the deck data based on deckId
    useEffect( () => {
        const abortController = new AbortController();
        const { signal } = abortController;

        // Initiates an API call to retrieve deck data based on deckId using the 'readDeck' function
        readDeck(deckId, signal).then((deck) => {
            // Updates the state with the fetched deck data
            setDeck(deck)

            // Check if the deck has an insufficient number of cards for studying
            if (deck.cards.length < 3) {
                // If the number of cards in the deck is less than 3, set 'insufficientCards' to true
                setInsufficientCards(true);
            }
        })
        
        // Cleanup function to abort the ongoing request upon component unmount or update
        return () => {
            abortController.abort();
        };
    }, [deckId, insufficientCards]);

    // Function to handle the "Next" card action
    const handleNextCard = (event) => {
        // Reset the card flip state to 'false' for the next card
        setIsFlipped(false);

        // Check if the current card is the last card in the deck
        if (deck.cards.length - 1 === count) {
            // Display a confirmation dialog to restart cards or return to the home page
            if (window.confirm('Restart cards? Click cancel to return to the home page.')) {
                // If confirmed, reset the card count to start over from the first card
                setCount(0)
                return
            } else {
                // If canceled, navigate the user back to the home page
                history.push("/");
            }
        }

        // Increment the card count for the next card
        setCount(count + 1);
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
                    Study
                </li>
            </ol>
        </nav>
      );

    if(insufficientCards) {
        return (
            <>
                {breadcrumb}
                <h1>{deck.name}: Study</h1>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cads to study. 
                   There {deck.cards.length === 1 ? 'is' : 'are'} {deck.cards.length} card{deck.cards.length === 1 ? '' : 's'} in this deck.</p>

                <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
            </>
        );
    } else {
        return (
            <>
                 {breadcrumb}
                <h1>{!isFlipped ? `Study: ${deck.name}` : `${deck.name}: Study`}</h1>
                <div style={{ border: '1px solid #000' }}>
                    <h4>Card {count + 1} of {deck.cards?.length}</h4>
                    <h5>
                    {!isFlipped
                        ? (deck.cards && deck.cards[count] ? deck.cards[count].front : "")
                        : (deck.cards && deck.cards[count] ? deck.cards[count].back : "")
                    }
                    </h5>
                    <button onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
                    {isFlipped && (
                        <button onClick={handleNextCard}>Next</button>
                    )}
                </div>
            </>
        );
    }
}

export default StudyDeck;