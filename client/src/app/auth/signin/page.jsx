"use client";
import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { signin } from "@/app/utils/Images";
import { Input } from "@/components/ui/input";
import ImageSlider from "@/components/ImageSlider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/Alert";
import { useStore } from "@/store/store";

const SignInPage = () => {
  const [errorsSignIn, setErrorSignin] = useState({
    type: null,
    message: null,
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const router = useRouter();
  const setRole = useStore((state) => state.setRole);

  // Cấu hình form submit
  const formik = useFormik({
    initialValues: {
      email: "admin@huuloc.id.vn",
      password: "admin",
    },
    validationSchema: loginSchema,

    onSubmit: async (values) => {
      // Handle your form submission here
      try {
        const res = await fetch(`http://localhost:8000/api/v1/auth/login`, {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values?.email,
            password: values?.password,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data?.data?.access_token, "ad");
        localStorage.setItem("access_token", data?.data?.access_token);
        localStorage.setItem("refresh_token", data?.data?.refresh_token);

        router.push("/");
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
  });

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

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <Input
                onChange={formik.handleChange}
                label="Email"
                value={formik.values.email}
                name="email"
                type="email"
                className="email-input"
                placeholder="abc@gmail.com"
              />

              {/* Error email */}
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}

              {/* Password */}
              <Input
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Password"
                name="password"
                type="password"
                className="password-input"
                placeholder="********"
              />

              {/* Error password */}
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}

              <Button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-300"
              >
                {" "}
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p className="flex gap-1">
                Don't you have an account?
                <Link className="text-blue-600" href="/auth/signup">
                  Sign up here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
