import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useAuth() {
  // const [user, setUser] = useState(undefined);
  // const [role, setRole] = useState(undefined);
  // const [loading, setLoading] = useState(false);

  // console.log(loading, "loading");
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setLoading(true);
  //     const token = localStorage?.getItem("access_token");
  //     console.log(token, "token");
  //     if (token) {
  //       try {
  //         const options = {
  //           method: "GET",
  //           headers: {
  //             Accept: "*/*",
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         };

  //         const res = await fetch(
  //           `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/user`,
  //           options
  //         );

  //         if (!res.ok) {
  //           throw new Error(`HTTP error! status: ${res.status}`);
  //         }

  //         const data = await res.json();
  //         if (res.status === 200) {
  //           console.log(data);

  //           dispatch({ type: "CURRENT_USER", payload: data });
  //           setUser(data?.data);

  //           const role = data?.data?.roles[0]?.name;
  //           console.log(role);
  //           setRole(role);
  //           setLoading(false);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       window.location.href("/login");
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return { user, role, loading };
}

export default useAuth;
