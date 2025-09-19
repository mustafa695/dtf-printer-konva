import { Bleed, BlockStack, Icon, InlineGrid } from "@shopify/polaris";
import {
  ColorIcon,
  DeleteIcon,
  PaintBrushFlatIcon,
  TextTitleIcon,
  XIcon,
} from "@shopify/polaris-icons";
import { useDesignStore } from "../store/designStore";
import { useState } from "react";

const TSHIRT_COLORS = [
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
  { name: "Navy", value: "#1F2937" },
  { name: "Gray", value: "#6B7280" },
  { name: "Red", value: "#DC2626" },
  { name: "Blue", value: "#2563EB" },
  { name: "Green", value: "#059669" },
  { name: "Purple", value: "#7C3AED" },
];

const Layouts = () => {
  const {
    tshirtColor,
    setTshirtColor,
    setElements,
    elements,
    selectedId,
    setSelectedId,
  } = useDesignStore();

  const [showColors, setShowColors] = useState(false);

  const removeLayoutLayer = (id) => {
    let removedLayer = elements?.filter((x) => x?.id !== id);
    setElements([...removedLayer]);
    setSelectedId(null);
  };

  return (
    <div className="layout_sidebar">
      <div className="layout_top flex-between">
        <h5 className="font-xl fw-600">Variants and layers</h5>

        <button type="button">
          <Icon source={XIcon} tone="base" />
        </button>
      </div>

      <p className="fw-600">Variants</p>
      <button
        className="flex-between color-btn"
        onClick={() => setShowColors(!showColors)}
      >
        <Icon source={ColorIcon} tone="inherit" />
        <span className="text-sm font-medium">Color</span>
      </button>

      {showColors && (
        <>
          <h3 className="font-base color_label">T-Shirt Colors</h3>
          <InlineGrid gap="200" columns={5}>
            {TSHIRT_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setTshirtColor(color.value)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  tshirtColor === color.value
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </InlineGrid>
        </>
      )}

      <h4 className="layers_heading">Layers</h4>

      <div className="layer_container">
        {elements?.map((el) => (
          <div className="layer" key={el?.id}>
            <div className="flex-1 layer_col1">
              <Icon source={TextTitleIcon} tone="base" />
              <div className="layer_title">{el?.text}</div>
            </div>
            <div className="flex-between">
              <button
                type="button"
                className="del_icon"
                onClick={() => removeLayoutLayer(el?.id)}
              >
                <Icon source={DeleteIcon} tone="base" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layouts;
