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
import { format } from "date-fns"
const SignUpPage = (props) => {
    const loginSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        //dateofbirth: yup.date().required("Date of birth is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .required("Password must be at least 8 characters"),
        passwordConfirmation : yup
            .string()
            .oneOf([yup.ref('password'), null], 'Your passwords do not match.')
  });
;
const formik = useFormik({
    initialValues: {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        dateofbirth: new Date(),
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
        // Handle your form submission here
        //console.log(values);
        alert(JSON.stringify(values, null, 2))
    },
});
  return (
    <div>
        {/* Thông báo */}
        {/* <div className="toast toast-top toast-end">
            <div className="alert alert-info">
            <span>New mail arrived.</span>
            </div>
        </div> */}
        <div className="flex h-screen w-full">
            <div className="side-left w-3/6 hidden lg:flex items-center justify-center flex-1 bg-white h-screen">
                <div className="w-full flex justify-center items-center h-screen">
                    <ImageSlider/>
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
                        {/* Name */}   
                        <Input onChange={formik.handleChange}
                            label="Fullname"
                            value={formik.values.username}
                            name="username"
                            type="text"
                            className = "username-input"
                            placeholder="Harry Potter"/>
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
                        <DatePicker date={formik.values.dateofbirth} setDate={(value)=> {
                            formik.setFieldValue("dateofbirth", format(value, "P"))
                        }}/>
                        {/* <Field name="date" timezone={DefaultTz} component={DatePicker} /> */}
                        {/* Error date of birth */}
                        {/* {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                            <div className="text-red-500 text-sm">
                            {formik.errors.dateofbirth}
                            </div>
                        ) : null} */}
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

                        {/* Password Confirm*/}
                        <Input onChange={formik.handleChange}
                            label="Password Confirm"
                            name="passwordConfirmation"
                            type="password"
                            className = "password-confitm"
                            placeholder="Confirm your password"
                        />
                        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                            <div className="text-red-500 text-sm">
                            {formik.errors.passwordConfirmation}
                            </div>
                        ) : null}
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-300"
                            > Sign Up
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
