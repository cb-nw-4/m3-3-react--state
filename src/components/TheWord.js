import React from "react";
import styled from "styled-components";
import RandomKey from './RandomKey';

const TheWord = (props) => {
  return (
    <Wrapper>
      {props.word.map(char => {

        if (char.length === 0) {
          return <Span key={RandomKey()} line="true" />
        } else {
          return <Span key={RandomKey()}>{char}</Span>;
        }
      })}
    </Wrapper>);
}

const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "none")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

export default TheWord;
