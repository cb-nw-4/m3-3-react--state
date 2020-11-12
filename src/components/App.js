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

import { colors, contentWidth } from "./GlobalStyles";
import { render } from "@testing-library/react";

const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({str: ""});
  const [buttonText, setButtonText] = useState("Start");
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const handleStart = (game, setGame) => {
    setGame({ ...game, started: !game.started });
    if (word.str === "") {
      getNewWord(words);
    }
  };

  const getNewWord = (words) => {
    let str = words[Math.floor(Math.random() * words.length)];
    let emptyStrings = []
    for (let i = 0; i < str.length; i++) {
      emptyStrings.push("");
    }
    setWord({ ...word, str: str, revealed: emptyStrings }); 
  };

  const handleGuess = (ltr) => {
    console.log('handleGuess', ltr);
    setUsedLetters(usedLetters.concat(ltr));
    if (word.str.includes(ltr)) {
      for(let i = 0; i < word.str.length; i++) {
        if (word.str[i] === ltr) {
          word.revealed[i] = ltr;
        }
      }
      setWord({ ...word, revealed: word.revealed });
    } else {
      setWrongGuesses(wrongGuesses.concat(ltr));
    }
  };

  const handleReset = (ltr) => {
      const newList = usedLetters.filter((item) => item.ltr !== ltr);
      setUsedLetters(newList);

      const emptyDeadLetters = wrongGuesses.filter((item) => item.ltr !== ltr);
      setWrongGuesses(emptyDeadLetters);

      setGame({ ...game, started: !game.started });
      getNewWord(words);
  }


  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>


        <Button onClickFunc={() => handleStart(game, setGame)}>{buttonText}</Button>
        <Button onClickFunc={() => handleReset()}>Reset</Button>
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
        <Keyboard usedLetters={usedLetters} handleGuess={handleGuess}/>
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
