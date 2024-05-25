import React, { useEffect, useState } from "react";
import { Alert, Button, DatePicker, Form, Input } from "antd";
import { Bounce, toast } from "react-toastify";

import ImageSlider from "../../components/global/ImageSlider/index";
import { formatDate } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

const ProfilePage = () => {
  const getInformation = useUserStore((state) => state.getInformation);
  const [errorsSignup, setErrorSignup] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    (async () => {
      await getInformation();
    })();
  }, []);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    toast.dismiss();
    let finishPromise = new Promise(async (resolve, reject) => {
      let access_token = localStorage.getItem("access_token");
      if (values?.password !== values?.confirmPassword) {
        setErrorSignup({
          type: "error",
          message: "Password and confirm password do not match",
        });
        return;
      }
      // remove roles field
      const options = {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          fullName: values.fullName,
          birthday: formatDate(values.birthday, "DD/MM/YYYY"),
        }),
      };

      try {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/user/update`,
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
          await getInformation();
          resolve(true);
        }
      } catch (error) {
        reject("Internal server error");
      }
    });
    toast.promise(
      finishPromise,
      {
        pending: "Updating your account 🕐",
        success: {
          render() {
            return `Successfully updated!`;
          },
          icon: "✅",
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

  const [form] = Form.useForm();

  const currentUser = useUserStore((state) => state.currentUser);
  useEffect(() => {
    // set iit val
    form.setFieldsValue({
      email: currentUser.email,
      fullName: currentUser.fullName,
      birthday: dayjs(currentUser.birthday, "DD/MM/YYYY"),
    });
  }, [currentUser]);

  return (
    <div className="h-screen">
      <div className="flex w-full h-full">
        <div className="w-full bg-gray-100 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Update your information
            </h1>

            <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
              CareX
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Stay healthy, stay strong.
            </h1>

            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              form={form}
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
                <Input disabled className="py-2" placeholder="Your email" />
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

              <Form.Item>
                <Button className="w-full" type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
