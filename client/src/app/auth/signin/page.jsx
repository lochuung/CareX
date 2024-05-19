"use client";
import Image from "next/image";
import React from "react";

import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { signin } from "@/app/utils/Images";
import { Input } from "@/components/ui/input";

const SignInPage = () => {
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Handle your form submission here
      console.log(values);
    },
  });

  return (
    <div>
      <div className="toast toast-top toast-end">
        <div className="alert alert-info">
          <span>New mail arrived.</span>
        </div>
      </div>
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <Image src={signin} />
          </div>
        </div>

        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Sign In
            </h1>

            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
              CareX
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              No Pain No Gain :))
            </h1>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Email */}
              <Input onChange={formik.handleChange}
                label="Email"
                value={formik.values.email}
                name="email"
                type="email"
                className = "email-input"
                placeholder="abc@gmail.com"/>

              {/* Error email */}
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}

              {/* Password */}
              <Input onChange={formik.handleChange}
                value={formik.values.password}
                label="Password"
                name="password"
                type="password"
                className = "password-input"
                placeholder="********"
              />

              {/* Error password */}
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-300"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p className="flex gap-1">
                No account?
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
