import { Avatar, Table, Tabs, Tag, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import PageHeading from "../../components/global/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { formatDate } from "../../utils/utils";
import { useUserStore } from "../../store/user";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Flip, toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
const WorkshopDetail = () => {
  const [data, setData] = useState([]);
  const currentUser = useUserStore((state) => state.currentUser);
  const [reload, setReload] = useState(false);

  const checkRoleMenu = useMemo(() => {
    const emailHost = data?.hostName;
    const emailLocal = currentUser?.email;

    let isTrue;
    emailHost === emailLocal ? (isTrue = true) : (isTrue = false);
    return isTrue;
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDataWorkshop = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/workshops/${id}`,
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

  const handleReload = () => {
    setReload(!reload);
  };

  console.log(data, "==");

  if (data?.length === 0) {
    return <Loading />;
  }

  const itemsUser = [
    {
      key: 1,
      title: "Thông tin Workshop",
      children: (
        <InfoWorkshop
          data={data}
          currentUser={currentUser}
          isCheckRole={checkRoleMenu}
          reload={handleReload}
        />
      ),
    },
  ];

  const itemsAdmin = [
    {
      key: 1,
      label: "Thông tin Workshop",
      children: (
        <InfoWorkshop
          data={data}
          currentUser={currentUser}
          isCheckRole={checkRoleMenu}
          reload={handleReload}
        />
      ),
    },
    {
      key: 2,
      label: "Danh sách thành viên",
      children: (
        <ListUserInWorkshop
          data={data}
          currentUser={currentUser}
          isCheckRole={checkRoleMenu}
        />
      ),
    },
  ];
  let items;
  checkRoleMenu ? (items = itemsAdmin) : (items = itemsUser);

  return (
    <div className="">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-2 rounded-md bg-blue-400 text-white font-bold flex hover:bg-blue-500 items-center gap-2 mb-4"
      >
        <IoMdArrowRoundBack className="inline-block" />
        Quay lại
      </button>
      <PageHeading title={data?.name} />
      <div className="">
        <Tabs
          defaultActiveKey="1"
          size={5}
          style={{
            marginBottom: 32,
          }}
          items={items}
        />
      </div>
    </div>
  );
};

const InfoWorkshop = ({ data, isCheckRole, currentUser, reload }) => {
  const checkJoined = useMemo(() => {
    return data?.userJoins?.some((item) => item?.email === currentUser?.email);
  }, [data, currentUser]);
  const [isJoin, setIsJoin] = useState(checkJoined);

  //   const isCheckTime = useMemo(() => {
  //     let value;
  //     const now = new Date();
  //     const startTime = new Date(data?.startTime);
  //     const endTime = new Date(data?.endTime);
  //     now <= startTime
  //       ? (value = "not")
  //       : now >= endTime
  //       ? (value = "finished")
  //       : (value = "now");
  //     return value;
  //   }, []);

  const isCheckTime = "not";

  const handleJoin = async (checkJoined, id) => {
    const toastId = toast.loading("Chờ ghi danh ...");
    console.log(checkJoined);
    try {
      if (checkJoined) {
        alert("Bạn đã tham gia rồi");
      } else {
        const token = localStorage.getItem("access_token");
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/workshops/${id}/join`,
          {
            method: "POST",
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
        if (res?.status === 200) {
          setIsJoin(true);
          const data = await res.json();
          console.log(data, "data");
          toast.update(toastId, {
            render: "Bạn đã ghi danh thành công",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            transition: Flip,
          });
          reload();
        }
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "Đã có lỗi xảy ra khi ghi danh, bạn hãy thử lại",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        transition: Flip,
      });
    }
  };

  return (
    <div className="">
      <div className="flex flex-col justify-between gap-3">
        <div className=" flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="mt-4 w-1/2">
              <img
                src="https://i.pinimg.com/564x/16/89/bc/1689bcf22a03911bf3115f71b0103f33.jpg"
                alt=""
                className="w-full h-[300px] object-cover rounded-xl"
              />
            </div>

            <div className="w-1/2 h-[300px]">
              {isCheckTime === "not" ? (
                <div className="bg-gray-100 shadow-lg shadow-gray-300 rounded-md p-4 h-full flex items-center justify-center gap-3 flex-col">
                  <h1 className="font-bold text-lg text-center ">
                    Ngày mở Workshop: {formatDate(data?.startTime)}
                  </h1>
                  {isCheckRole === false && (
                    <button
                      disabled={checkJoined}
                      onClick={() => handleJoin(checkJoined, data?.id)}
                      className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold text-lg"
                    >
                      {checkJoined ? "Đã tham gia" : "Tham gia"}
                    </button>
                  )}
                </div>
              ) : isCheckTime === "finished" ? (
                <div className="bg-red-100 shadow-lg shadow-red-300 rounded-md p-4 h-full flex items-center justify-center gap-3 flex-col">
                  <h1 className="font-bold text-lg text-red-500">
                    Sự kiện đã kết thúc, cám ơn bạn đã quan tâm
                  </h1>
                </div>
              ) : (
                <div className="bg-lime-50 shadow-lg shadow-lime-200 rounded-md p-4 h-full flex items-center justify-center gap-3 flex-col">
                  <h1 className="font-bold text-lg text-green-500">
                    Sự kiện đang diễn ra
                  </h1>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col my-3 p-3 gap-2">
            <p className="text-gray-800 text-lg font-semibold">
              {data?.nameWorkshop}
            </p>

            <Tag
              color="lime-inverse"
              className="w-fit capitalize text-md font-semibold"
            >
              Chủ đề: {data?.category}
            </Tag>

            <div className="">
              <Avatar.Group
                maxCount={data?.totalPeople || 5}
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                <Avatar
                  style={{
                    backgroundColor: "#f56a00",
                  }}
                >
                  K
                </Avatar>
                <Tooltip title="Ant User" placement="top">
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <Avatar
                  style={{
                    backgroundColor: "#1677ff",
                  }}
                  icon={<AntDesignOutlined />}
                />
              </Avatar.Group>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-600 text-lg font-medium">Địa chỉ:</p>
              <p className="whitespace-pre-line font-semibold">
                {data?.address}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-600 flex items-center gap-1 text-lg font-medium whitespace-nowrap">
                Mô tả Workshop:
              </p>
              <p className=" whitespace-pre-line font-semibold">
                {data?.description}
              </p>
            </div>

            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListUserInWorkshop = ({ data, isCheckRole }) => {
  const columns = [
    {
      title: "STT",
      render: (_, __, index) => {
        return <div className="">{index + 1}</div>;
      },
    },
    {
      key: "fullName",
      dataIndex: "fullName",
      title: "Name User",
    },

    {
      key: "email",
      dataIndex: "email",
      title: " Email",
    },
  ];
  return (
    <div className="w-[800px]">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <p className="text-gray-800 text-lg font-semibold">Thành viên</p>
          <Tag
            color="geekblue-inverse"
            className="text-gray-800 text-lg font-semibold"
          >
            {data?.totalPeople}
          </Tag>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">
            Danh sách thành viên đã đăng ký tham gia Workshop
          </h1>
          <Table dataSource={data?.userJoins} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetail;
