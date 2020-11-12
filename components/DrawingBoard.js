import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { prop } from "styled-tools";

import Canvas from "./Canvas";

const StyledDrawingBoard = styled.div`
  position: relative;
`;

const StyledColorButton = styled.button`
  background: ${prop("color", "red")};
  border: none;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
`;

const StyledThicknessButton = styled.button`
  background: ${prop("color", "black")};
  border: none;
  width: ${prop("thickness", "2")}rem;
  height: ${prop("thickness", "2")}rem;
  padding: 0;
  border-radius: 50%;
`;

const StyledPicker = styled.div`
  position: relative;
  float: left;
  height: ${prop("height")}px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 40px;
    height: 7rem;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    border-left: 2px solid black;
    border-radius: 1rem 0 0 1rem;
  }
`;

const DrawingBoard = ({ color1, color2 }) => {
  const [strokeColor, setStrokeColor] = useState(color1);
  const [thickness, setThickness] = useState(1);
  const [canvasSize, setCanvasSize] = useState(0);
  let resizeTimer;

  useEffect(() => {
    setCanvasSize(Math.min(window.innerHeight, window.innerWidth) - 60);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    resizeTimer = setTimeout(function () {
      // const image = new Image();
      // image.src = canvasRef.current.toDataURL("image/webp");
      // setDrawing(image);
      setCanvasSize(Math.min(window.innerHeight, window.innerWidth) - 60);
    }, 350);
  };

  return (
    <StyledDrawingBoard>
      <StyledPicker height={canvasSize}>
        <div>
          <StyledColorButton
            color={color1}
            onClick={() => setStrokeColor(color1)}
          />
          <StyledColorButton
            color={color2}
            onClick={() => setStrokeColor(color2)}
          />
        </div>
        <div>
          <StyledThicknessButton
            color={strokeColor}
            thickness={0.4}
            onClick={() => setThickness(3)}
          />
          <StyledThicknessButton
            color={strokeColor}
            thickness={1.2}
            onClick={() => setThickness(14)}
          />
          <StyledThicknessButton
            color={strokeColor}
            thickness={2}
            onClick={() => setThickness(20)}
          />
        </div>
      </StyledPicker>
      <Canvas
        thickness={thickness}
        strokeColor={strokeColor}
        canvasSize={canvasSize}
      />
    </StyledDrawingBoard>
  );
};

export default DrawingBoard;
