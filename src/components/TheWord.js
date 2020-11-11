import React from "react";
import styled from "styled-components";

const TheWord = (props) => {
  let revealed = props.word.revealed; 
  return (
    <Wrapper>
      {revealed.map ((item,index)=> {
        if (item==="") {
          return (<Span line={"yes"} key={index}></Span>)
        } else {
          return (<Span key={index}>{item}</Span>)
        }; 
      })}
    </Wrapper>
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
