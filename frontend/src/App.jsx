import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import ProtectedRouter from "./routers/ProtectedRouter";

import { useUserStore } from "./store/user";
import NotFound from "./pages/NotFound";

import { router } from "./routers/router";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  const isLogged = useUserStore((state) => state.isLogged);
  console.log(isLogged, "isLogged");
  return (
    <Routes>
      {!isLogged ? (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
      {isLogged && (
        <Route path="/" element={<DefaultLayout />}>
          {router.map((item) => {
            const Component = item.element;
            return (
              <Route
                path={item.path}
                key={item.path}
                element={
                  !item.isProtected ? (
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
        </Route>
      )}
    </Routes>
  );
}

export default App;
