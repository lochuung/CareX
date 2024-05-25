export const sidebarProfileLinks = [
    {
      name: "Edit Profile",
      icon: "/Icons/edit.png",
    },
    {
      name: "Notifications",
      icon: "/Icons/notification.png",
    },
    {
      name: "Choose Plan",
      icon: "/Icons/chooseplan.png",
    },
    {
      name: "Password & Security",
      icon: "/Icons/security.png",
    },
  ];
  export const inputProfile = [
    {
      label: "Fast Name",
      value: "{formik.values.fastname}",
      type: "text",
      name: "fastname",
      placeholder: "Your fast name",
      touched: "formik.touched.fastname",
      errors: "formik.errors.fastname",
    },
    {
      label: "Last Name",
      value: "{formik.values.lastname}",
      type: "text",
      name: "lastname",
      placeholder: "Your last name",
      touched: "formik.touched.lastname",
      errors: "formik.errors.lastname",
    },
    {
      label: "Email",
      value: "{formik.values.email}",
      type: "email",
      name: "email",
      placeholder: "Your email",
      touched: "formik.touched.email",
      errors: "formik.errors.email",
    },
    {
      label: "Contacts Number",
      value: "{formik.values.number}",
      type: "text",
      name: "number",
      placeholder: "How can we contact you ?",
      touched: "formik.touched.number",
      errors: "formik.errors.number",
    },
    {
      label: "Address",
      value: "{formik.values.address}",
      type: "text",
      name: "address",
      placeholder: "Where do you live?",
      touched: "formik.touched.address",
      errors: "formik.errors.address",
    },
    {
      label: "City",
      value: "{formik.values.city}",
      type: "text",
      name: "city",
      placeholder: "Ex: Amsterdam,....",
      touched: "formik.touched.city",
      errors: "formik.errors.city",
    },
    {
      label: "State",
      value: "{formik.values.state}",
      type: "text",
      name: "state",
      placeholder: "Ex: New York,....",
      touched: "formik.touched.state",
      errors: "formik.errors.state",
    },
    {
      label: "Zip code",
      value: "{formik.values.zipcode}",
      type: "text",
      name: "zipcode",
      placeholder: "Ex: 11357,....",
      touched: "formik.touched.zipcode",
      errors: "formik.errors.zipcode",
    },
    {
      label: "Country",
      value: "{formik.values.country}",
      type: "text",
      name: "country",
      placeholder: "Ex: United States,....",
      touched: "formik.touched.country",
      errors: "formik.errors.country",
    },
    {
      label: "Password",
      value: "{formik.values.password}",
      type: "password",
      name: "password",
      placeholder: "********",
      touched: "formik.touched.password",
      errors: "formik.errors.password",
    },
  ];
  import { FiHome, FiSettings } from "react-icons/fi";
  import { GrWorkshop, GrYoga } from "react-icons/gr";
  // export const menuUser = [
  //   {
  //     name: "Trang chủ",
  //     //icon: <FiHome />,
  //     link: "/home",
  //   },
  //   { name: "Workshops", icon: <GrWorkshop /> },
  //   { name: "Yoga", icon: <GrYoga /> },
  //   { name: "Cài đặt", icon: <FiSettings /> },
  // ];
  
  export const buttonPassS1 = [
    {
      name: "Đổi mật khẩu",
    },
    {
      name: "Xác thực 2 yếu tố",
    },
    {
      name: "Thông tin đăng nhập đã lưu",
    },
  ];
  export const buttonPassS2 = [
    {
      name: "Nơi bạn đăng nhập",
    },
    {
      name: "Cảnh báo đăng nhập",
    },
    {
      name: "Email gần đây",
    },
    {
      name: "Kiểm tra bảo mật",
    },
  ];
  export const myPlan = [
    {
      imagePlan: "/PlanPictures/yoga.png",
      name: "Yoga Practice",
      username: "yogaeveryday",
      socialImage: "/Icons/twitter.png",
      dateSend: "20 May 2024",
      content:
        "Practice yoga everyday will make you have a better health and body. Let's practice with us",
    },
    {
      imagePlan: "/PlanPictures/dailymeal.png",
      name: "Daily Meal",
      username: "dailymeal",
      socialImage: "/Icons/twitter.png",
      dateSend: "21 May 2024",
      content:
        "It's time for eating and enjoying the meal we plan for you today. We have egg, salad, 2 breads and sausages",
    },
    {
      imagePlan: "/PlanPictures/fitness.png",
      name: "It's Gym time",
      username: "fitnesswithus",
      socialImage: "/Icons/twitter.png",
      dateSend: "19 May 2024",
      content:
        "I’ve heard that you’ve made significant progress in your fitness journey. Any tips or advice you can share?",
    },
    {
      imagePlan: "/PlanPictures/lunchbag.png",
      name: "Lunch's Time",
      username: "dailymeal",
      socialImage: "/Icons/twitter.png",
      dateSend: "19 May 2024",
      content:
        "It's time to have lunch with us. We have some juice, secret bag and an orange for you. Let see what you got in bag today friend!",
    },
  ];
  