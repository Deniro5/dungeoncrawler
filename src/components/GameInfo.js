import React from "react";

const GameInfo = (props) => {
  const { hearts, keys, ammo } = props;

  return (
    <div className='gameInfoContainer'>
      <div className='infoDiv'>
        <div>
          <img alt='hearts' src='dungeonimg/heart.png' />
          <p> {hearts} </p>
        </div>
        <div>
          <img alt='keys' src='dungeonimg/key.png' />
          <p> {keys} </p>
        </div>
        <div>
          <img alt='arrows' src='dungeonimg/arrow.png' />
          <p> {ammo} </p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
