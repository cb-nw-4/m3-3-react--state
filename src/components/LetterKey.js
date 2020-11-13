import React from "react";
import styled from "styled-components";

import { colors } from "./GlobalStyles";

const LetterKey = ({ letters, usedLetters, setUsedLetters, word, setWord, wrongGuesses, setWrongGuesses }) => {
  let checkLetter = (letter) => {
    let wordObjectLetters = {...word};
    let usedLettersCopy = {...usedLetters};
    let wrongGuessesCopy = {...wrongGuesses};
    if (wordObjectLetters.str.includes(letter)) {
      usedLettersCopy.push(letter);
      wordObjectLetters.revealed.push(letter);
      setWord(wordObjectLetters);
      setUsedLetters(usedLettersCopy);
    } else {
      usedLettersCopy.push(letter);
      wrongGuessesCopy.push(letter);
      setUsedLetters(usedLettersCopy);
      setWrongGuesses(wrongGuessesCopy);
    }
};
  return (
    <Span>
    {letters.map((letter) => {
      if (wrongGuesses.includes(letter)) {
        return (
          <Wrapper
            disabled={true}>
            {letter}
          </Wrapper>
        );
      } else {
        return (
          <Wrapper
            disabled={false}
            onClick = {() => {checkLetter(letter)}}>
            {letter}
          </Wrapper>
      );
      }
    })}
    </Span>
  )
}
const Span = styled.span`
  display: inline-block;
  width: 800px;
  height: 100px;
`;

const Wrapper = styled.button`
  background: ${colors.green};
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 32px;
  transition: all linear 400ms;

  &:hover {
    background: ${colors.fuchsia};
  }

  &:disabled,
  &:hover:disabled {
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default LetterKey;