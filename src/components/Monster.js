import React, { useEffect, Fragment } from "react";

const Monster = (props) => {
  const {
    monsterDirection,
    monsterPos,
    monsterStatus,
    monsterFrame,
    chasing,
    playerPos,
    board,
    moveMonster,
    setMonsterTimer,
    timer,
    stopMonster,
    hitPlayer,
    weaponPos,
    setWeaponPos,
    setWeaponDirection,
    alterBoard,
    room,
    monsterRoom,
    monsterHit,
  } = props;

  useEffect(
    //handle a monsterMove
    () => {
      if (monsterPos[0] === weaponPos[0] && monsterPos[1] === weaponPos[1]) {
        //If the monster moves at the same time he is shot
        setWeaponPos([-1, -1]);
        setWeaponDirection(-1);
        let newMonster = board[monsterPos[0]][monsterPos[1]];
        if (newMonster.monsterHealth <= 1) {
          newMonster = {};
        } else {
          newMonster.monsterHealth -= 1;
        }
        alterBoard(monsterPos[0], monsterPos[1], newMonster);
      } else if (chasing && !timer && room === monsterRoom) {
        setMonsterTimer(monsterPos[0], monsterPos[1]);
        setTimeout(() => {
          handleMonsterMove();
        }, 200);
      }
    },
    [monsterPos, chasing]
  );

  useEffect(
    //Check if monster should still be chasing
    () => {
      if (chasing) {
        const distX = Math.max(
          playerPos[0] - monsterPos[0],
          (playerPos[0] - monsterPos[0]) * -1
        );
        const distY = Math.max(
          playerPos[1] - monsterPos[1],
          (playerPos[1] - monsterPos[1]) * -1
        );
        if ((distX > 15 || distY > 15) && !monsterHit) {
          stopMonster(monsterPos[0], monsterPos[1]);
        } else if (monsterHit && distX <= 15 && distY <= 15) {
          let newMonster = board[monsterPos[0]][monsterPos[1]];
          if (Object.keys(newMonster).length !== 0) {
            //Check if the monster is still in this position on the board
            newMonster.monsterHit = false;
            alterBoard(monsterPos[0], monsterPos[1], newMonster);
          }
        }
      }
    },
    [playerPos, monsterPos]
  );

  const handleMonsterMove = () => {
    //go the long way first
    const vertDist = Math.max(
      (monsterPos[0] - playerPos[0]) * -1,
      monsterPos[0] - playerPos[0]
    );
    const horDist = Math.max(
      (monsterPos[1] - playerPos[1]) * -1,
      monsterPos[1] - playerPos[1]
    );
    let movement;
    let newPos;
    let newProps = {};
    if (vertDist !== 0 || horDist !== 0) {
      if (vertDist >= horDist) {
        // want + or - 1
        movement = (monsterPos[0] - playerPos[0]) / vertDist;
        newPos = [monsterPos[0] - movement, monsterPos[1]];
        newProps.monsterFrame = movement > 0 ? 0 : 1;
        newProps.monsterStatus = ["vertidle", 1];
      } else {
        movement = (monsterPos[1] - playerPos[1]) / horDist;
        newPos = [monsterPos[0], monsterPos[1] - movement];
        newProps.monsterDirection = movement > 0 ? 180 : 0;
        //handle animations for a vertical move
        if (monsterFrame >= 3) {
          newProps.monsterFrame = 0;
        } else {
          newProps.monsterFrame = monsterFrame + 1;
        }
        newProps.monsterStatus = ["run", 3];
      }
      moveMonster(
        [monsterPos[0], monsterPos[1]],
        newPos,
        newProps,
        board[monsterPos[0]][monsterPos[1]]
      );
    } else {
      //if monster is gonna bump into player count it as a hit
      hitPlayer([monsterPos[0], monsterPos[1]]);
    }
  };

  return (
    <Fragment>
      <img
        alt='monster'
        src={"monsterimg/" + monsterStatus[0] + "/" + monsterFrame + ".png"}
        className='monster'
        style={{
          top: monsterPos[0] * 20 - 12 + "px",
          left: monsterPos[1] * 20 + "px",
          transform:
            monsterDirection % 180 === 0 ? "rotateY(" + monsterDirection + "deg)" : "",
        }}
      />
    </Fragment>
  );
};

export default Monster;
