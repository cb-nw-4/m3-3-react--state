import React from "react";
import styled from "styled-components";

// const TheWord = ({}) => <Wrapper><Span>____ ____ ____ ____ </Span></Wrapper>;
const TheWord = ({word}) => {
  return (
    <Wrapper>
      {word.revealed.map((letter) => {
        if (letter === "") {
        return (
          <Span> ____ </Span>
        );
        } else {
          return (
            <Span>{letter}</Span>
        )
        }
      })
    }
    </Wrapper>
  );
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
  padding: 0 25px;
`;

export default TheWord;
