import React from "react";

const GameInfo = (props) => {
  return (
    <div className='gameInfoContainer'>
      <div className='infoDiv'>
        <div>
          <img alt='hearts' src='dungeonimg/heart.png' />
          <p> {props.hearts} </p>
        </div>
        <div>
          <img alt='keys' src='dungeonimg/key.png' />
          <p> {props.keys} </p>
        </div>
        <div>
          <img alt='arrows' src='dungeonimg/arrow.png' />
          <p> {props.ammo} </p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
