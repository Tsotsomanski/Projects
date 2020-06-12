import React, {useState, useEffect, Fragment} from 'react';
import "./table.scss";
import CardComponent from '../card/card.component';
import Cardholder from '../cardholder/cardholder.component';
import {DEALER_CARDS_COUNT, DECK_CARDS_COUNT, PLAYER_CARDS_COUNT, SUITS} from '../app.constants';

const Table =(props) => {
    const [deckOfCards, setDeckOfCards] = useState([]);
    const [isDeckShuffled, setIsDeckShuffled] = useState(false);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerCards, setPlalyerCards] = useState(false);
    const [dealerHasCards, setDealerHasCards] = useState(false);
    const [playerHasCards, setPlayerHasCards] = useState(false);
    const [numberOfCardsIntheDeck, setNumberOfCardsIntheDeck] = useState(DECK_CARDS_COUNT);

    // Function creating the deck of cards and returning an Array with the Cards HTML Elements
    const createDeck = () => {
        let deck = [];
        const suits = [SUITS.SPADES, SUITS.DIAMONDS, SUITS.CLUBS, SUITS.HEARTS];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let counter = 0;
        for (let suit = 0; suit < suits.length; suit++) {
            for (let value = 0; value < values.length; value++) {
                deck.push({
                    suit: suits[suit],
                    value: values[value],
                    id: counter
                });
                counter++;
            }
        }
        return deck
    };

    // Creates the deck of cards once the component initialize
    useEffect(() => {
        setDeckOfCards(createDeck);
    }, []);

    // Shuffles the deck of cards once the game starts and the deck is created
    useEffect(() => {
        const shuffleTheDeck = () => {
            setDeckOfCards(deckOfCards.sort(() => 0.5 - Math.random()));
        };
        if (Object.keys(deckOfCards).length && !isDeckShuffled) {
            setIsDeckShuffled(true);
            shuffleTheDeck();
        }}, [deckOfCards, isDeckShuffled]);

    useEffect(() => {
        const takeNCardsFromDeck = (n) => {
            const updatedCardCount = numberOfCardsIntheDeck - n;
            setNumberOfCardsIntheDeck(updatedCardCount);
            return deckOfCards.splice(deckOfCards.length - n, n)
        };
        // Distributes cards to the player and to the dealer
        const dealCards = () => {
            if (!dealerHasCards) {
                // Adding 3 cards into the dealers hand and removing them from the deck;
                setDealerCards(takeNCardsFromDeck(DEALER_CARDS_COUNT));
                setDealerHasCards(true);
            }

            if (!playerHasCards) {
                // Adding 2 cards into the players hand and removing them from the deck;
                setPlalyerCards(takeNCardsFromDeck(PLAYER_CARDS_COUNT));
                setPlayerHasCards(true);
            }
        };

        if (props.isGameStarted) {
            dealCards();
            setNumberOfCardsIntheDeck(deckOfCards.length);
        }
    }, [props.isGameStarted, dealerCards, deckOfCards, dealerHasCards, playerHasCards, numberOfCardsIntheDeck]);

    // Function which handles the click on player's cards
    const handleHit = () => {
        if (numberOfCardsIntheDeck >= PLAYER_CARDS_COUNT) {
            setPlayerHasCards(false);
        }
    };

    // Check which card from the players cards is clicked and replaces it with new one from the deck
    const handleCardClick = (event) => {
        if (numberOfCardsIntheDeck >= 1) {
            const cardId = Number(event.currentTarget.id);
            const cardLeftInDeck = playerCards.find(card => card.id !== cardId);
            const newCardFromDeck = deckOfCards.splice(deckOfCards.length - 1, 1);
            const newPlayerCards = [
                cardLeftInDeck,
                ...newCardFromDeck,
            ];
            setNumberOfCardsIntheDeck(numberOfCardsIntheDeck-1);
            setPlalyerCards(newPlayerCards);
        }
    };

    return (
        <div className="blackjack-table">
            <section className="dealer">
                <div className="dealers-cards">
                    {dealerCards.length ?
                        dealerCards.map((card, index) => {
                            return (
                                <Cardholder key={index}>
                                     <CardComponent id={card.id} value={card.value} suit={card.suit}/>
                                </Cardholder>)
                            }) : <Fragment> <Cardholder/> <Cardholder/> <Cardholder/> </Fragment>
                    }
                </div>
                <div className="deck-container">
                    <div className="deck-of-cards">
                        { deckOfCards.map((card, index) => {
                            return <CardComponent key={index} id={index} value={card.value} suit={card.suit}/>
                        })}
                    </div>
                </div>
            </section>
            <section className="player">
                <div className="players-cards">
                    {playerCards.length ?
                        playerCards.map((card, index) => {
                            return (
                                <Cardholder key={index}>
                                    <CardComponent id={card.id} value={card.value} suit={card.suit} handleCardClick={handleCardClick}/>
                                </Cardholder>)
                        }) : <Fragment> <Cardholder/> <Cardholder/> </Fragment>
                    }
                </div>
                <div className="hit-btn" onClick={handleHit}>Hit</div>
            </section>
    </div>)
};

export default Table;
