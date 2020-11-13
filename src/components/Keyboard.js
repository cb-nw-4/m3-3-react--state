import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";

import { colors, contentWidth } from "./GlobalStyles";

const Keyboard = ({ letters, usedLetters, setUsedLetters, word, setWord, wrongGuesses, setWrongGuesses }) => (
  <Wrapper>
    <LetterKey>
      letters={letters}
      usedLetters={usedLetters}
      setUsedLetters={setUsedLetters}
      word={word}
      setWord={setWord}
      wrongGuesses={wrongGuesses}
      setWrongGuesses={setWrongGuesses}
    </LetterKey>
  </Wrapper>
);

const Wrapper = styled.div`
  background: ${colors.yellow};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px 12px;
  max-width: ${contentWidth};
  min-width: 320px;
`;

export default Keyboard;
