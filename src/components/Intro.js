import React from "react";

const Intro = (props) => {
  return (
    <div className='introContainer'>
      <div className='introTextContainer'>
        <h2 style={{ marginTop: "5px" }}> Dungeon Crawler </h2>
        <p style={{ fontWeight: "bold", textAlign: "center" }}> How to Play: </p>
        <p style={{ fontSize: "14px", lineHeight: "20px" }}>
          - Find the three keys hidden throughout the dungeon to escape!
        </p>
        <p style={{ fontSize: "14px", lineHeight: "20px" }}>
          - Move the knight with the arrow keys.
        </p>
        <p style={{ fontSize: "14px", lineHeight: "20px" }}>
          - Shoot arrows/open chests with the space bar.
        </p>
        <button onClick={props.start}> Start Game</button>
      </div>
    </div>
  );
};

export default Intro;
