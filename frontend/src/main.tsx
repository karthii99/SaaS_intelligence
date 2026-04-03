import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("🚀 App starting...");
console.log("🔗 API URL:", import.meta.env.VITE_API_URL || "not set");

createRoot(document.getElementById("root")!).render(<App />);
