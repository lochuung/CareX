import { Input, Space } from "antd";
const { Search } = Input;
import Collection from "./Collection";
import { useEffect, useState } from "react";

const YogaPage = () => {
  const [yogaExercises, setYogaExercises] = useState([]);

  const fetchExercise = async () => {
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
    setYogaExercises(data.data);
  };
  useEffect(() => {
    fetchExercise();
  }, []);
  return (
    <div className="h-screen">
      <Search
        className="w-full"
        placeholder="input search text"
        allowClear
        style={{
          width: 304,
        }}
      />
      {JSON.stringify(yogaExercises)}
    </div>
  );
};

export default YogaPage;
