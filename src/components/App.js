import React , { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import words from "../data/words.json";
import letters from "../data/letters.json";

import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = { started: false, over: false, win: false };
let button1Label = "Start"; 
let paused = false;
let wrongGuessCount= 0;
let rightGuessCount= 0;

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({str:"", revealed: []});
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const handleStart = () => {
    setGame({ ...game, started: true });
    if (word.str==="") {
      getNewWord();
    }; 
    toggleButton1Label();
  };
  const getNewWord = () => { 
    let newWord = words[Math.round(Math.random()*(words.length-1))]; 
    let revealedArr = []; 
    for ( let i=0; i <= newWord.length - 1; i++) {
    revealedArr.push("");
  };
    setWord({str: `${newWord}`, revealed: [...revealedArr]});
  }; 
  const toggleButton1Label = () => {
    if(!paused && game.over===false) { 
      button1Label = "Pause"; 
      return paused = true; 
    } 
    if (paused ===true && game.over===false) {
      button1Label = "Continue";
      return paused = false;
    }; 
  };
  console.log(word,"word");
  const handleGuess =(event)=> {
    let guessedLetter = event.target.innerText;
    setUsedLetters([...usedLetters,`${guessedLetter}`]);
    let wordSplit = word.str.split(""); 
    let revealedArr = [...word.revealed];
    let newRevealedArr =[];
    let noMatchCount = 0; 
    wordSplit.map ((wordLetter,index)=>{
      if(wordLetter ===  guessedLetter) {
        newRevealedArr = revealedArr.map ((item,itemindex)=>{
          if ( itemindex === index ) { 
            rightGuessCount++;
            console.log(rightGuessCount,"rightGuessCount");
            return item = guessedLetter; 
          } else {
            if(newRevealedArr[itemindex]) {
              return item = newRevealedArr[itemindex];
            } else { 
              return item;
            }; 
          };
        });
        if (rightGuessCount === word.str.length) { 
          console.log("win");
          newRevealedArr = [...wordSplit];
          setWord({...word, revealed: [...newRevealedArr]});
          handleEndGame(true);
        }; 
        return setWord({...word, revealed: [...newRevealedArr]});
      } else {
        noMatchCount ++ ; 
        if (noMatchCount === word.str.length) {
          wrongGuessCount++;
          setWrongGuesses([...wrongGuesses,`${guessedLetter}`])
          console.log(wrongGuessCount,"wrongGuessCount");
          // let head = document.getElementsByClassName("head"); 
          // head.style.strokeStyle = "yellow";
          if (wrongGuessCount===10) { 
            return handleEndGame(false);
          }; 
        };
      } ;
    }); 
  };
  const handleReset = () => { 
    setGame({...game, started:true, over:false});
    setWord({str:"", revealed: []});
    setWrongGuesses([]);
    setUsedLetters([]);
    getNewWord();
    wrongGuessCount= 0;
    rightGuessCount= 0;
  }; 
  const handleEndGame = (win) => {
    setGame({ ...game, win, over:true});
    console.log(game.over,"game.win");
  };
  return (
    <Wrapper>
      { game.over && (<GameOverModal handleReset={handleReset} win={game.win} word = {word.str}/>)}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart} game={game} setGame={setGame}>{button1Label}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman wrongGuessCount= {wrongGuessCount}/>
            <RightColumn>
              <DeadLetters wrongGuesses={wrongGuesses} setWrongGuesses={setWrongGuesses}/>
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard letters={letters} usedLetters={usedLetters} setUsedLetters={setUsedLetters} handleGuess={handleGuess}/>
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
