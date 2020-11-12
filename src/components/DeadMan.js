import React from "react";
import styled from "styled-components";
import { colors } from "./GlobalStyles";

const DeadMan = ({ wrongGuesses }) => {
  
  return (
    <SVG>
      {/* Structure */}
      <line x1="60" y1="20" x2="200" y2="20" />
      <line x1="200" y1="20" x2="200" y2="70" />
      <line x1="60" y1="20" x2="60" y2="400" />
      <line x1="45" y1="385" x2="300" y2="385" />
      {/* head */}
      {wrongGuesses.length >= 1 && (
        <circle cx="200" cy="115" r="45" className="head" />
      )}
      {/* body */}
      {wrongGuesses.length >= 2 && (
      <line x1="200" y1="160" x2="200" y2="260" className="body" />
      )}
      {/* Arms */}
      {wrongGuesses.length >= 3 && (
      <line x1="200" y1="200" x2="120" y2="120" className="left-arm" />
      )}
      {wrongGuesses.length >= 4 && (
      <line x1="200" y1="200" x2="280" y2="120" className="right-arm" />
      )}
      {/* Legs */}
      {wrongGuesses.length >= 5 && (
      <line x1="200" y1="260" x2="120" y2="350" className="left-leg" />
      )}
      {wrongGuesses.length >= 6 && (
      <line x1="200" y1="260" x2="280" y2="350" className="right-leg" />
      )}
      {/* hands */}
      {wrongGuesses.length >= 7 && (
      <circle cx="113" cy="111" r="10" className="left-hand" />
      )}
      {wrongGuesses.length >= 8 && (
      <circle cx="285" cy="111" r="10" className="right-hand" />
      )}
      {/* feet */}
      {wrongGuesses.length >= 9 && (
      <ellipse cx="112" cy="338" rx="10" ry="18" className="left-foot" />
      )}
      {wrongGuesses.length >= 10 && (
      <ellipse cx="288" cy="338" rx="10" ry="18" className="right-foot" />
      )}
    </SVG>
  );
};

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
    /* stroke: transparent; */
  }
`;

export default DeadMan;
