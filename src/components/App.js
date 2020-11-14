import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
// import GameOverModal from "./GameOverModal";
import words from "../data/words.json";
import letters from "../data/letters.json";
import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = { started: false, over: false, win: false };

const App = (props) => {
  // declaration of game's state
  const [game, setGame] = useState(initialGameState);
  // declaration of word state
  const [word, setWord] = useState({ str: "", revealed: []});
  // declaration of wrong guesses state
  const [wrongGuesses, setWrongGuesses] = useState([]);
  // declaration of used letters state
  const [usedLetters, setUsedLetters] = useState([]);
  // call a word from the words array
  const getNewWord = (array) => {
    let randomNumber = Math.floor(Math.random() * words.length);
    let wordToFind = words[randomNumber];
    let wordLength = wordToFind.length;
    let wordObject = {...word};
      wordObject.str = wordToFind;
      for (let x = 0; x < wordLength; x++){
        wordObject.revealed.push("");
      }
    setWord(wordObject);
  }
  // button state declaration
  const [buttonText, setButtonText] = useState({str: "Start"});

  // declaration of start game function, tied to start button
  const handleStart = () => {
    console.log("hello");
    if (!game.started) {
      setGame({...game, started: !game.started});
      setButtonText({str: "Pause"});
      getNewWord();
    } else if (game.started) {
      console.log("continue");
      setButtonText({str: "Continue"});
    }
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{buttonText.str}</Button>
        <Button>btn 2</Button>
      </Nav>s
      {game.started && (
          <>
            <Container>
              <Deadman />
              <RightColumn>
                <DeadLetters wrongGuesses={wrongGuesses}/>
                <TheWord word={word}/>
              </RightColumn>
            </Container>
            <Keyboard 
              letters={letters}
              usedLetters={usedLetters}
              setUsedLetters={setUsedLetters}
              word={word}
              setWord={setWord}
              wrongGuesses={wrongGuesses}
              setWrongGuesses={setWrongGuesses}
              />
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
