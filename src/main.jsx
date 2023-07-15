import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { ChatContaxtProvider } from "./Context/ChatContaxt.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContaxtProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChatContaxtProvider>
  </AuthContextProvider>
);
