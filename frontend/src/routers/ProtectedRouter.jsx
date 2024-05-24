import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const ProtectedRouter = ({ baseRole, children }) => {
  const { user, loading, role } = useAuth();

  if (loading && user !== undefined) {
    return <Loading />;
  }
  const navigate = useNavigate();
  console.log(role, "role auth");
  useEffect(() => {
    if (!baseRole?.includes(role) && role !== undefined) {
      navigate("/notfound");
    }
  }, [baseRole, role]);

  return baseRole?.includes(role) ? children : null;
};

export default ProtectedRouter;
