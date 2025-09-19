import { create } from "zustand";

export const useDesignStore = create((set) => ({
  elements: [],
  selectedId: null,
  tshirtColor: "#FFFFFF",

  designJson: {},

  // Actions
  setTshirtColor: (color) => set({ tshirtColor: color }),
  setSelectedId: (id) => set({ selectedId: id }),
  setElements: (elements) => set({ elements }),
  setDesignJson: (designJson) => set({ designJson }),

}));
