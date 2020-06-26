import React, { useState } from "react";
import Board from "./Board";
import Intro from "./Intro";

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className='homeContainer'>
      {!showIntro ? (
        <Board
          end={() => {
            setShowIntro(true);
          }}
        />
      ) : (
        <Intro
          start={() => {
            setShowIntro(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
