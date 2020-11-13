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
import { colors, contentWidth } from "./GlobalStyles";
import { render } from "@testing-library/react";

const initialGameState = { started: false, paused: false, over: false, win: false };
let guesses = 0;

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({str: '', revealed: []});
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  // state to handle body part visibility
  const [stroke, setStroke] = useState(Array(10).fill('transparent'));

  // Generate a new word
  const getNewWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];

    setWord({
      str: newWord,
      revealed: Array(newWord.length).fill('')
    });
  }

  // Handle starting the game
  const handleStart = () => {
    if (!game.started && !game.paused) {
      setGame({ ...game, started: !game.started });
    }

    if (game.started && !game.paused) {
      setGame({ ...game, started: !game.started, paused: !game.paused });
    }

    if (!game.started && game.paused) {
      setGame({ ...game, started: !game.started, paused: !game.paused });
    }
    
    if (word.str.length === 0) {
      getNewWord();
    }
  }

  // Handle resetting the game
  const handleReset = () => {
    getNewWord();
    setGame({...game, over: false, win: false});
    setWrongGuesses([]);
    setUsedLetters([]);
    guesses = 0;
    setStroke(Array(10).fill('transparent'));
  }

  const handleEndGame = (win) => {
    guesses = 0;
    setGame({...game, over: true, win: win});
  }

  // Handle a guess
  const handleGuess = (ltr) => {
    setUsedLetters([...usedLetters, ltr]);

    // Convert word to lowercase to handle capitalized words.
    const wordGuess = word.str.toLowerCase();

    if (wordGuess.indexOf(ltr) === -1) {
      // Wrong guess
      guesses++;
      setWrongGuesses([...wrongGuesses, ltr]);

      // Make body part visible
      let currentStroke = stroke;
      currentStroke[guesses - 1] = colors.yellow;
      setStroke(currentStroke);
    } else {
      // Right guess
      let revealedLetters = word.revealed;

      word.str.split('').forEach((letter, index) => {
        if (letter.toLowerCase() === ltr) {
          revealedLetters[index] = letter;
        }

      });

      setWord({...word, revealed: revealedLetters});
    }

    // Determine if game has been won or lost.
    if (word.revealed.indexOf('') === -1) {
      handleEndGame(true);
    } else if (guesses === 10) {
      handleEndGame(false);
    }
  }

  return (
    <Wrapper>
      {(game.over) ? <GameOverModal win={game.win} word={word.str} reset={handleReset} /> : null}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart} >
          {!game.started && !game.paused && (<>START</>)}
          {game.started && !game.paused && (<>PAUSE</>)}
          {!game.started && game.paused && (<>CONTINUE</>)}
        </Button>
        <Button onClickFunc={handleReset} >RESET</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman stroke={stroke}/>
            <RightColumn>
              <DeadLetters wrongGuesses={wrongGuesses} setWrongGuesses={setWrongGuesses} />
              <TheWord word={word['revealed']}/>
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
