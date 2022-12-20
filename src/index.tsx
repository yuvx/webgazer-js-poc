import reactDom from "react-dom/client";
import { App } from "./App";

window.addEventListener("DOMContentLoaded", () => {
  const root = reactDom.createRoot(document.getElementById("app")!);

  root.render(<App />);
});
