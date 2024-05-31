import React, { useEffect, useState } from "react";
import { Avatar, Button } from "antd";

const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const UserProfile = ({ currentUser }) => {
  // Convert currentUser to a color by its hash
  const [currentColor, setCurrentColor] = useState(ColorList[0]);
  useEffect(() => {
    if (!currentUser) return;
    // Get only first character of the username
    let name = currentUser.split("")[0];
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let color = ColorList[hash % ColorList.length];
    setCurrentColor(color);
  }, [currentUser]);
  return (
    <>
      <div>Welcome back, {currentUser}!</div>
    </>
  );
};
export default UserProfile;
