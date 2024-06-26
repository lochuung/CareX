import React, { useEffect, useMemo, useState } from "react";
// import { empty, not } from "../utils/Images";
import {
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Tabs,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageHeading from "../../components/global/PageHeading";
import { empty, not } from "../../utils/Image";
import WorkshopItem from "./WorkshopItem";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../hooks/useFirebase";
import { formatDate } from "../../utils/utils";
import { Flip, toast } from "react-toastify";
import { dataWorkshop } from "../../constants/categoryWorkshop";

const UserWorkShopPage = () => {
  const isAccess = true;
  const [reload, setReload] = useState(false);

  const [action, setAction] = useState({ createWorkshop: false });
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputSearch, setInputSearch] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedItem(value);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputSearch(value);
    // Now you can use 'value' for your search logic
  };

  const filterData = useMemo(() => {
    let result = [...data];

    if (selectedItem) {
      result = result.filter((item) => item?.category === selectedItem);
    }

    if (inputSearch) {
      result = result.filter((item) =>
        item?.name.toLowerCase().includes(inputSearch.toLowerCase())
      );
    }

    return result;
  }, [selectedItem, inputSearch]);

  console.log(inputSearch, "input");
  useEffect(() => {
    const fetchDataWorkshop = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/workshops`,
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
  }, [reload]);

  const handleAction = (type) => {
    setAction({ [type]: !action[type] });
  };

  const handleNewWorkshop = () => {
    handleAction("createWorkshop");
    setReload(!reload);
  };

  console.log(data, "data");

  const items = [
    {
      label: "Danh sách hiện có",
      key: 1,
      // children: <WorkshopItem data={data} />,
      children: "",
    },
    {
      label: "Workshop của tôi",
      key: 2,
      // children: <WorkshopItem data={data} />,
      children: "",
    },
  ];
  return (
    <>
      <PageHeading
        title="Workshops"
        desc="Bạn có thể tạo các buổi workshop của riêng mình"
      />
      <div className="">
        <div className="my-4">
          {/* <Tabs
            defaultActiveKey="1"
            size={4}
            type="card"
            style={{
              marginBottom: 32,
            }}
            items={items}
          /> */}
        </div>
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
            <div className="my-4 w-full justify-end flex items-center gap-3">
              <div className="">
                <Select onChange={handleSelectChange} className="w-[250px]">
                  {dataWorkshop?.map((item) => (
                    <Select.Option key={item?.id} value={item?.name}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="w-[400px]">
                <Input
                  onChange={handleInputChange}
                  placeholder="Tìm kiếm Workshop"
                  className=""
                />
              </div>

              <div className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold">
                <button onClick={() => handleAction("createWorkshop")}>
                  Tạo workshop
                </button>
              </div>
            </div>
            {data?.length > 0 ? (
              //   Có dữ liệu
              <div className="flex justify-start flex-wrap gap-4">
                {selectedItem !== null && selectedItem !== "Tất cả" ? (
                  filterData?.length === 0 ? (
                    <div className="flex items-center flex-col gap-3 justify-center w-full">
                      <img
                        src="https://i.pinimg.com/564x/77/66/72/7766726589ece0d7c133eaf6e87d2b6e.jpg"
                        width={400}
                        height={400}
                        alt="No Workshops"
                      />
                      <h1 className="text-lg">
                        Không có Workshop nào trong danh mục này
                      </h1>
                    </div>
                  ) : (
                    filterData?.map((item, index) => (
                      <WorkshopItem key={index} {...item} />
                    ))
                  )
                ) : (
                  data?.map((item, index) => (
                    <WorkshopItem key={index} {...item} />
                  ))
                )}
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
    </>
  );
};

const FormCreateWorkshop = ({ onNewWorkshop }) => {
  const onFinish = async (values) => {
    const toastId = toast.loading("Pending Create Workshop ...");
    console.log("Success:", values);

    if (!file) return;

    const storageRef = ref(storage, `images/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function can be added here if needed
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          console.log(downloadURL, "image");

          const token = localStorage.getItem("access_token");
          console.log(token, "token");

          fetch(
            `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/workshops/create`,
            {
              method: "POST",
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                name: values.nameWorkshop,
                startTime: values?.timeWorkshop[0],
                endTime: values?.timeWorkshop[1],
                imageUrl: downloadURL,
                address: values.address,
                category: "heath",
                description: values.descriptionWorkshop,
              }),
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => {
              console.log(data, "data");
              toast.update(toastId, {
                render: "Bạn đã tạo thành công Workshop",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                transition: Flip,
              });
              onNewWorkshop();
            })
            .catch((error) => {
              console.error(error);
              toast.update(toastId, {
                render: "Đã có lỗi xảy ra khi tạo Workshop",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                transition: Flip,
              });
            });
        });
      }
    );
  };

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const { RangePicker } = DatePicker;

  const { TextArea } = Input;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
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
        <Form.Item name="image" valuePropName="fileList">
          <input type="file" onChange={handleChange} />
        </Form.Item>

        <h1 className="my-1 text-gray-900 font-semibold">Thể loại</h1>
        <Form.Item
          name="category"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Select>
            {dataWorkshop?.map((item) => (
              <Select.Option value={item?.name} key={item?.id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
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
            <RangePicker showTime className="w-full" />
          </Form.Item>
        </div>

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

export default UserWorkShopPage;
