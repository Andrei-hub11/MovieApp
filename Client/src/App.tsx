import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { theme } from "./Theme/Theme.tsx";
import { routes } from "./utils/variables/array_routes.tsx";

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
    </ThemeProvider>
  );
}

export default App;

