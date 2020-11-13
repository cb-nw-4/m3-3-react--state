import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import LetterKey from "./LetterKey";
import GameOverModal from "./GameOverModal";

import words from "../data/words.json";

import { colors, contentWidth } from "./GlobalStyles";
const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);

  const [word, setWord] = useState({ str: "", revealed: [] });

  const [wrongGuesses, setWrongGuesses] = useState([]);

  const [usedLetters, setUsedLetters] = useState([]);

  const handleGuess = (ltr) => {
    console.log(`HandleGuess:`, word);

    setUsedLetters(usedLetters.concat(ltr));
    let newObj = { ...word };
    let wrngGuesses = [...wrongGuesses]
    const revealedLetters = [...word.revealed];
    if (newObj.str.includes(ltr)) {
      let wordArr = newObj.str.split("");
      let newWordArr = wordArr.map((letter, i) => {
        if (letter === ltr) {
          revealedLetters[i] = wordArr[i];
        }
      });
    } else {
      ;
      wrngGuesses.push(ltr);
      setWrongGuesses(wrngGuesses);
      console.log(`wrongGuesses`, wrongGuesses);
    }
    setWord({ ...newObj, revealed: revealedLetters });
    if (wrngGuesses.length === 10) {
      handleEndGame(false);
    }
    if (!revealedLetters.includes("_")) {
      handleEndGame(true);
    }
  };

  const getNewWord = () => {
    let n = Math.floor(Math.random() * 870);
    let newArray = [];
    newArray.length = words[n].length;
    newArray.fill("_");
    setWord({ str: words[n], revealed: newArray });
  };

  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    if (word.str === "") getNewWord();
  };

  const handleReset = () => {
    setGame({ started: true, over: false, win: false });
    setWord({ str: "", revealed: [] });
    setWrongGuesses([]);
    setUsedLetters([]);
    getNewWord();
  };

  const handleEndGame = (win) => {
    if (win) setGame({ started: false, over: true, win: true });
    if (!win) setGame({ started: false, over: true, win: false });
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>Start</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman wrongGuesses={wrongGuesses}/>
            <RightColumn>
              <DeadLetters
                wrongGuesses={wrongGuesses}
                setWrongGuesses={setWrongGuesses}
              />
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard
            handleLetterClick={handleGuess}
            usedLetters={usedLetters}
            setUsedLetters={setUsedLetters}
          />
        </>
      )}
      {game.over && (
        <GameOverModal game={game} word={word} handleReset={handleReset} />
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

  }

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
