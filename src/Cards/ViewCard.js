import React from "react";
import { deleteCard } from "../utils/api";
import { useHistory } from "react-router-dom";

function ViewCard({card, deckId}) {
    const history = useHistory();

    // Asynchronous function to handle the deletion of a card
    const deleteCardHandler = async (cardId) => {
        // Displays a confirmation dialog using window.confirm before deleting the card
        if (window.confirm(
            'Delete this deck? You will not be able to recover it.'
          )) {
            // Calls the deleteCard API function to delete the specified card
            await deleteCard(cardId);

            // Refreshes the page to update the UI after card deletion
            history.go(0);
          }
    }

    return (
        <table border="1">
            <tbody>
                <tr>
                    <td>{card.front}</td>
                    <td>
                        {card.back}
                        <button onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>Edit</button>
                        <button onClick={() => deleteCardHandler(card.id)}>Delete</button>
                    </td>
                </tr> 
            </tbody>
        </table>
    );
}

export default ViewCard;