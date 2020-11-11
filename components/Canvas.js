import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const StyledCanvas= styled.canvas`
    border: 2px solid black;
    border-radius: 2%;
    touch-action: none;
`;

const Canvas = ({strokeColor}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState(0);
  const [drawing, setDrawing] = useState(null);
  let resizeTimer;

  useEffect(() => {
    setCanvasSize(Math.min(window.innerHeight, window.innerWidth) - 20);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize * 2;
    canvas.height = canvasSize * 2;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    console.log(canvas)
    const ctx = canvas.getContext("2d");
    drawing &&
      ctx.drawImage(
        drawing,
        0,
        0,
        drawing.width,
        drawing.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, [canvasSize]);

  useEffect(() => {
    ctxRef.current.strokeStyle = strokeColor;
  }, [strokeColor]);

  const handleResize = () => {
    resizeTimer = setTimeout(function () {
      const image = new Image();
      image.src = canvasRef.current.toDataURL("image/webp");
      setDrawing(image);
      setCanvasSize(Math.min(window.innerHeight, window.innerWidth) - 20);
    }, 350);
  };

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
