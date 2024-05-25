import React from "react";
import ProfileContent from "@/components/ProfileContent";
import DefaultLayout from "@/layouts/DefaultLayout";

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="w-full h-screen">
        <ProfileContent />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
