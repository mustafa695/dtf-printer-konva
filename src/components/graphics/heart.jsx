import React from "react";
import { Path, Line, Group, Image as KonvaImage } from "react-konva";
import useImage from "../../hooks/useImage";

export const Heart = ({
  color = "#fff",
  width = 200,
  height = 200,
  scaleX,
  scaleY,
  commonProps,
}) => {
  const scale = 1.4; // SVG viewBox size

  // Create SVG with dynamic background color
  const svgString = `
    <svg
        fill="#000"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="800px"
        height="800px"
        viewBox="0 0 475.528 475.528"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M237.376,436.245l0.774,0.976c210.94-85.154,292.221-282.553,199.331-367.706
            c-92.899-85.154-199.331,30.953-199.331,30.953h-0.774c0,0-106.44-116.107-199.331-30.953
            C-54.844,154.658,26.437,351.092,237.376,436.245z"
            />
          </g>
        </g>
      </svg>
  `;

  // Convert SVG string to data URL
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  const [image] = useImage(svgDataUrl);

  return (
    <KonvaImage
      image={image}
      width={width}
      height={height}
      scaleX={scaleX}
      scaleY={scaleY}
      {...commonProps}
    />
  );
};
