import React from "react";
import { Path, Line, Group, Image as KonvaImage } from "react-konva";
import useImage from "../hooks/useImage";

export const TShirtMockup = ({
  color = "#fff",
  width,
  height,
  x = 0,
  y = 0,
}) => {
  const scale = 1.4; // SVG viewBox size

  // Create SVG with dynamic background color
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 353.11 373.72">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path d="M142.9,1.83C125.05,14,69.61,32.22,69.61,32.22L1.33,75.67l41.9,76.7,16.65-7.31.14-.22L57.64,372.72H295.47l-2.38-227.88.14.22,16.65,7.31,41.9-76.7L283.5,32.22s-56.09-18.4-73.6-30.6l-.22,0c0,.27,0,.54-.05.81L209,1.23c-7.8,4.06-19.05,7.26-32.49,7.26s-25.36-2.85-33.16-6.91Z" style="fill:${color}"/>
          <path d="M143.43,2.2c-2,1.38-5.53,3.43-8.36,4.93a41.47,41.47,0,0,0,41,35.45,41.45,41.45,0,0,0,41-35.72c-2.76-1.47-6.27-3.43-8.22-4.79,0,0-16.19,6.09-30.44,7S153.67,6.22,143.43,2.2Z" style="fill:#999"/>
          <path d="M143.43,2.2c-2,1.38-5.53,3.43-8.36,4.93a41.47,41.47,0,0,0,41,35.45,41.45,41.45,0,0,0,41-35.72c-2.76-1.47-6.27-3.43-8.22-4.79-19.94,7.12-40.29,11.3-65.49.13Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px"/>
          <path d="M59.88,145.06l-16.65,7.31L1.33,75.67,69.61,32.22s56-18.55,73.88-30.74c0,0,32.06,16,65.51-.32,17.51,12.19,74.5,31.06,74.5,31.06l68.28,43.45-41.9,76.7-16.65-7.31-.05,1.69,2.29,226H57.64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/>
          <line x1="57.84" y1="361.47" x2="295.27" y2="361.47" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;stroke-dasharray:2"/>
          <line x1="57.84" y1="364.74" x2="295.27" y2="364.74" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;stroke-dasharray:2"/>
          <path d="M69.61,32.22s30.65,51.21-9.73,112.84l-16.65,7.31L1.33,75.67,69.61,32.22Z" style="fill:none;stroke:#000;stroke-miterlimit:10"/>
          <path d="M50.87,149l-7.64,3.35L1.33,75.67,69.61,32.22s30.65,51.21-9.73,112.84l-9,4" style="fill:none;stroke:#000;stroke-miterlimit:10"/>
          <line x1="54.09" y1="147.48" x2="53.61" y2="146.61" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px"/>
          <line x1="52.63" y1="144.83" x2="12.16" y2="71.16" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;stroke-dasharray:2.0256049633026123,2.0256049633026123"/>
          <line x1="11.67" y1="70.27" x2="11.19" y2="69.39" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px"/>
          <path d="M283.5,32.22s-30.65,51.21,9.73,112.84l16.65,7.31,41.9-76.7L283.5,32.22Z" style="fill:none;stroke:#000;stroke-miterlimit:10"/>
          <path d="M302.24,149l7.64,3.35,41.9-76.7L283.5,32.22s-30.65,51.21,9.73,112.84l9,4" style="fill:none;stroke:#000;stroke-miterlimit:10"/>
          <line x1="299.02" y1="147.48" x2="299.5" y2="146.61" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px"/>
          <line x1="300.48" y1="144.83" x2="340.95" y2="71.16" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;stroke-dasharray:2.0256049633026123,2.0256049633026123"/>
          <line x1="341.44" y1="70.27" x2="341.92" y2="69.39" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px"/>
          <path d="M142.56,10.68s31.16,15.15,69.92-.31" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px"/>
          <path d="M142.56,12s31.16,15.15,69.92-.31" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;stroke-dasharray:2"/>
          <path d="M142.56,15.24s31.16,15.15,69.92-.31" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;stroke-dasharray:2"/>
          <path d="M142.56,16.55s31.16,15.15,69.92-.31" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px"/>
          <path d="M210,2.53a33.9,33.9,0,0,1-33.91,32.26,33.74,33.74,0,0,1-33.69-32,78.18,78.18,0,0,1-7.33,4.31,41.47,41.47,0,0,0,41,35.45,41.45,41.45,0,0,0,41-35.71A73.22,73.22,0,0,1,210,2.53Z" style="fill:#fff"/>
          <path d="M210,2.53a33.9,33.9,0,0,1-33.91,32.26,33.74,33.74,0,0,1-33.69-32,78.18,78.18,0,0,1-7.33,4.31,41.47,41.47,0,0,0,41,35.45,41.45,41.45,0,0,0,41-35.71A75.55,75.55,0,0,1,210,2.53Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px"/>
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
        y={0}
        width={420}
        height={400}
        draggable={false}
      />
    </Group>
  );
};
