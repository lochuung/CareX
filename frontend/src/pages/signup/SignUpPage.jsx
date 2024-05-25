import React, { useState } from "react";
import { Alert, Button, DatePicker, Form, Input } from "antd";

import ImageSlider from "../../components/global/ImageSlider/index";
import { formatDate } from "../../utils/utils";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [errorsSignup, setErrorSignup] = useState({
    type: null,
    message: null,
  });
  const onFinish = async (values) => {
    if (values?.password !== values?.confirmPassword) {
      setErrorSignup({
        type: "error",
        message: "Password and confirm password do not match",
      });
      return;
    }

    console.log(formatDate(values?.birthday), "birthday");

    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values?.email,
        password: values?.password,
        fullName: values?.fullName,
        birthday: formatDate(values?.birthday),
        confirmPassword: values?.confirmPassword,
      }),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth/register`,
        options
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      if (res.status === 400) {
        setErrorSignup({ type: "error", message: res?.error?.message });
      }

      const data = await res.json();

      if (res?.status === 200) {
        alert(data?.data?.access_token);
        setErrorSignup({ type: "success", message: res?.body?.message });
        localStorage.setItem("access_token", data?.data?.access_token);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  console.log(errorsSignup, "error");

  return (
    <div className="h-screen">
      {errorsSignup?.message !== null && (
        <div className="absolute top-4 right-4">
          <Alert type={errorsSignup?.type}>{errorsSignup?.message}</Alert>
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
              Happy to see you here!
            </h1>

            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
              CareX
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Stay healthy, stay strong.
            </h1>

            <Form name="basic" onFinish={onFinish} autoComplete="off">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input className="py-2" placeholder="Your email" />
              </Form.Item>

              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input className="py-2" placeholder="Full name" />
              </Form.Item>

              <Form.Item
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please input your birth date",
                  },
                ]}
              >
                <DatePicker className="py-2 w-full" />
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
                <Input.Password className="py-2" placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                ]}
              >
                <Input.Password
                  className="py-2"
                  placeholder="Confirm password"
                />
              </Form.Item>

              <Form.Item>
                <Button className="w-full" type="primary" htmlType="submit">
                  Sign up now
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-4 text-sm text-gray-600 text-center flex justify-center items-center">
              <p className="">Already have an account?</p>
              <Link to="/login" replace={true}>
                <p className="text-blue-600 ml-2">Login here !</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
