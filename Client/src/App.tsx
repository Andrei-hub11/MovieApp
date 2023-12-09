import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { theme } from "./Theme/Theme.tsx";
import { routes } from "./utils/variables/array_routes.tsx";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;

