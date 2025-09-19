import React from "react";
import { Path, Line, Group, Image as KonvaImage } from "react-konva";
import useImage from "../hooks/useImage";

export const SeleeveRight = ({
  color = "#fff",
  width,
  height,
  x = 0,
  y = 0,
}) => {
  const scale = 1.2; // SVG viewBox size

  // Create SVG with dynamic background color
  const svgString = `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711.68 299.21">
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              d="M710.4,120.59,621.59,298.21H89.39L1.25,120.59S321.36-148.49,710.4,120.59Z"
              style="fill:${color};stroke:#000;stroke-miterlimit:10;stroke-width:2px"
            />
          </g>
        </g>
      </svg>
  `;

  // Convert SVG string to data URL
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  const [image] = useImage(svgDataUrl);

  return (
    <Group x={x} y={y} scaleX={scale} scaleY={scale}>
      <KonvaImage
        image={image}
        x={0}
        y={80}
        width={540}
        height={260}
        draggable={false}
      />
    </Group>
  );
};
