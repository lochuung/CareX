"use client";
import React, { useRef } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "antd";
import { Button } from "antd";
import { Image } from "antd";
import { inputProfile } from "../constants";
import DefaultLayoutProfile from "../layouts/DefaultLayoutProfile";
const EditProfile = () => {
  const inputRef = useRef(null);

  const loginSchema = yup.object().shape({
    fastname: yup.string(),
    lastname: yup.string(),
    //dateofbirth: yup.date().required("Date of birth is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password must be at least 8 characters"),
  });
  const formik = useFormik({
    initialValues: {
      fastname: "",
      lastname: "",
      email: "",
      number: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Handle your form submission here
      //console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <DefaultLayoutProfile>
      <main className="relative">
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col pt-6 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <div className="avatar flex flex-col items-center space-x-4 justify-center">
              <Image
                src={""}
                alt={""}
                width={150}
                height={150}
                className="rounded-full border-2"
              />
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="pt-6 space-y-6 items-center"
            >
              <div className="grid grid-cols-2 gap-6 pl-12">
                {inputProfile.map((input) => {
                  var valueInput = input.label;
                  return (
                    <div>
                      <span>{input.label}</span>
                      <Input
                        onChange={formik.handleChange}
                        key ={input.label}
                        value={formik.values.valueInput}
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  className="w-[300px] bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-300"
                >
                  {" "}
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
      </main>
    </DefaultLayoutProfile>
  );
};

export default EditProfile;
