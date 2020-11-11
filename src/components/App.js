import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import words from "../data/words.json";
import bodyParts from "../data/body-parts.json"

import { colors, contentWidth } from "./GlobalStyles";

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

const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({str: ''});
  const [button, setButton] = useState('Start');
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [bodyPartsList, setBodyPartsList] = useState(bodyParts);
  
  const handleStart = () => {
    setGame({...game, started: !game.started});
    if (word.str === '') {
      getNewWord();
    }
    changeBtnText();
  } 

  const getNewWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const numOfLetters = newWord.length;
    let newArr = [];
    for (let i = 1; i <= numOfLetters; i++) {
      newArr.push('');
    }
    setWord({...word, str: newWord, revealed: newArr});
  }

  const changeBtnText = () => {
    if (!game.started) {
      setButton('Pause');
    }
    else if (game.started) {
      setButton('Continue');
    }
  }
  
  const handleGuess = (ltr) => {
    setUsedLetters(usedLetters.concat([ltr]));
    
    let wordArr = word.str.split('');
    for (let i = 0; i < wordArr.length; i++) {
      if (wordArr[i] === ltr) {
        word.revealed[i] = ltr;
        if (word.revealed.indexOf('') === -1) {
        handleEndGame(true);
      }}
    }
    
    if (word.str.split('').indexOf(ltr) === -1) {
      const bodyPartsArr = [...bodyPartsList];
      bodyPartsArr.shift()
      setBodyPartsList(bodyPartsArr);
      setWrongGuesses(wrongGuesses.concat([ltr]));
      if (wrongGuesses.length >= 9) {
        handleEndGame(false);
      }
    }
  }

  const handleReset = () => {
    getNewWord();
    setGame({...game, started: true, over: false, win: false});
    setWrongGuesses([]);
    setUsedLetters([]);
    setBodyPartsList(bodyParts);
  }

  const handleEndGame = (win) => {
    setGame({...game, over: true, win: win});
  };

  return (
    <Wrapper>
      {game.over === true && <GameOverModal 
        word={word}
        game={game}
        handleReset={handleReset}
      />}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{button}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
        <Container>
          <Deadman bodyPartsList={bodyPartsList}/>
          <RightColumn>
            <DeadLetters
              wrongGuesses={wrongGuesses}
              />
            <TheWord
              word={word}
            />
          </RightColumn>
        </Container>
        <Keyboard
          usedLetters={usedLetters}
          handleGuess={handleGuess}
        />
      </>
      )}
    </Wrapper>
  );
};



export default App;
