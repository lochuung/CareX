import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { router } from "./routers/router";
import useAuth from "./hooks/useAuth";
import ProtectedRouter from "./routers/ProtectedRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((item) => {
          const Component = item.element;
          return (
            <Route
              path={item.path}
              key={item.path}
              element={
                item.isProtected ? (
                  <Component />
                ) : (
                  <ProtectedRouter baseRole={item?.actor}>
                    <Component />
                  </ProtectedRouter>
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
