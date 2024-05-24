import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Alert, Button, Form, Input, message } from "antd";
import ImageSlider from "../components/global/ImageSlider";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errorsSignIn, setErrorSignin] = useState({
    type: null,
    message: null,
  });
  const onFinish = async (values) => {
    console.log("Success:", values);

    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values?.email,
        password: values?.password,
      }),
    };

    try {
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

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      if (res.status === 400) {
        setErrorSignin({ type: "error", message: res?.error?.message });
      }

      const data = await res.json();
      console.log(data?.data?.access_token, "ad");
      localStorage.setItem("access_token", data?.data?.access_token);
      navigate("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  console.log(errorsSignIn, "error");

  return (
    <div className="h-screen">
      {errorsSignIn && (
        <div className="absolute top-4 right-4">
          <Alert type={errorsSignIn?.type}>{errorsSignIn?.message}</Alert>
        </div>
      )}
      <div className="flex w-full h-full">
        <div className="side-left w-3/6 hidden lg:flex items-center justify-center flex-1 bg-white h-screen">
          <div className="w-full flex justify-center items-center h-full">
            <ImageSlider />
          </div>
        </div>

        <div className="w-3/6 bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Welcome to our
            </h1>

            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
              CareX
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              We care about you and your health ❤️
            </h1>

            <Form
              initialValues={{
                email: "locn562836@gmail.com",
                password: "user",
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
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input className="py-2" placeholder="Nhập email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password className="py-2" placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Button className="w-full" type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-4 text-sm text-gray-600 text-center items-center">
              <p className="flex gap-1">
                Don't you have an account?
                <Button
                  type="text"
                  className="text-blue-600"
                  href="/auth/signup"
                >
                  Sign up here!
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
