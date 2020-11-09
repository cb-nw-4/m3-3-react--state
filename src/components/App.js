import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";

import { colors, contentWidth } from "./GlobalStyles";
import words from "../data/words.json";

const App = () => {
  const initialGameState = { started: false, over: false, win: false };
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [startLabel, setStartLabel] = useState("Start");
  const [wrongGuesses, setWrongGuesses] = useState([]);

  const handleStart = () => {
    setGame( { ...game, started: !game.started } );
    StartButtonLabel();
    if (word.str === "")
      getNewWord();
  };

  const getNewWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const newArr = Array(newWord.length).fill('');
    setWord( { ...word, str: newWord, revealed: newArr} ); 
  };

  //might no be a state here for the label^
  const StartButtonLabel = () => {  
    if (game.over)  {
      setStartLabel("Start");
      return;
    }

    if (!game.started)
      setStartLabel("Pause");
    else 
      setStartLabel("Continue");
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{startLabel}</Button>
        <Button>btn 2</Button>
      </Nav>
      {game.started && (
      <>
        <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters wrongGuesses={wrongGuesses}/>
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
