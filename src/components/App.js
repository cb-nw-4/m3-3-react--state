import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import words from "../data/words.json";
import GameOverModal from "./GameOverModal";

import { colors, contentWidth } from "./GlobalStyles";

const App = () => {
  const initialGameState = { started: false, over: false, win: false };
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [gameStart, toggle] = useState(true);
  const [start, setStart] = useState(true);
  if (start === true) {
    setStart("Start");
  }
  const getNewWord = () => {
    let newWord = words[Math.floor(Math.random() * words.length)];
    setWord({
      str: newWord,
      revealed: newWord.split("").map(() => ""),
    });

  };

  const handleStart = () => {
    if (start !== true) {
      setStart("Pause");
    }
    if (word.str === "") {
      setGame({ ...game, started: !game.started });
      getNewWord();
    }
    toggle(!gameStart);
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button id="mainButton" onClickFunc={handleStart} gameStart={gameStart}>
          {start}
        </Button>
        <Button>Restart</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman />
            <RightColumn>
              <DeadLetters />
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
