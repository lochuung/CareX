import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { useUserStore } from "../store/user";

const ProtectedRouter = ({ baseRole, children }) => {
  // const { loading } = useAuth();
  // const { currentUser } = useUserStore((state) => state);

  // if (loading && user !== undefined) {
  //   return <Loading />;
  // }
  // const navigate = useNavigate();
  // console.log(role, "role auth");
  // useEffect(() => {
  //   if (!baseRole?.includes(role) && role !== undefined) {
  //     navigate("/notfound");
  //   }
  // }, [baseRole, role]);

  return children;
};

export default ProtectedRouter;
