import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const StyledCanvas= styled.canvas`
    border: 2px solid black;
    border-radius: 2%;
    touch-action: none;
`;

const Canvas = ({thickness, strokeColor, canvasSize}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize * 2;
    canvas.height = canvasSize * 2;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    const ctx = canvas.getContext("2d");
    // drawing &&
    //   ctx.drawImage(
    //     drawing,
    //     0,
    //     0,
    //     drawing.width,
    //     drawing.height,
    //     0,
    //     0,
    //     canvas.width,
    //     canvas.height
    //   );
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineWidth = thickness;
    ctx.strokeStyle = strokeColor;
    ctxRef.current = ctx;
  }, [canvasSize]);

  useEffect(() => {
    ctxRef.current.strokeStyle = strokeColor;
  }, [strokeColor]);
  useEffect(() => {
    ctxRef.current.lineWidth = thickness;
  }, [thickness]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  return (
      <StyledCanvas
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerCancel={finishDrawing}
        onPointerLeave={finishDrawing}
        onPointerMove={draw}
        ref={canvasRef}
      />
  );
};

export default Canvas;
