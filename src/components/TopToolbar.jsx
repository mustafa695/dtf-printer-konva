import { useDesignStore } from "../store/designStore";
import { Copy, Download, Trash2 } from "lucide-react";

const TopToolbar = ({
  selectedElement,
  stageRef,
  visibleRef,
  currentAction,
}) => {
  const { setElements, elements, selectedId, setSelectedId, designJson } =
    useDesignStore();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const deleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    setSelectedId(null);
  };

  const duplicateElement = (id) => {
    const element = elements.find((el) => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: generateId(),
        x: element.x + 20,
        y: element.y + 20,
      };
      setElements([...elements, newElement]);
      setSelectedId(newElement.id);
    }
  };

  const exportDesign = () => {
    let allElements = { ...designJson };
    // let dupElements = [...elements];

    let rightSeleevSet = designJson["ybcAuiuui4"];

    visibleRef.current = false;
    setSelectedId(null);

    let updateObjects = rightSeleevSet?.map((data) => ({
      ...data,
      x: -105, // example update
      y: -6.12,
      scaleX: 0.5003641830541712,
      scaleY: 0.5003641830541715,
      // width: 40,
      // height: 40,
    }));

    let newJson = { ...allElements, ybcAuiuui4: updateObjects || [] };

    const flatArray = Object.values(newJson).flat();

    if (flatArray?.length) {
      setElements([...flatArray]);
    }

    setTimeout(() => {
      const stage = stageRef.current;
      if (stage) {
        const dataURL = stage.toDataURL({
          mimeType: "image/png",
          quality: 1,
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = "dtf-design.png";
        link.href = dataURL;
        link.click();
      }

      setTimeout(() => {
        visibleRef.current = true;

        if (flatArray?.length) {
          let findPrevElements = designJson[currentAction];

          setElements([...findPrevElements]);
        }
      }, 500);
    }, 500);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="!text-2xl font-semibold text-gray-800">
          Design T-Shirt
        </h2>
        {selectedElement && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Selected:</span>
            <span className="font-medium capitalize">
              {selectedElement.type}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {selectedId && (
          <>
            <button
              onClick={() => duplicateElement(selectedId)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Duplicate"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={() => deleteElement(selectedId)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1" />
          </>
        )}
        <button
          onClick={exportDesign}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export PNG
        </button>
      </div>
    </div>
  );
};

export default TopToolbar;
