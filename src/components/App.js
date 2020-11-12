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
import letters from "../data/letters.json"

import { colors, contentWidth } from "./GlobalStyles";
const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({
    str: "",
    revealed: [],
  });

  const [wrongGuesses, setWrongGuesses] = useState([]);

  const [usedLetters, setUsedLetters] = useState([]);

  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    if(!game.started && word.str.length<1){
      getNewWord();
    }
  };

  const handleReset=()=>{
    if(game.started && word.str.length>1){
      getNewWord();
      setGame({started: true, over: false, win: false});
      setWrongGuesses([]);
      setUsedLetters([]);
    }
  }

  const getNewWord=()=>{
    const val=words[Math.floor(Math.random() * words.length)];
    const arr=[];
    val.split('').forEach(() => {
      return arr.push("");
    });
    setWord({str:val,revealed:arr});
    console.log(val);
  }

  const getIndices=(arr, val)=>{
    var index = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        index.push(i);
    }
    return index;
  }

  const handleClick=(event)=>{
    const wordarr=word.str.split('');
    //console.log(wordarr);
    let letterClicked=event.target.id;
    let indexof=getIndices(wordarr, letterClicked);
    //console.log(indexof);
    const newarr=[...usedLetters];
    newarr.push(letterClicked);
    setUsedLetters(newarr);
    let isLetterValid=false;
    wordarr.forEach(el=>{
      if(el===letterClicked){
        isLetterValid=true;
      }
    });
    
    if(isLetterValid){
      indexof.forEach(index=>{
        return word.revealed[index]=letterClicked;
      });
      checkStatus();
    }
    else{
      const guessarr=[...wrongGuesses];
      guessarr.push(letterClicked);
      checkStatus();
      return setWrongGuesses(guessarr);
    }
  }

  const checkStatus=()=>{
    if(wrongGuesses.length<=9 && word.revealed.join('')===word.str){
      //console.log(word.revealed);
      return handleEndGame(true);
  }
  else if(wrongGuesses.length>8){
      return handleEndGame(false);
  }
  }

  const handleEndGame = (win) => {
    setGame({...game, over: true, win: win});
    //console.log(game.over, game.win);
    //return alert(`Game Over! You ${win ? "win" : "lose"}`);
  };

  return (
    <Wrapper>
      {(game.over===true) ? <GameOverModal 
        word={word}
        game={game}
        reset={handleReset}/> : <></>}
      <Header />
      <Nav>
        <Button handleFunc={handleStart}>{(!game.started && word.str.length<1)? "Start" : (game.started && word.str.length>1)? "Pause" : "Continue"}</Button>
        <Button handleFunc={handleReset}>Reset</Button>
      </Nav>  
      {game.started &&(
        <>
        <Container >
          <Deadman />
          <RightColumn>
            <DeadLetters guesses={wrongGuesses}/>
            <TheWord words={word}/>
          </RightColumn>
          </Container>
          <Keyboard usedletters={usedLetters} onclick={handleClick}/>
        
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
