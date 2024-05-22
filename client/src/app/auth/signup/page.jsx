"use client";
import Image from "next/image";
import React from "react";

import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import ImageSlider from "@/components/ImageSlider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datetimepicker";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
const SignUpPage = (props) => {
  const router = useRouter();
  const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    //dateofbirth: yup.date().required("Date of birth is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password must be at least 6 characters"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Your passwords do not match."),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      dateofbirth: new Date(),
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const [month, day, year] = values?.dateofbirth.split("/");
      const birthday = `${day}/${month}/${year}`;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/v1/auth/register`,
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values?.email,
              password: values?.password,
              fullName: values?.username,
              birthday: birthday,
              confirmPassword: values?.passwordConfirmation,
            }),
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);
        if (data?.status === 200) {
          router.push("/auth/signin");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    },
  });
  return (
    <div className="h-screen">
      {/* Thông báo */}
      {/* <div className="toast toast-top toast-end">
            <div className="alert alert-info">
            <span>New mail arrived.</span>
            </div>
        </div> */}
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

              {/* Name */}
              <Input
                onChange={formik.handleChange}
                label="Full Name"
                value={formik.values.username}
                name="username"
                type="text"
                className="username-input"
                placeholder="Harry Potter"
              />
              {/* Error username */}
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.username}
                </div>
              ) : null}

              {/* DateOfBirth */}
              {/* <DatePicker/> */}
              {/* <Input onChange={formik.handleChange}
                            label="Date of Birth"
                            value={formik.values.dateofbirth}
                            name="dateofbirth"
                            type="date"
                            className = "dateofbirth-input"
                            placeholder=""/> */}
              <DatePicker
                date={formik.values.dateofbirth}
                setDate={(value) => {
                  formik.setFieldValue("dateofbirth", format(value, "P"));
                }}
              />
              {/* <Field name="date" timezone={DefaultTz} component={DatePicker} /> */}
              {/* Error date of birth */}
              {/* {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                            <div className="text-red-500 text-sm">
                            {formik.errors.dateofbirth}
                            </div>
                        ) : null} */}
              {/* Email */}

              {/* Password */}
              <Input
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Password"
                name="password"
                type="password"
                className="password-input"
                placeholder="password"
              />

              {/* Error password */}
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}

              {/* Password Confirm*/}
              <Input
                onChange={formik.handleChange}
                label="Password Confirm"
                name="passwordConfirmation"
                type="password"
                className="password-confitm"
                placeholder="Confirm your password"
              />
              {formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.passwordConfirmation}
                </div>
              ) : null}
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-300"
              >
                {" "}
                Sign Up
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p className="flex gap-1">
                Already have an account?
                <Link className="text-blue-600" href="/auth/signin">
                  Sign in here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
