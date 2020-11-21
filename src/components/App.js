import React, {Children, useState} from "react";
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

const initialGameState = { started: false, over: false, win: false};
let numTries = 0;

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: []});
  const [leftButton, setLeftButton] = useState("START");
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);


  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    // Get a new word
    if(word.str===""){ getNewWord(); }
    // Set the Start button
    if(!game.started){  setLeftButton("PAUSE");}
    if(game.started){  setLeftButton("CONTINUE");}
  };

  const handleReset = () =>{
    setGame({initialGameState, started: true});
    getNewWord();
    setWrongGuesses([]);
    setUsedLetters([]);
    numTries=0;
  };

  const getNewWord = () =>{
     let newWord = words[Math.round(Math.random()*words.length)];
     let newArray = [];
     for (let i =0; i< newWord.length; i++){
       newArray.push("");
     }
     setWord({str: newWord, revealed:newArray});
  };

  const handleEndGame = (win) => {
    setGame({...game, over:true, win: win});
    alert(`Game Over! You ${win ? "win" : "lose"}`);
    //handleReset();
  };

  const handleGuess = (ltr) => {

    // Add the used letter
    setUsedLetters(usedLetters.concat(ltr));

    // Search for the letter in the word
    let index = word.str.indexOf(ltr);
    if(index===-1){
      //Add letter to wrong guesses
      setWrongGuesses(wrongGuesses.concat(ltr));
      //Keep track of tries
      numTries++;
      console.log(numTries);
      if(numTries>9){
        handleEndGame(false);
      }
    }else{
      // Add letter to revealed letters
      let newArray = [...word.revealed];
        for(let i=0; i<word.str.length; i++){
          if(word.str[i]=== ltr){
            newArray[i]=ltr;
          }
        }
      setWord({...word, revealed:newArray });
      
      if(word.str=== newArray.toString().replace(new RegExp(',','g'), "")){
        console.log('win!');
        handleEndGame(true);
      }
    }
  };


  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart} children={leftButton}></Button>
        <Button onClickFunc={handleReset}>RESET</Button>
      </Nav>
      {game.started &&(
      <>
        <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters wrongGuesses={wrongGuesses}/>
            <TheWord word={word}/>
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