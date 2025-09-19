import React from "react";

import TshirtCanvasDesign from "./components/layout/TshirtCanvasDesign";

import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <div className="min-h-screen bg-gray-50 flex">
        <TshirtCanvasDesign />
      </div>
    </AppProvider>
  );
}

export default App;
