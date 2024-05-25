import {
  HomePage,
  ProfilePage,
  UserWorkShopPage,
  DietPage,
  YogaPage,
  BMIResult,
} from "../pages";

export const router = [
  { path: "/", element: HomePage, actor: ["USER"], isProtected: true },
  { path: "/home", element: HomePage, actor: ["USER"], isProtected: true },
  { path: "/yoga", element: YogaPage, actor: ["USER"], isProtected: true },
  {
    path: "/workshop",
    element: UserWorkShopPage,
    actor: ["USER"],
    isProtected: true,
  },
  {
    path: "/diet",
    element: DietPage,
    actor: ["USER"],
    isProtected: true,
  },
  {
    path: "/bmiresult",
    element: BMIResult,
    actor: ["USER"],
    isProtected: true,
  },
  {
    path: "/profile",
    element: ProfilePage,
    actor: ["USER"],
    isProtected: true,
  },

  // ============== ADMIN ================
  // {
  //   path: "/admin/workshop",
  //   element: WorkshopAdmin,
  //   actor: ["ADMIN"],
  //   isProtected: true,
  // },
  // { path: "/choose-plan", element: ChoosePlan },
  // { path: "/notifications", element: Notifications },
  // { path: "/password-security", element: PasswordAndSecurity },
];
