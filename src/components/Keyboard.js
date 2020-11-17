import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";

import { colors, contentWidth } from "./GlobalStyles";

import letters from "../data/letters.json";

const Keyboard = ({ handleLetterClick, usedLetters }) => (
  <Wrapper>
    {letters.map((letter, i) => {
      return (
        <LetterKey
          key={i}
          letter={letter}
          onClick={handleLetterClick}
          usedLetters={usedLetters}
        />
      );
    })}
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
