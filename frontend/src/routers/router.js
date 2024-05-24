import { HomePage, Login, Signup, Workshop, Yoga } from "../pages";

export const router = [
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
  { path: "/", element: HomePage },
  { path: "/yoga", element: Yoga },
  { path: "/workshops", element: Workshop },
];
