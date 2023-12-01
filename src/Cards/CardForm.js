import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({deckId, handleFrontCardChange, handleBackCardChange, frontCard, backCard, handleSubmit, isNewCard}) {
    const history = useHistory();
    return (
        <form onSubmit={handleSubmit}>
            <div className="card-form">
                <h5>Front</h5>
                <textarea id="frontCard" name="frontCard"  placeholder="Front side of card" onChange={handleFrontCardChange} value={frontCard} />

                <h5>Back</h5>
                <textarea id="backCard" name="backCard"  placeholder="Back side of card" onChange={handleBackCardChange} value={backCard} />
            </div>

            {isNewCard ? (
                // For a new card, display "Done" and "Save" buttons
                <>
                    <button type='button' onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                    <button type="submit">Save</button>
                </>
            ) : (
                // For an existing card, display "Cancel" and "Submit" buttons
                <>
                    <button type='button' onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                    <button type="submit">Submit</button>
                </>
            )}
        </form>
    );
}

export default CardForm;