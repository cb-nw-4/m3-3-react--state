import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import words from '../data/words.json';
import letters from '../data/letters.json'

import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = { started: false, pause: false, over: false, win: false };

const App = () => {

  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({str: ""});
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const getNewWord = ()=>{
    const str= words[Math.floor(Math.random() * words.length)];
    const revealed = str.split("").map (char => char ="")
    setWord({...word, str, revealed});
  }



  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    getNewWord();
  };

  const handlePause = () => {
    setGame({ ...game, pause: !game.pause });
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        { !game.started && (<Button onClickFunc ={handleStart} >Start</Button>)}


        { game.started && (<Button onClickFunc={handlePause}>{game.pause ? 'continue' : 'pause'}</Button>)}

        
        <Button>btn 2</Button>
      </Nav>
      
      {game.started && (
        <>  
          <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters wrongGuesses={wrongGuesses} />
            <TheWord  word ={word}/>
          </RightColumn>
          </Container>
          <Keyboard letters={letters} usedLetters={usedLetters}/>
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
