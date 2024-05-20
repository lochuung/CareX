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
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const router = useRouter();
  const setRole = useStore((state) => state.setRole);

  // Cấu hình form submit
  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Handle your form submission here
      console.log(values);
      if (
        values?.email === "user@gmail.com" &&
        values?.password === "user123"
      ) {
        setRole("user");
        setErrorSignin({ type: "success", message: "Logged in successfully." });
        setTimeout(() => {
          router.push("/home", { scroll: true });
        }, 1400);
      } else if (
        values?.email === "admin@gmail.com" &&
        values?.password === "admin123"
      ) {
        setRole("admin");
        setErrorSignin({
          type: "success",
          message: "Logged in successfully.",
        });
        setTimeout(() => {
          router.push("/admin/home", { scroll: true });
        }, 1400);
      } else {
        setErrorSignin({
          type: "error",
          message: "Email or password is incorrect.",
        });
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
