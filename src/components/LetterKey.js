import React from "react";
import styled from "styled-components";
import letters from "../data/letters.json"
import { colors } from "./GlobalStyles";

const LetterKey = ({letters, usedLetters, setUsedLetters, handleGuess}) => {
  return letters.map((letter => {
   return  ( 
   <Wrapper 
   onClick={()=> { 
    let tempArray = [...usedLetters];  
    tempArray.push(letter); 
    setUsedLetters(tempArray); 
    handleGuess(letter);

    
   }} 
   disabled={usedLetters.includes(letter)} >
   {letter} </Wrapper>)
    })) 
   
 
};

const Wrapper = styled.button`
  background: ${colors.green};
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 32px;
  transition: all linear 400ms;

  &:hover {
    background: ${colors.fuchsia};
  }

  &:disabled,
  &:hover:disabled {
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default LetterKey;
