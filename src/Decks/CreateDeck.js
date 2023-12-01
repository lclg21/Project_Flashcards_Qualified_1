import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { createDeck } from '../utils/api';

function CreateDeck() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const { signal } = abortController;
        // creates a deck object with the form data
        const deck = {
            name: name,
            description: description,
        }

        const response = await createDeck(deck, signal);

        // clean up Name and Description state 
        setName("");
        setDescription("");

        // the user is taken to the Deck screen
        history.push(`/decks/${response.id}`);
    }

    const breadcrumb = (
        <nav>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item active'>
                    Create Deck
                </li>
            </ol>
        </nav>
    );

    return (
        <>
            {breadcrumb}
            <h1>Create Deck</h1>

            <form onSubmit={handleSubmit}>
                <div className="deck-form">
                    <h5>Name</h5>
                    <input type="text" id="name" name="name"  placeholder="Deck Name" onChange={handleNameChange} value={name} />

                    <h5>Description</h5>
                    <textarea id="description" name="description"  placeholder="Brief description of the deck"  onChange={handleDescriptionChange} value={description} />
                </div>

                {/* If the user clicks Cancel, the user is taken to the Home screen.*/}
                <button onClick={() => history.push(`/`)}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default CreateDeck;