import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home"
import NotFound from "./NotFound";
import CreateDeck from "../Decks/CreateDeck";
import Deck from "../Decks/Deck";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";
import StudyDeck from "../Decks/StudyDeck";

function Layout() {
  return (
    <>
      <div className="container">
        <Header />
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
