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
import letters from "../data/letters.json";
import bodyParts from "../data/body-parts.json";

const App = () => {
  const initialGameState = { started: false, over: false, win: false };
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [startLabel, setStartLabel] = useState("Start");
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const handleEndGame = (win) => {
    setGame({...game, over: true, win: win});    
  };

  const handleNewGame = () => {    
    setGame({...game, started: false, over: false, win: false}); 
    setWrongGuesses([]);
    setUsedLetters([]);
    getNewWord();
    StartButtonLabel();    
  };

  const handleGuess = (ltr) => {   
    setUsedLetters([...usedLetters, ltr]);   

    let isGoodGuess = false;
    const newRevealedArr = word.revealed.map((letter, index)=>{
        if (ltr === word.str[index]) {
          isGoodGuess = true;
          return ltr;
        }          
        return letter;
    });
   
    if (isGoodGuess)
      setWord({...word, revealed: newRevealedArr})
    else {
      setWrongGuesses([...wrongGuesses, ltr]);   
      const body = document.querySelector(`.${bodyParts[wrongGuesses.length]}`);      
      body.style.stroke ="inherit";
    }
   
    if (newRevealedArr.join("") === word.str) 
      handleEndGame(true);    
    else if (wrongGuesses.length === 9 && !isGoodGuess)
      handleEndGame(false)
  };

    const handleReset = () => {    
    setWrongGuesses([]);
    setUsedLetters([]);
    getNewWord();
    setGame({...game, over: false, win: false});
  }

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
      {game.over &&
      <GameOverModal word={word.str} win={game.win} onClickFunc={handleNewGame}/> }
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{startLabel}</Button>
        <Button onClickFunc={handleReset} disabled={!game.started}>Reset</Button>
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
        <Keyboard letters={letters} usedLetters={usedLetters} handleGuess={handleGuess}/>
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
