import React from "react";
import styled from "styled-components";

const TheWord = (props) => {
  console.log(props);
  return (
    <>
      <Wrapper>
        {props.word.revealed.map((position, i) => {
          return <Span key={i}>{`${position}`}</Span>;
          // return {position}
        })}
      </Wrapper>
    </>
  );
};

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
