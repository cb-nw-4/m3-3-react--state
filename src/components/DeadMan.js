import React from "react";
import styled from "styled-components";
import { colors } from "./GlobalStyles";

const DeadMan = (props) => {
  return (
    <SVG stroke={props.stroke}>
      {/* Structure */}
      <line x1="60" y1="20" x2="200" y2="20" />
      <line x1="200" y1="20" x2="200" y2="70" />
      <line x1="60" y1="20" x2="60" y2="400" />
      <line x1="45" y1="385" x2="300" y2="385" />
      {/* head */}
      <circle cx="200" cy="115" r="45" className="head" />
      {/* body */}
      <line x1="200" y1="160" x2="200" y2="260" className="body" />
      {/* Arms */}
      <line x1="200" y1="200" x2="120" y2="120" className="left-arm" />
      <line x1="200" y1="200" x2="280" y2="120" className="right-arm" />
      {/* Legs */}
      <line x1="200" y1="260" x2="120" y2="350" className="left-leg" />
      <line x1="200" y1="260" x2="280" y2="350" className="right-leg" />
      {/* hands */}
      <circle cx="113" cy="111" r="10" className="left-hand" />
      <circle cx="285" cy="111" r="10" className="right-hand" />
      {/* feet */}
      <ellipse cx="112" cy="338" rx="10" ry="18" className="left-foot" />
      <ellipse cx="288" cy="338" rx="10" ry="18" className="right-foot" />
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

  .head {
    stroke: ${(props) => props.stroke[0]};
  }

  .body {
    stroke: ${(props) => props.stroke[1]};
  }

  .left-arm {
    stroke: ${(props) => props.stroke[2]};
  }
  
  .right-arm {
    stroke: ${(props) => props.stroke[3]};
  }

  .left-leg {
    stroke: ${(props) => props.stroke[4]};
  }

  .right-leg {
    stroke: ${(props) => props.stroke[5]};
  }

  .left-hand {
    stroke: ${(props) => props.stroke[6]};
  }

  .right-hand {
    stroke: ${(props) => props.stroke[7]};
  }

  .left-foot {
    stroke: ${(props) => props.stroke[8]};
  }

  .right-foot {
    stroke: ${(props) => props.stroke[9]};
  }
`;

export default DeadMan;
