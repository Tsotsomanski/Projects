import React from 'react';
import './card.scss';
import {SUITS} from '../app.constants';

const CardComponent = (props) => {
    let icon;
    const cardName = props.value;
    switch (props.suit) {
        case SUITS.SPADES: {
            icon = SUITS.SPADES;
            break;
        }
        case SUITS.DIAMONDS: {
            icon = SUITS.DIAMONDS;
            break;
        }
        case SUITS.CLUBS: {
            icon = SUITS.CLUBS;
            break;
        }
        case SUITS.HEARTS: {
            icon = SUITS.HEARTS;
            break;
        }
        default: return ''
    }

    return (
        <div id={props.id} className="card" onClick={props.handleCardClick ? props.handleCardClick : ()=>{}}>
            <p className="name">{cardName}</p>
            <p className={icon}> </p>
        </div>
    );
};

export default CardComponent;
