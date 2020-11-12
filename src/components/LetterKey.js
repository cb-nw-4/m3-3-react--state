import React from "react";
import styled from "styled-components";
import letters from "../data/letters.json"
import { colors } from "./GlobalStyles";

const LetterKey = (props) => {
  //console.log(props);

  // letters.map(el=>{
  //   if(props.disable.indexOf(el)>-1){
  //     console.log("yaaaas")
  //   }
  // })
  return (
    <>
      {letters.map(elem=>{
          return (
              (props.disable.indexOf(elem)>-1) ? 
              (<Wrapper id={elem} disabled onClick={props.click}>
                {elem}
              </Wrapper>) :
              <Wrapper id={elem} onClick={props.click}>
                {elem}
              </Wrapper>
          )
      })}
    </>
  );
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
  &:hover:disabled{
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default LetterKey;