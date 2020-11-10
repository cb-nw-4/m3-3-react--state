import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";
import letters from "../data/letters.json";

import { colors, contentWidth } from "./GlobalStyles";

const Keyboard = () => (
    <Wrapper>
      {addLetter()}
    </Wrapper>
);

const addLetter = () => {
  return letters.map((newLetter) => {
    return <LetterKey letter={newLetter}></LetterKey>
  });
}

const Wrapper = styled.div`
  background: ${colors.yellow};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px 12px;
  max-width: ${contentWidth};
  min-width: 320px;
`;

export default Keyboard;
