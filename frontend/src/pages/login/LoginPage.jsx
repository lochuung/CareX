import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import ImageSlider from "../../components/global/ImageSlider/index";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

const LoginPage = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, isLogged, setIsLogged } = useUserStore(
    (state) => state
  );

  const [errorsSignIn, setErrorSignin] = useState({
    type: null,
    message: null,
  });
  const onFinish = async (values) => {
    toast.dismiss();
    let loginPromise = new Promise(async (resolve, reject) => {
      try {
        // Wait for 2 seconds
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values?.email,
              password: values?.password,
            }),
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
        // Get user data
        const userRes = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/user`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${data?.data?.access_token}`,
            },
          }
        );

        if (!userRes.ok) {
          throw new Error(`Error while trying to get user data`);
        }
        const userData = await userRes.json();
        setCurrentUser(userData?.data);
        setIsLogged(true);
        resolve(true);
      } catch (error) {
        reject({ message: error.message });
      }
    });

    toast.promise(
      loginPromise,
      {
        pending: "Login in progress... 🕐",
        success: {
          render() {
            navigate("/home");
            return `Welcome back!`;
          },
          icon: "👋",
        },

        error: {
          render({ data }) {
            return `${data.message}`;
          },
          icon: "😥",
        },
      },
      {
        position: "bottom-right",
      }
    );
  };

  return (
    <div className="h-screen">
      <div className="flex w-full h-full">
        <div className="side-left w-3/6 hidden lg:flex items-center justify-center flex-1 bg-white h-screen">
          <div className="w-full flex justify-center items-center h-full">
            <ImageSlider />
          </div>
        </div>

        <div className="w-3/6 bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Welcome back
            </h1>

            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
              CareX
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Stay healthy, stay strong.
            </h1>

            <Form
              onChange={() => {
                toast.dismiss();
              }}
              initialValues={{
                email: "",
                password: "",
              }}
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email can't be empty",
                  },
                ]}
              >
                <Input className="py-2" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password can't be empty",
                  },
                ]}
              >
                <Input.Password className="py-2" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button className="w-full" type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-4 text-sm text-gray-600 text-center flex justify-center items-center">
              <p className="">Haven't got an account?</p>
              <Link to="/signup" replace={true}>
                <p className="text-blue-600 ml-2">Let's be CareX user!</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
