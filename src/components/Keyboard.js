import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";

import { colors, contentWidth } from "./GlobalStyles";

const Keyboard = (props) => {
  //console.log(props.onclick);
  return (<Wrapper >
    <LetterKey disable={props.usedletters} click={props.onclick}/>
  </Wrapper>)
};

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

  &:disabled,
  &:hover:disabled {
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  }

`;

export default Keyboard;
