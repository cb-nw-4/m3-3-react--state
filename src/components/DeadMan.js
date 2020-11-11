import React from "react";
import styled from "styled-components";
import { colors } from "./GlobalStyles";

const SVG = styled.svg`
  height: 400px;
  width: 320px;
  fill: transparent;
  stroke: ${colors.yellow};
  stroke-width: 4px;
  stroke-linecap: round;

  .head,
  .body,
  .left-arm,
  .right-arm,
  .left-leg,
  .right-leg,
  .left-hand,
  .right-hand,
  .left-foot,
  .right-foot {
    stroke: transparent;
  }
`;

const DeadMan = ({ bodyPartsList }) => {
  return (
    <SVG>
      {/* Structure */}
      <line x1="60" y1="20" x2="200" y2="20" />
      <line x1="200" y1="20" x2="200" y2="70" />
      <line x1="60" y1="20" x2="60" y2="400" />
      <line x1="45" y1="385" x2="300" y2="385" />
      {/* head */}
      <circle cx="200" cy="115" r="45" className={bodyPartsList.includes("head") ? "head" : ""} />
      {/* body */}
      <line x1="200" y1="160" x2="200" y2="260" className={bodyPartsList.includes("body") ? "body" : ""} />
      {/* Arms */}
      <line x1="200" y1="200" x2="120" y2="120" className={bodyPartsList.includes("left-arm") ? "left-arm" : ""} />
      <line x1="200" y1="200" x2="280" y2="120" className={bodyPartsList.includes("right-arm") ? "right-arm" : ""} />
      {/* Legs */}
      <line x1="200" y1="260" x2="120" y2="350" className={bodyPartsList.includes("left-leg") ? "left-leg" : ""} />
      <line x1="200" y1="260" x2="280" y2="350" className={bodyPartsList.includes("right-leg") ? "right-leg" : ""} />
      {/* hands */}
      <circle cx="113" cy="111" r="10" className={bodyPartsList.includes("left-hand") ? "left-hand" : ""} />
      <circle cx="285" cy="111" r="10" className={bodyPartsList.includes("right-hand") ? "right-hand" : ""} />
      {/* feet */}
      <ellipse cx="112" cy="338" rx="10" ry="18" className={bodyPartsList.includes("left-foot") ? "left-foot" : ""} />
      <ellipse cx="288" cy="338" rx="10" ry="18" className={bodyPartsList.includes("right-foot") ? "right-foot" : ""} />
    </SVG> 
  );
}


export default DeadMan;
