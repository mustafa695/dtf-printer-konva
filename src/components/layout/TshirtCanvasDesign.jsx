import React, { useState, useRef } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Rect,
  Circle,
  Star,
  Transformer,
  Group,
} from "react-konva";

// import { TShirtMockup } from "./components/TShirtMockup";
import Sidebar from "../Sidebar";
import Layouts from "../Layouts";
import TopToolbar from "../TopToolbar";

import { TShirtMockup } from "../TShirtMockup";
import { useDesignStore } from "../../store/designStore";
import { Button } from "@shopify/polaris";
import { BackTshirtMockup } from "../BackTshirtMockup";
import { Heart } from "../graphics/heart";
import { DESIGN_AREA, SELEEVE } from "../../constant";
import { SeleeveRight } from "../SeleeveRight";

const TShirtActions = [
  { id: "ybcAuiuui2", text: "Front side" },
  { id: "ybcAuiuui3", text: "Back side" },
  { id: "ybcAuiuui4", text: "Seleeve right" },
  { id: "ybcAuiuui5", text: "Seleeve left" },
  { id: "ybcAuiuu6", text: "Neck label inner" },
];

function TshirtCanvasDesign() {
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const visibleRef = useRef(true);

  const [currentAction, setCurrentAction] = useState(TShirtActions[0].id); // Front, back, seleeve right ....

  const {
    tshirtColor,
    setElements,
    elements,
    selectedId,
    setSelectedId,
    setDesignJson,
    designJson,
  } = useDesignStore();

  const updateElement = (id, updates) => {
    setElements(
      elements.map((el) => (el?.id === id ? { ...el, ...updates } : el))
    );
  };

  let selectedElement =
    elements && elements?.find((el) => el?.id === selectedId);

  React.useEffect(() => {
    if (selectedId && transformerRef.current) {
      const node = stageRef.current.findOne(`#${selectedId}`);
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  // const checkDeselect = (e) => {
  //   const clickedOnEmpty = e.target === e.target.getStage();
  //   if (clickedOnEmpty) {
  //     setSelectedId(null);
  //   }
  // };

  const checkDeselect = (e) => {
    // stage reference (fallback to event stage)
    const stage = stageRef.current || e.target.getStage();

    // clicked node
    let node = e.target;

    // direct click on empty stage
    if (node === stage) {
      setSelectedId(null);
      return;
    }

    // climb up the ancestors until we reach the stage
    while (node && node !== stage) {
      // if user clicked the Transformer (or a handle inside it), do nothing
      if (transformerRef.current && node === transformerRef.current) {
        return;
      }

      // if any ancestor has an id that matches an element, it's a click on an element -> keep selection
      const nodeId = typeof node.id === "function" ? node.id() : null;
      if (nodeId && elements?.some((el) => String(el.id) === String(nodeId))) {
        return;
      }

      node = node.getParent();
    }

    // otherwise it was a click on empty area (e.g. group background) -> deselect
    setSelectedId(null);
  };

  const switchTshirtSides = (actionType) => {
    setSelectedId(null);
    let newJson = { ...designJson };
    newJson[currentAction] = [...elements];

    let findPrevElements = newJson[actionType];
    if (findPrevElements) {
      setElements([...findPrevElements]);
    } else {
      setElements([]);
    }
    setDesignJson(newJson);
  };

  console.log({ designJson, elements });

  let seleevemode = TShirtActions[2]?.id == currentAction;

  return (
    <>
      {/* Left Toolbar */}
      <Sidebar
        selectedElement={selectedElement}
        updateElement={updateElement}
      />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <TopToolbar
          selectedElement={selectedElement}
          stageRef={stageRef}
          visibleRef={visibleRef}
          currentAction={currentAction}
        />

        <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
          <div className="relative">
            <Stage
              width={650}
              height={650}
              ref={stageRef}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
            >
              <Layer>
                {/* T-Shirt Background */}

                {/* Front Tshirt View  */}
                {TShirtActions[0]?.id === currentAction && (
                  <TShirtMockup
                    color={tshirtColor}
                    width={450}
                    height={450}
                    x={20}
                    y={20}
                  />
                )}
                {/* Back Tshirt View  */}

                {TShirtActions[1]?.id == currentAction && (
                  <BackTshirtMockup
                    color={tshirtColor}
                    width={450}
                    height={450}
                    x={20}
                    y={20}
                  />
                )}

                {seleevemode && <SeleeveRight color={tshirtColor} />}

                {/* Design Area (clip group) */}
                <Group
                  x={!seleevemode ? DESIGN_AREA.x : SELEEVE.x}
                  y={!seleevemode ? DESIGN_AREA.y : SELEEVE.y}
                  clip={
                    visibleRef.current
                      ? {
                          x: 0,
                          y: 0,
                          width: !seleevemode
                            ? DESIGN_AREA.width
                            : SELEEVE.width,
                          height: !seleevemode
                            ? DESIGN_AREA.width
                            : SELEEVE.width,
                        }
                      : undefined
                  }
                >
                  {elements?.map((element) => {
                    const commonProps = {
                      id: element.id,
                      x: element.x,
                      y: element.y,
                      rotation: element.rotation || 0,
                      draggable: true,
                      onClick: () => setSelectedId(element.id),
                      onTap: () => setSelectedId(element.id),
                      onDragEnd: (e) => {
                        updateElement(element.id, {
                          x: e.target.x(),
                          y: e.target.y(),
                        });
                      },
                      onTransformEnd: (e) => {
                        const node = e.target;
                        updateElement(element.id, {
                          x: node.x(),
                          y: node.y(),
                          rotation: node.rotation(),
                          scaleX: node.scaleX(),
                          scaleY: node.scaleY(),
                        });
                      },
                    };

                    switch (element.type) {
                      case "text":
                        return (
                          <Text
                            key={element?.id}
                            {...commonProps}
                            text={element?.text}
                            fontSize={element?.fontSize}
                            fontFamily={element?.fontFamily}
                            fill={element?.fill}
                            scaleX={element?.scaleX}
                            scaleY={element?.scaleY}
                          />
                        );
                      case "rectangle":
                        return (
                          <Rect
                            key={element.id}
                            {...commonProps}
                            width={element.width}
                            height={element.height}
                            fill={element.fill}
                            stroke={element.stroke}
                            strokeWidth={element.strokeWidth}
                            scaleX={element?.scaleX}
                            scaleY={element?.scaleY}
                          />
                        );
                      case "circle":
                        return (
                          <Circle
                            key={element.id}
                            {...commonProps}
                            radius={element.radius}
                            fill={element.fill}
                            stroke={element.stroke}
                            strokeWidth={element.strokeWidth}
                            scaleX={element?.scaleX}
                            scaleY={element?.scaleY}
                          />
                        );
                      case "star":
                        return (
                          <Star
                            key={element.id}
                            {...commonProps}
                            numPoints={element.numPoints}
                            innerRadius={element.innerRadius}
                            outerRadius={element.outerRadius}
                            fill={element.fill}
                            stroke={element.stroke}
                            strokeWidth={element.strokeWidth}
                            scaleX={element?.scaleX}
                            scaleY={element?.scaleY}
                          />
                        );
                      case "image":
                        return (
                          <KonvaImage
                            key={element.id}
                            {...commonProps}
                            width={element.width}
                            height={element.height}
                            scaleX={element?.scaleX}
                            scaleY={element?.scaleY}
                            image={(() => {
                              const img = new window.Image();
                              img.src = element.src;
                              return img;
                            })()}
                          />
                        );

                      case "heart":
                        return (
                          <Heart
                            key={element?.id}
                            width={element?.width}
                            height={element?.height}
                            scaleX={element?.scaleX}
                            scaleY={element?.scaleY}
                            commonProps={{ ...commonProps }}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </Group>

                {/* Design Area Outline (for preview only) */}
                <Rect
                  x={!seleevemode ? DESIGN_AREA.x : SELEEVE.x}
                  y={!seleevemode ? DESIGN_AREA.y : SELEEVE.y}
                  width={!seleevemode ? DESIGN_AREA.width : SELEEVE.width}
                  height={!seleevemode ? DESIGN_AREA.height : SELEEVE.height}
                  stroke="#000"
                  strokeWidth={1.5}
                  dash={[7, 8]}
                  listening={false}
                  visible={visibleRef.current}
                />

                {/* Transformer */}
                {selectedId && (
                  <Transformer
                    ref={transformerRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>

      <Layouts />

      <div className="absolute bottom-10 left-1/2">
        <div className="flex items-center gap-4">
          {TShirtActions.map((item) =>
            currentAction === item.id ? (
              <Button variant={"primary"} key={item?.id}>
                {item?.text}
              </Button>
            ) : (
              <Button
                key={item?.id}
                onClick={() => {
                  setCurrentAction(item?.id);
                  switchTshirtSides(item?.id);
                }}
              >
                {item?.text}
              </Button>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default TshirtCanvasDesign;
