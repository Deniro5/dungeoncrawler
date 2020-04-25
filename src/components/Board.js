import React, { useState, useEffect, Fragment } from "react";
import Rooms from "./Rooms";
import Player from "./Player";
import Monster from "./Monster";

const Board = () => {
  const [board, setBoard] = useState([]);
  const [playerPos, setPlayerPos] = useState([24, 24]);
  const [hearts, setHearts] = useState(3);
  const [weaponPos, setWeaponPos] = useState([-1, -1]);
  const [weaponDirection, setWeaponDirection] = useState(-1);
  const [hit, setHit] = useState(false);
  const [room, setRoom] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState(0);
  const [ammo, setAmmo] = useState(0);

  useEffect(
    () => {
      //have to set this timeout to let monsters finish moving(dont need/want to do it on the first run)
      if (started) {
        setLoading(true);
        setTimeout(() => {
          setBoard(Rooms[room]);
          setLoading(false);
        }, 200);
      } else {
        setBoard(Rooms[room]);
        setStarted(true);
      }
    },
    [room]
  );

  const alterBoard = (x, y, newitem) => {
    let newBoard = [...board];
    newBoard[x][y] = newitem;
    setBoard(newBoard);
  };

  const setMonsterTimer = (x, y) => {
    let newBoard = [...board];
    newBoard[x][y].timer = true;
    setBoard(newBoard);
  };

  const stopMonster = (x, y) => {
    let newBoard = [...board];
    newBoard[x][y].timer = false;
    newBoard[x][y].chasing = false;
    setBoard(newBoard);
  };

  const moveMonster = (oldPos, newPos, newProps, monster) => {
    if (Object.keys(board[newPos[0]][newPos[1]]).length === 0) {
      let newBoard = [...board];
      newBoard[oldPos[0]][oldPos[1]] = {};
      if (Object.keys(monster).length > 0) {
        //If the monster did not die while making a move
        newBoard[newPos[0]][newPos[1]] = monster;
        newBoard[newPos[0]][newPos[1]].timer = false;
        newBoard[newPos[0]][newPos[1]].monsterDirection = newProps.monsterDirection;
        newBoard[newPos[0]][newPos[1]].monsterFrame = newProps.monsterFrame;
        newBoard[newPos[0]][newPos[1]].monsterStatus = newProps.monsterStatus;
      } else {
        newBoard[newPos[0]][newPos[1]] = {};
      }
      setBoard(newBoard);
    } else {
      //If the monster is running into an object
      let newBoard = [...board];
      newBoard[oldPos[0]][oldPos[1]].timer = false;
      newBoard[oldPos[0]][oldPos[1]].monsterFrame = 0;
      setBoard(newBoard);
    }
  };

  const hitPlayer = (pos) => {
    if (!hit) {
      if (hearts - 1 === 0) {
        alert("Game over!");
        resetGame();
      } else {
        setHearts(hearts - 1);
        setHit(true);
      }
    }
    let newBoard = [...board];
    newBoard[pos[0]][pos[1]].timer = false;
    setBoard(newBoard);
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className='boardContainer' style={{ background: loading ? "black" : "" }}>
      {!loading && (
        <Fragment>
          {board.map((row, indexY) =>
            row.map(
              (tile, indexX) =>
                Object.keys(tile).length > 0 &&
                (tile.name === "monster" ? (
                  <Monster
                    {...tile}
                    monsterPos={[indexY, indexX]}
                    playerPos={playerPos}
                    board={board}
                    moveMonster={moveMonster.bind(this)}
                    setMonsterTimer={setMonsterTimer.bind(this)}
                    stopMonster={stopMonster.bind(this)}
                    hitPlayer={hitPlayer.bind(this)}
                    weaponPos={weaponPos}
                    setWeaponPos={setWeaponPos.bind(this)}
                    weaponDirection={weaponDirection}
                    setWeaponDirection={setWeaponDirection.bind(this)}
                    alterBoard={alterBoard.bind(this)}
                    room={room}
                  />
                ) : (
                  <img
                    alt={tile.name}
                    className='tile'
                    src={"dungeonimg/" + tile.name + ".png"}
                    style={{ top: indexY * 20 + "px", left: indexX * 20 + "px" }}
                  />
                ))
            )
          )}
          <Player
            playerPos={playerPos}
            setPlayerPos={setPlayerPos.bind(this)}
            hearts={hearts}
            setHearts={setHearts}
            board={board}
            alterBoard={alterBoard.bind(this)}
            hit={hit}
            setHit={setHit.bind(this)}
            weaponPos={weaponPos}
            setWeaponPos={setWeaponPos.bind(this)}
            weaponDirection={weaponDirection}
            setWeaponDirection={setWeaponDirection.bind(this)}
            setRoom={setRoom.bind(this)}
            ammo={ammo}
            setAmmo={setAmmo.bind(this)}
            keys={keys}
            setKeys={setKeys.bind(this)}
            resetGame={() => {
              resetGame();
            }}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Board;
