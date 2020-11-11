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

const initialGameState = { started: false, over: false, win: false };
const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [status, setStatus] = useState('Start');
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const handleStart = () => {
    setGame({...game, started:!game.started});
    if(word.str === ""){
      getNewWord();
    }
    setStatus('Pause');
    if(status === 'Pause'){
      setStatus('Continue');
    }
  }

  const getNewWord = () => {
      let randomWord = words[Math.floor(Math.random() * words.length)];
      setWord({ str: randomWord, revealed: randomWord.split('').map((letter) => {return letter = ''}) }); //RETURN ['', '', '']
  }
  

  const handleGuess = (ltr) => {
    setUsedLetters([...usedLetters, ltr]);
    // console.log(word.str, ltr, 'test');
    if(word.str.includes(ltr)){
      word.str.split('').map((letter) => {
        if(letter === ltr){
          let ltrIndex = word.str.split('').indexOf(ltr);
          let newWord = {...word}
          newWord.revealed[ltrIndex] = ltr
          setWord(newWord);
        } 
      })
    } else {
      setWrongGuesses(wrongGuesses.concat(ltr));
    }
  }

  const handleReset = () => {
    getNewWord();
  }

  const handleEndGame = (win) => {
    setGame({...game, game: !game.over });
    // setGame({...game, game: !game.over, win: win });
    //if wrongGuesses.length > 9, handleEndGame(false);
    //if word.str.split('') === word.revealed, handleEndGame(true);
  }

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart} >{status}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
      <>
        <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters wrongGuesses={wrongGuesses}/>
            <TheWord word={word}/>
          </RightColumn>
        </Container>
        <Keyboard usedLetters={usedLetters} onLetterClick={handleGuess}/>
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
