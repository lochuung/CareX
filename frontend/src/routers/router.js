import { HomePage, Login, Signup, Workshop, Yoga, EditProfile, ChoosePlan, Notifications, PasswordAndSecurity, Calories, BMIResult } from "../pages";

export const router = [
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
  { path: "/food", element: Calories },
  { path: "/", element: HomePage },
  { path: "/bmiresult", element: BMIResult },
  { path: "/workshop", element: Workshop },
  { path: "/yoga", element: Yoga },
  { path: "/edit-profile", element: EditProfile },
  { path: "/choose-plan", element: ChoosePlan },
  { path: "/notifications", element: Notifications },
  { path: "/password-security", element: PasswordAndSecurity },
  
];
