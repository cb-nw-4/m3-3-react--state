import React from "react";
import styled from "styled-components";

const TheWord = ({word}) => { 
return (<Wrapper>
  {word.revealed.map((letter) => (
   
   <Span line={letter}>
     {letter}
   </Span>
 ))} 
</Wrapper>) 
}


const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex; 
  margin-bottom:20px;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "2px solid white")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;
 


export default TheWord;
