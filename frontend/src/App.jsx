import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { router } from "./routers/router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((item) => {
          const Component = item?.element;
          return (
            <Route path={item.path} key={item?.path} element={<Component />} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
