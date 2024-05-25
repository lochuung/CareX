export const fetchYogaWorkouts = async () => {
  const access_token = localStorage.getItem("access_token");
  const res = await fetch(
    `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/yoga-workouts`,
    {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (res.status === 400) {
    throw new Error(`Email or password is incorrect`);
  }
  if (!res.ok) {
    throw new Error(`Error while trying to login`);
  }
  const data = await res.json();
  localStorage.setItem("access_token", data?.data?.access_token);
};
