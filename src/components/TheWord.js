import React from "react";
import styled from "styled-components";

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

const TheWord = (props) => {
  return (
    <Wrapper>{props.word.revealed.map((str, index) => {
      if (str === '') {
        return(
          <Span line={true} key={index}>{str}</Span>
        );
      }
      else {
        return (
          <Span line={false} key={index}>{str}</Span>
        );
      }
      })}
    </Wrapper>
  )
}

export default TheWord;
