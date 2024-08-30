import React from 'react';
import classnames from "classnames";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled}) => {
    const handleClick =() => {
        !isFlipped && !isDisabled && onClick(index)
    };

    return (
        <div
            className={classnames("card", {
                "is-flipped": isFlipped,
                "is-inactive": isInactive
            })}
            onClick={handleClick}
        >
            <div className="card-face card-font-face">
                <img src={'https://s2.best-wallpaper.net/wallpaper/iphone/1804/Arctic-iceberg-ice-water-art-drawing_iphone_320x480.jpg'} alt="img" />
            </div>
            <div className="card-face card-back-face">
                <img src={card.image} alt="img" />
                <span>{card.type}</span>
            </div>
        </div>
    );
}

export default Card;