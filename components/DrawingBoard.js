import React, { useState } from "react";
import styled from "styled-components";
import { prop } from "styled-tools";

import Canvas from "./Canvas"

const StyledDrawingBoard = styled.div`
  display: flex;
  justify-content: space-between;
  .color-bar {
    width: 20rem;
    height: 5rem;
    border: 2px solid black;
    border-radius: 2%/10%;
  }
`;

const Button = styled.button`
  background: ${prop("color", "red")};
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const DrawingBoard = ({}) => {
  const [strokeColor, setStrokeColor] = useState("black");

  const changeColor = (color) => {
    
  };

  return (
    <StyledDrawingBoard>
      <div className="color-bar">
        <Button color="blue" onClick={() => setStrokeColor("blue")} />
        <Button color="red" onClick={() => setStrokeColor("red")} />
      </div>
      <Canvas strokeColor={strokeColor}/>
    </StyledDrawingBoard>
  );
};

export default DrawingBoard;
