import React, { useRef, useState } from "react";
import {
  Type,
  Image,
  Square,
  Circle as CircleIcon,
  Star as StarIcon,
  Palette,
} from "lucide-react";
import { useDesignStore } from "../store/designStore";
import { DESIGN_AREA } from "../constant";

const Sidebar = ({ selectedElement, updateElement }) => {
  const [activeTab, setActiveTab] = useState("text");

  const {
    tshirtColor,
    setTshirtColor,
    setElements,
    elements,
    selectedId,
    setSelectedId,
  } = useDesignStore();

  const fileInputRef = useRef(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const adjustedX = DESIGN_AREA.x - DESIGN_AREA.x * 0.35;

  const addText = () => {
    setElements([
      ...elements,
      {
        id: generateId(),
        type: "text",
        text: "New Text",
        x: DESIGN_AREA.x - adjustedX,
        y: DESIGN_AREA.y / 2,
        fontSize: 20,
        fontFamily: "Arial",
        fill: "black",
      },
    ]);
  };

  const addShape = (type) => {
    const baseProps = {
      id: generateId(),
      type,
      x: DESIGN_AREA.x / 2,
      y: DESIGN_AREA.y / 2,
      fill: "#3B82F6",
      stroke: "#1E40AF",
      strokeWidth: 2,
      rotation: 0,
    };

    let shapeProps;
    switch (type) {
      case "rectangle":
        shapeProps = { ...baseProps, width: 100, height: 60 };
        break;
      case "circle":
        shapeProps = { ...baseProps, radius: 50 };
        break;
      case "star":
        shapeProps = {
          ...baseProps,
          numPoints: 5,
          innerRadius: 30,
          outerRadius: 50,
        };
        break;
      default:
        return;
    }

    setElements([...elements, shapeProps]);
    setSelectedId(shapeProps.id);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const newImage = {
          id: generateId(),
          type: "image",
          x: DESIGN_AREA.x + 50,
          y: DESIGN_AREA.y + 50,
          width: Math.min(150, img.width),
          height: Math.min(150, img.height),
          src: e.target?.result,
          fill: "#000000",
          rotation: 0,
        };
        setElements([...elements, newImage]);
        setSelectedId(newImage.id);
      };
      img.src = e.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const addGraphics = () => {
    // add heart svg + text
    let widthDim = DESIGN_AREA.width / 2;
    let heightDim = DESIGN_AREA.height / 2;
    setElements([
      ...elements,
      {
        id: generateId(),
        type: "heart",
        x: 20,
        y: 40,
        fill: "black",
      },
      {
        id: generateId(),
        type: "text",
        text: "you are",
        x: 80,
        y: 90,
        fontSize: 22,
        fontFamily: "Georgia",
        fill: "#fff",
      },
      {
        id: generateId(),
        type: "text",
        text: "literally",
        x: 76,
        y: 115,
        fontSize: 26,
        fontFamily: "Georgia",
        fill: "#fff",
      },
      {
        id: generateId(),
        type: "text",
        text: "the only",
        x: 78,
        y: 141,
        fontSize: 24,
        fontFamily: "Georgia",
        fill: "#fff",
      },
    ]);
  };

  return (
    <>
      <div className="w-80 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <h1 className="!text-4xl font-bold text-gray-800 !mb-8 !font-semibold">
            DTF Designer
          </h1>

          {/* Tool Tabs */}
          <div className="flex flex-wrap !gap-4 !mb-6">
            {[
              { id: "text", icon: Type, label: "Text" },
              { id: "image", icon: Image, label: "Images" },
              { id: "shapes", icon: Square, label: "Shapes" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === id
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <Icon size={16} />
                <span className="!text-base font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Graphics Hearth Shape  */}

          <div className="mb-5">
            <button
              type="button"
              onClick={addGraphics}
              className="bg-red-200 rounded-lg hover:bg-gray-00 text-gray-900 p-2"
            >
              <span className="text-base font-medium">Heart Shape</span>
            </button>
          </div>

          {/* Tool Content */}
          <div className="space-y-4">
            {activeTab === "text" && (
              <div className="space-y-4">
                <button
                  onClick={addText}
                  className="text-lg w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  <Type className="inline w-5 h-5 mr-2" />
                  Add Text
                </button>

                {selectedElement?.type === "text" && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800">
                      Text Properties
                    </h3>
                    <input
                      type="text"
                      value={selectedElement.text || ""}
                      onChange={(e) =>
                        updateElement(selectedId, { text: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter text..."
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={selectedElement.fontSize || 24}
                        onChange={(e) =>
                          updateElement(selectedId, {
                            fontSize: parseInt(e.target.value),
                          })
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        min="8"
                        max="200"
                      />
                      <select
                        value={selectedElement.fontFamily || "Arial"}
                        onChange={(e) =>
                          updateElement(selectedId, {
                            fontFamily: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <input
                      type="color"
                      value={selectedElement.fill}
                      onChange={(e) =>
                        updateElement(selectedId, { fill: e.target.value })
                      }
                      className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === "image" && (
              <div className="space-y-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  <Image className="inline w-5 h-5 mr-2" />
                  Upload Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}

            {activeTab === "shapes" && (
              <div className="space-y-3">
                <button
                  onClick={() => addShape("rectangle")}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  <Square className="inline w-5 h-5 mr-2" />
                  Rectangle
                </button>
                <button
                  onClick={() => addShape("circle")}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  <CircleIcon className="inline w-5 h-5 mr-2" />
                  Circle
                </button>
                <button
                  onClick={() => addShape("star")}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  <StarIcon className="inline w-5 h-5 mr-2" />
                  Star
                </button>

                {selectedElement &&
                  (selectedElement.type === "rectangle" ||
                    selectedElement.type === "circle" ||
                    selectedElement.type === "star") && (
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-800">
                        Shape Properties
                      </h3>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">
                          Fill Color
                        </label>
                        <input
                          type="color"
                          value={selectedElement.fill}
                          onChange={(e) =>
                            updateElement(selectedId, { fill: e.target.value })
                          }
                          className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">
                          Stroke Color
                        </label>
                        <input
                          type="color"
                          value={selectedElement.stroke || "#000000"}
                          onChange={(e) =>
                            updateElement(selectedId, {
                              stroke: e.target.value,
                            })
                          }
                          className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
