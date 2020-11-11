import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";

import { colors, contentWidth } from "./GlobalStyles";

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

const Keyboard = (props) => {
  return(
    <Wrapper>
    <LetterKey 
      usedLetters={props.usedLetters}
      handleGuess={props.handleGuess}
    />
  </Wrapper>
  )
}

export default Keyboard;
