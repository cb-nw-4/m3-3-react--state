import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import words from "../data/words.json";
import GameOverModal from "./GameOverModal";

import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = { started: false, over: false, win: false };
const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [usedLetters, setUsedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    {
      !word.str && getNewWord();
    }
  };

  const handleReset = () => {
    getNewWord();
    setUsedLetters([]);
    setWrongGuesses([]);
  };
  const getNewWord = () => {
    const randomWord = Math.floor(Math.random() * words.length);
    const wordArr = words[randomWord].split("").map((el) => {
      return (el = "");
    });
    setWord({ str: words[randomWord], revealed: wordArr });
  };
  let buttonText = "Start";
  if (game.started === true && word.str.length > 0) {
    buttonText = "Pause";
  } else if (word.str.length > 0) {
    buttonText = "Continue";
  }

  let resetButton = "Reset";

  const handleGuess = (letter) => {
    setUsedLetters(usedLetters.concat(letter));
    const newWord = { ...word };
    newWord.str.split("").forEach((el, i) => {
      if (letter === el) {
        return (newWord.revealed[i] = letter);
      } else if (letter !== el) {
        return setWrongGuesses(wrongGuesses.concat(letter));
      } 
    });
    setWord(newWord);
    if (usedLetters.length > 9) {
      handleEndGame(false)
    } else if (word.str === word.revealed.join('')) {
      handleEndGame(true)
    }
  };

  const handleEndGame = (win) => {
    setGame(win ? game.win = true : game.over = true);
    alert(`Game Over! You ${win ? "win" : "lose"}`);
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{buttonText}</Button>
        <Button onClickFunc={handleReset}>{resetButton}</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman />
            <RightColumn>
              <DeadLetters wrongGuesses={wrongGuesses} />
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard usedLetters={usedLetters} handleGuess={handleGuess} />
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
