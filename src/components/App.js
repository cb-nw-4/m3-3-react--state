import React from "react";
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

const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = React.useState(initialGameState);

  const [word, setWord] = React.useState({ str: "", revealed: [] });

  const [status, setStatus] = React.useState("Start");

  const [usedLetters, setUsedLetters] = React.useState([]);

  const [wrongGuesses, setWrongGuesses] = React.useState([]);

  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    setStatus("Pause");
    if (word.str === "") {
      getNewWord();
    }
    if (status === "Pause") {
      setStatus("Continue")
    }
  };

  const handleRestart = () => {
    setGame(initialGameState);
    setGame({ ...game, started: game.started });
    setUsedLetters([]);
    setWrongGuesses([]);
    getNewWord();
  };

  const handleGuess = (letter) => {
    setUsedLetters(usedLetters => [...usedLetters, letter])
    console.log(word.str)
    let wordSplit = word.str.split('');
    let correctGuess = "";
    wordSplit.map((ltr, i) => {
      if (wordSplit.includes(letter) === true && ltr === letter) {
        word.revealed[i] = ltr;
      } else if (wordSplit.includes(letter) === false) {
        console.log(ltr, letter)
        setWrongGuesses([...wrongGuesses, letter])
      }
    })
    console.log(wordSplit, word.revealed)
    if (wrongGuesses.length >= 9) {
      handleEndGame(false);
      setStatus("Start")
      setUsedLetters([]);
      setWrongGuesses([]);
      getNewWord();
    } else if (wordSplit.join('') === word.revealed.join('')) {
      console.log("works");
      handleEndGame(true);
      setStatus("Start");
      setUsedLetters([]);
      setWrongGuesses([]);
      getNewWord();
    }
  }

  const getNewWord = (randomWord) => {
      randomWord = words[Math.floor(Math.random() * words.length)];      
      console.log(randomWord)
      let letterSlots = Array(randomWord.length).fill("");
      console.log(letterSlots)
      setWord( { ...word, str: randomWord, revealed: letterSlots })
  }

  const handleEndGame = (win) => {
    setGame({ started: false, over: false, win: false });
    alert(`Game Over! You ${ win ? "win" : "lose"}`);
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{status}</Button>
        <Button onClickFunc={handleRestart}>Reset</Button>
      </Nav>
      {game.started && (
      <>
        <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters wrongGuesses={wrongGuesses} setWrongGuesses={setWrongGuesses} />
            <TheWord word={word.str} letterSlots={word.revealed} />
          </RightColumn>
        </Container>
        <Keyboard usedLetters={usedLetters}handleGuess={handleGuess}/>
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
