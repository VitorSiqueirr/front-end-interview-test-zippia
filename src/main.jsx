import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { ErrorProvider } from "./contexts/provider/ErrorProvider.jsx";
import { UserProvider } from "./contexts/provider/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorProvider>
  </StrictMode>
);
