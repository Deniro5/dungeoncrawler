import React, { useState, useEffect, Fragment } from "react";
import GameInfo from "./GameInfo";

const Player = (props) => {
  const [playerStatus, setPlayerStatus] = useState(["vertidle", 0]);
  const [playerFrame, setPlayerFrame] = useState(0);
  const [direction, setDirection] = useState(90);
  const {
    board,
    playerPos,
    setPlayerPos,
    hearts,
    setHearts,
    alterBoard,
    hit,
    setHit,
    weaponPos,
    setWeaponPos,
    weaponDirection,
    setWeaponDirection,
    setRoom,
    resetGame,
    keys,
    setKeys,
    ammo,
    setAmmo,
  } = props;

  useEffect(
    () => {
      //cooldown period after getting hit
      if (hit === true) {
        setTimeout(() => {
          setHit(false);
        }, 1000);
      }
    },
    [hit]
  );

  window.onkeydown = (e) => {
    if (e.keyCode === 32 && board[playerPos[0]][playerPos[1]].name !== "monster") {
      //space (attack)
      handleAttack();
    } else if (e.keyCode >= 37 && e.keyCode <= 40) {
      let hormove = false;
      let vermove = false;
      let newPos;
      if (e.keyCode === 37) {
        newPos = [playerPos[0], playerPos[1] - 1];
        setDirection(180);
        hormove = true;
      } else if (e.keyCode === 38) {
        newPos = [playerPos[0] - 1, playerPos[1]];
        setDirection(270);
        vermove = true;
      } else if (e.keyCode === 39) {
        newPos = [playerPos[0], playerPos[1] + 1];
        setDirection(0);
        hormove = true;
      } else if (e.keyCode === 40) {
        newPos = [playerPos[0] + 1, playerPos[1]];
        setDirection(90);
        vermove = true;
      }
      if (newPos[0] >= 0 && newPos[0] <= 24 && newPos[1] >= 0 && newPos[1] <= 49) {
        //nested if avoids checking a part of the board that doesnt exists
        if (Object.keys(board[newPos[0]][newPos[1]]).length !== 0) {
          //Going to collide with something
          if (board[newPos[0]][newPos[1]].name === "ladder") {
            setPlayerPos(board[newPos[0]][newPos[1]].start);
            setRoom(board[newPos[0]][newPos[1]].room);
          }
        } else {
          setPlayerPos(newPos);
          checkNearbyMonster([...newPos]);
        }
      }
      if (hormove) {
        //handle animation if there is any
        if (playerFrame >= 3) {
          setPlayerFrame(0);
        } else {
          setPlayerFrame(playerFrame + 1);
        }
        setPlayerStatus(["run", 3]);
      } else if (vermove) {
        setPlayerFrame(e.keyCode === 38 ? 0 : 1);
        setPlayerStatus(["vertidle", 1]);
      }
    }
  };

  const handleAttack = () => {
    let facingX = playerPos[1];
    let facingY = playerPos[0];
    if (direction === 0) {
      facingX += 1;
    } else if (direction === 90) {
      facingY += 1;
    } else if (direction === 180) {
      facingX -= 1;
    } else if (direction === 270) {
      facingY -= 1;
    }
    if (facingX >= 0 && facingY >= 0 && board[facingY][facingX].name === "chestclosed") {
      //check if theres a chest in front of us
      let newItem = board[facingY][facingX].item;
      alert("You found " + (newItem === "ammo" ? "some arrows" : "a " + newItem));
      alterBoard(facingY, facingX, { name: "chestopen" });
      if (newItem === "heart") {
        setHearts(hearts + 1);
      } else if (newItem === "key") {
        setKeys(keys + 1);
      } else if (newItem === "ammo") {
        setAmmo(ammo + 10);
      }
    } else if (facingX >= 0 && facingY >= 0 && board[facingY][facingX].name === "door") {
      //check if theres a door in front of us
      if (keys === 3) {
        alert("Congrats. You Escaped!");
        resetGame();
      } else {
        alert("You need to collect all three keys to leave");
      }
    } else if (weaponPos[0] === -1 && ammo > 0) {
      //check that the weapon is not already out there and that we have ammo
      setWeaponDirection(direction);
      setAmmo(ammo - 1);
    }
  };

  const checkNearbyMonster = (pos) => {
    let i = Math.max(-6, pos[0] * -1);
    while (i < 7) {
      let j = Math.max(-6, pos[1] * -1);
      while (j < 7) {
        if (board[pos[0] + i][pos[1] + j].name === "monster") {
          //This monster is in the detection zone (within 6 spaces) and should start chasing
          let newMonster = board[pos[0] + i][pos[1] + j];
          newMonster.chasing = true;
          alterBoard(pos[0] + i, pos[1] + j, newMonster);
        }
        j++;
      }
      i++;
    }
  };

  useEffect(
    () => {
      if (weaponDirection !== -1) {
        setWeaponPos([playerPos[0], playerPos[1]]);
      }
    },
    [weaponDirection]
  );

  useEffect(
    () => {
      if (weaponPos[1] !== -1) {
        setTimeout(moveWeapon, 40);
      }
    },
    [weaponPos]
  );

  const moveWeapon = () => {
    if (weaponDirection === -1) {
      setWeaponPos([-1, -1]);
      return;
    }
    let newY = weaponPos[0];
    let newX = weaponPos[1];
    if (weaponDirection % 180 === 0) {
      //shooting from right to left
      newX += weaponDirection === 0 ? 1 : -1;
    } else {
      newY += weaponDirection === 90 ? 1 : -1;
    }
    if (newX >= 0 && newX <= 49 && (newY >= 0 && newY <= 24)) {
      if (Object.keys(board[newY][newX]).length === 0) {
        setWeaponPos([newY, newX]);
      } else {
        setWeaponPos([-1, -1]);
        setWeaponDirection(-1);
        if (board[newY][newX].name === "monster") {
          if (board[newY][newX].monsterHealth <= 1) {
            alterBoard(newY, newX, {});
          } else {
            let newMonster = board[newY][newX];
            newMonster.monsterHealth -= 1;
            newMonster.chasing = true;
            newMonster.monsterHit = true;
            alterBoard(newY, newX, newMonster);
          }
        }
      }
    } else {
      setWeaponPos([-1, -1]);
      setWeaponDirection(-1);
    }
  };

  return (
    <Fragment>
      {weaponPos[0] > -1 && (
        <img
          alt='arrow'
          src='img/arrow2.png'
          style={{
            top: weaponPos[0] * 20 + "px",
            left: weaponPos[1] * 20 + "px",
            transform:
              weaponDirection % 180 === 0
                ? "rotateY(" + weaponDirection + "deg)"
                : "rotateZ(" + weaponDirection + "deg)",
          }}
          id='weapon'
        />
      )}
      <img
        alt='player'
        src={"img/" + playerStatus[0] + "/" + playerFrame + ".png"}
        id='player'
        style={{
          opacity: hit ? 0.3 : 1,
          top: playerPos[0] * 20 - 20 + "px",
          left: playerPos[1] * 20 + "px",
          transform: direction % 180 === 0 ? "rotateY(" + direction + "deg)" : "",
        }}
      />
      <GameInfo hearts={hearts} keys={keys} ammo={ammo} />
    </Fragment>
  );
};

export default Player;
