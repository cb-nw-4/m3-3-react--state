import React from "react";
import styled from "styled-components";
import App from "./App";

import { colors } from "./GlobalStyles";

// const handleStart = () => {
//   setGame({ ...game, started: !game.started });
// };

const Button = ({ onClickFunc, handleStart, children }) => (
  <Wrapper onClick={onClickFunc}>{children}</Wrapper>
);

const Wrapper = styled.button`
  background: #fff;
  border: 1px solid ${colors.fuchsia};
  border-radius: 4px;
  color: ${colors.fuchsia};
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px 8px;
  text-transform: uppercase;
  margin: 8px;
  width: 120px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Button;
