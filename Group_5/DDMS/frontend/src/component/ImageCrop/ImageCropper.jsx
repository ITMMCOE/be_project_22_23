// import image from "./img.jpg";
import {
  Box,
  Button,
  ScrollArea,
  SimpleGrid,
  Container,
  NumberInput,
} from "@mantine/core";
import React, { useState, useRef } from "react";
import axios from "../../axiosConfig";

export function ImageWithRectangles(props) {
  const image = props.image;
  const response = props.res;
  console.log(image);
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [pages, setPages] = useState(0);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [clientDimensions, setClientDimensions] = useState({
    clientWidth: 0,
    clientHeight: 0,
  });

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setRectangles((prevState) => [
      ...prevState,
      { x: offsetX, y: offsetY, width: 0, height: 0 },
    ]);
    setDrawing(true);
  };

  const endDrawing = () => {
    setDrawing(false);
    const lastRectangle = rectangles[rectangles.length - 1];
    // console.log("Coordinates:", lastRectangle.x, lastRectangle.y);
    // console.log("Width:", Math.abs(lastRectangle.width));
    // console.log("Height:", Math.abs(lastRectangle.height));
  };

  const drawRect = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;

    const lastRectangle = rectangles[rectangles.length - 1];
    const width = offsetX - lastRectangle.x;
    const height = offsetY - lastRectangle.y;

    setRectangles((prevState) => {
      const newRectangles = [...prevState];
      newRectangles[newRectangles.length - 1] = {
        ...lastRectangle,
        width: width,
        height: height,
      };
      return newRectangles;
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0);

    rectangles.forEach((rectangle) => {
      ctx.strokeStyle = "red";
      ctx.strokeRect(
        rectangle.x,
        rectangle.y,
        rectangle.width,
        rectangle.height
      );
    });
  };

  const onImageLoad = (e) => {
    const canvas = canvasRef.current;
    const { naturalWidth, naturalHeight } = e.target;
    setClientDimensions({
      clientWidth: naturalWidth,
      clientHeight: naturalHeight,
    });
    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgRef.current, 0, 0);
  };

  const onReset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0);
    setRectangles([]);
  };

  const onExport = () => {
    image.overlay(true);
    let coords = [];
    let seatnos = [];
    let name = image.filepath;
    let width = image.width;
    let height = image.height;
    let displayHt = clientDimensions.clientHeight;
    let displayWdth = clientDimensions.clientWidth;
    console.log(displayWdth, displayHt);
    let scaleX = width / displayWdth;
    let scaleY = height / displayHt;
    console.log("SCALING FACTORS:", scaleX, scaleY);
    rectangles.forEach((rect) => {
      if (rect.width !== 0 && rect.height !== 0) {
        let tmp = [
          Math.round(rect.y * scaleY),
          Math.round((rect.y + rect.height) * scaleY),
          Math.round(rect.x * scaleX),
          Math.round((rect.x + rect.width) * scaleX),
        ];
        if (rect.height > 200) {
          coords.push(tmp);
        } else {
          seatnos.push(tmp);
        }
      }
    });

    console.log(document.querySelector("#selectorImg").clientHeight);
    const reqBody = {
      coords: coords,
      seatnos: seatnos,
      pages: pages,
      name: name,
      image: image.imagePath,
    };
    console.log(JSON.stringify(reqBody));
    axios.post("/marks/cropCoordinates", reqBody).then((res) => {
      props.response(res.data.objects);
    });
  };

  return (
    <Container size={"xl"}>
      <Container m={24}>
        <NumberInput
          onChange={setPages}
          value={pages}
          label={"Select Pages:"}
          description={"Select The Number Of Pages to extract data from"}
          radius={"md"}
          withAsterisk
        />
      </Container>
      {pages !== 0 && (
        <>
          <ScrollArea
            h={600}
            sx={(theme) => ({
              // "background-color": "whitesmoke",
              "border-radius": theme.radius.xl,
              border: "1px solid lightgrey",
            })}
          >
            <Box
              p={24}
              sx={(theme) => ({
                "background-color": "whitesmoke",
                cursor: "crosshair",
              })}
            >
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={startDrawing}
                onMouseMove={drawRect}
                onMouseUp={endDrawing}
              >
                {image && (
                  <img
                    id="selectorImg"
                    src={`http://localhost:5000/temp/${image.imagePath}`}
                    alt=""
                    // width={800}
                    // height={600}
                    ref={imgRef}
                    onLoad={onImageLoad}
                    style={{ overflow: "scroll" }}
                  />
                )}
              </canvas>
            </Box>
          </ScrollArea>
          <SimpleGrid cols={2} m={12}>
            <Button onClick={onReset}>Reset Rectangles and Draw Again</Button>
            <Button onClick={onExport}>Extract Data</Button>
          </SimpleGrid>
        </>
      )}
    </Container>
  );
}
