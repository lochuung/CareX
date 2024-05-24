import React, { useEffect, useState } from "react";
// import { empty, not } from "../utils/Images";
import { DatePicker, Drawer, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DefaultLayout from "../layouts/DefaultLayout";
import PageHeading from "../components/global/PageHeading";
import { empty, not } from "../utils/Image";
const Workshop = () => {
  const isAccess = true;

  const [action, setAction] = useState({ createWorkshop: false });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataWorkshop = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/workshops/all`,
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data, "data");
        setData(data?.data);
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    };
    fetchDataWorkshop();
  }, []);

  const handleAction = (type) => {
    setAction({ [type]: !action[type] });
  };

  const handleNewWorkshop = (newWorkshopData) => {
    // Handle new workshop data here
    console.log(newWorkshopData);
    setData([...data, newWorkshopData]);
  };

  return (
    <DefaultLayout>
      <PageHeading
        title="Workshops"
        desc="Bạn có thể tạo các buổi workshop của riêng mình"
      />
      <div className="">
        {!isAccess ? (
          <div className="flex items-center flex-col gap-3">
            <img src={not} width={400} height={400} />

            <h1 className="text-lg ">
              Bạn không được cấp quyền tạo Workshop, vui lòng liên hệ Admin để
              biết thêm chi tiết
            </h1>

            <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 text-lg">
              Liên hệ
            </button>
          </div>
        ) : (
          <div className="w-full">
            <div className="my-4 w-full justify-end flex">
              <div className="w-[400px]">
                <Input placeholder="Tìm kiếm Workshop" className="" />
              </div>
            </div>
            {data?.length > 0 ? (
              //   Có dữ liệu
              <div className="flex justify-start flex-wrap gap-4">
                {data?.map((item, index) => (
                  <WorkshopItem key={index} {...item} />
                ))}
              </div>
            ) : (
              //   Không có dữ liệu
              <div className="flex items-center flex-col gap-3">
                <img src={empty} width={400} height={400} />

                <h1 className="text-lg ">
                  Bạn chưa có tạo buổi Workshop nào, hãy tạo ngay thôi nào
                </h1>

                <button
                  onClick={() => handleAction("createWorkshop")}
                  className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 text-lg"
                >
                  Tạo Workshop
                </button>
              </div>
            )}
          </div>
        )}

        <Drawer
          width={600}
          title="Create Workshop"
          open={action.createWorkshop}
          onClose={() => handleAction("createWorkshop")}
        >
          <FormCreateWorkshop onNewWorkshop={handleNewWorkshop} />
        </Drawer>
      </div>
    </DefaultLayout>
  );
};

const FormCreateWorkshop = ({ onNewWorkshop }) => {
  const onFinish = (values) => {
    console.log("Success:", values);

    onNewWorkshop(values);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const { RangePicker } = DatePicker;
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const { TextArea } = Input;
  return (
    <div className="">
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <h1 className="my-1 text-gray-900 font-semibold">Tên Workshop</h1>
        <Form.Item
          name="nameWorkshop"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <h1 className="my-1 text-gray-900 font-semibold">Ảnh Workshop</h1>
        <Form.Item name="image">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        <h1 className="my-1 text-gray-900 font-semibold">Địa chỉ diễn ra</h1>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex items-center gap-2 w-full justify-between">
          <div className="">
            <h1 className="my-1 text-gray-900 font-semibold">Thời gian</h1>
            <Form.Item
              name="timeWorkshop"
              rules={[
                {
                  required: true,
                  message: "Please input your time workshop!",
                },
              ]}
            >
              <RangePicker showTime />
            </Form.Item>
          </div>

          <div className="">
            <h1 className="my-1 text-gray-900 font-semibold">Số người</h1>
            <Form.Item
              name="countMember"
              rules={[
                {
                  required: true,
                  message: "Please input your quantity member!",
                },
              ]}
            >
              <InputNumber
                style={{ width: "200px" }}
                className="flex-1 w-[500px]"
              />
            </Form.Item>
          </div>
        </div>

        <h1 className="my-1 text-gray-900 font-semibold">Giá vé</h1>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your time price!",
            },
          ]}
          name="priceWorkshop"
        >
          <Input />
        </Form.Item>
        <h1 className="my-1 text-gray-900 font-semibold">Nội dung Workshop</h1>
        <Form.Item name="descriptionWorkshop">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 text-lg"
          >
            Tạo Workshop
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Workshop;
