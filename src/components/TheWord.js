import React from "react";
import styled from "styled-components";

const TheWord = (props) => {
  //console.log(props);
  return (
    <Wrapper>
      {props.words.revealed.map((element) => {
        return element.length>0 ? element : <Span line/>
      })
      }
    </Wrapper>
  )};

const Wrapper = styled.p`
  font-size: 30px;
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
