import { HomePage, Login, Signup, Workshop, Yoga } from "../pages";

export const router = [
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
  { path: "/home", element: HomePage },
  { path: "/workshop", element: Workshop },
  { path: "/yoga", element: Yoga },
];
