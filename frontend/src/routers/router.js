import {
  HomePage,
  Login,
  Signup,
  Workshop,
  WorkshopAdmin,
  Yoga,
} from "../pages";
import NotFound from "../pages/NotFound";

export const router = [
  { path: "/login", element: Login, isProtected: false },
  { path: "/signup", element: Signup, isProtected: false },
  { path: "/", element: HomePage, actor: ["USER"], isProtected: true },
  { path: "/yoga", element: Yoga, actor: ["USER"], isProtected: true },
  { path: "/workshops", element: Workshop, actor: ["USER"], isProtected: true },
  { path: "*", element: NotFound, isProtected: false },

  // ============== ADMIN ================
  {
    path: "/admin/workshop",
    element: WorkshopAdmin,
    actor: ["ADMIN"],
    isProtected: true,
  },
];
