import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";

import { colors, contentWidth } from "./GlobalStyles";

const Keyboard = ({letters,usedLetters,handleGuess}) => (
  <Wrapper>
  {
    letters.map((letter)=>{
      return <LetterKey letter={letter} usedLetters={usedLetters} handleGuess={handleGuess} key={letter}/>
    }) 
  }
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