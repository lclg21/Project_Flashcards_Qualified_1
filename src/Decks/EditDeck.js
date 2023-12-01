import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from '../utils/api';

function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [editedDeck, setEditedDeck] = useState({name: '', description: ''});

    // useEffect hook to fetch and set the deck data based on deckId
    useEffect( () => {
        const abortController = new AbortController();
        const { signal } = abortController;

        // Initiates an API call to retrieve deck data based on deckId using the 'readDeck' function
        readDeck(deckId, signal).then((deck) => {
            // Updates the state with the fetched deck data
            setEditedDeck(deck)
        })
        
        // Cleanup function to abort the ongoing request upon component unmount or update
        return () => {
            abortController.abort();
        };
    }, [deckId]);

    // Function to manage changes occurring in a form or input field. 
    // It utilizes the setEditedDeck function to update the editedDeck state.
    const changeHandler = ({ target }) => {
        setEditedDeck((currentDeck) => ({
          ...currentDeck,
          [target.name]: target.value,
        }));
      };

      // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;

        // Calls the 'updateDeck' function asynchronously to update the deck data
        const response = await updateDeck(editedDeck, signal);

        // Redirects the user to the updated deck's page upon successful submission
        history.push(`/decks/${response.id}`);
    }; 

    const breadcrumb = (
        <nav >
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}>
                        {editedDeck.name ? editedDeck.name : ''}
                    </Link>
                </li>
                <li className='breadcrumb-item active'>
                    Edit Deck
                </li>
            </ol>
      </nav>
    );

    return (
        <>
            {breadcrumb}
            <h1>Edit Deck</h1>

            <form onSubmit={handleSubmit}>
                <div className="deck-form">
                    <h5>Name</h5>
                    <input type="text" id="name" name="name"  placeholder="Deck Name" onChange={changeHandler} value={editedDeck.name} />

                    <h5>Description</h5>
                    <textarea id="description" name="description"  placeholder="Brief description of the deck" onChange={changeHandler}   value={editedDeck.description} />
                </div>

                {/* If the user clicks Cancel, the user is taken to the Home screen.*/}
                <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default EditDeck;