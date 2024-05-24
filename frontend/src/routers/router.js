import {
  HomePage,
  Login,
  Signup,
  Workshop,
  WorkshopAdmin,
  Yoga,
  EditProfile,
  ChoosePlan,
  Notifications,
  PasswordAndSecurity,
} from "../pages";
import NotFound from "../pages/NotFound";

export const router = [
  { path: "/login", element: Login, isProtected: false },
  { path: "/signup", element: Signup, isProtected: false },
  { path: "/home", element: HomePage, actor: ["USER"], isProtected: true },
  { path: "/yoga", element: Yoga, actor: ["USER"], isProtected: true },
  { path: "/workshops", element: Workshop, actor: ["USER"], isProtected: true },

  // ============== ADMIN ================
  {
    path: "/admin/workshop",
    element: WorkshopAdmin,
    actor: ["ADMIN"],
    isProtected: true,
  },
  { path: "/edit-profile", element: EditProfile },
  { path: "/choose-plan", element: ChoosePlan },
  { path: "/notifications", element: Notifications },
  { path: "/password-security", element: PasswordAndSecurity },
];
