import React, { useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import RadioGroup from "../../components/RadioGroup";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space, Button, Select, Divider, Collapse } from "antd";
import { useUserStore } from "../../store/user";
import dayjs from "dayjs";
import CustomSlider from "./CustomSlider";
import useDietStore from "../../store/diet";

const DietPage = () => {
  let activities = [
    "Little/no exercise",
    "Light exercise",
    "Moderate exercise (3-5 days/wk)",
    "Very active (6-7 days/wk)",
    "Extra active (very active & physical job)",
  ];
  let plans = [
    "Maintain weight",
    "Mild weight loss",
    "Weight loss",
    "Extreme weight loss",
  ];
  const infoHealth = [
    {
      label: "Chỉ số BMI là gì? - Định nghĩa chỉ số cơ thể BMI",
      children: (
        <p>
          Chỉ số khối cơ thể (BMI) là phép đo trọng lượng của một người tương
          ứng với chiều cao của người đó. Chỉ số BMI có thể cho thấy bạn đang có
          mức cân nặng bình thường so với chiều cao hay béo phì, thừa cân, thiếu
          cân hay suy dinh dưỡng.
        </p>
      ),
    },
    {
      label: "Giải thích chỉ số BMI",
      children: (
        <p>
          Đối với người lớn từ 20 tuổi trở lên, BMI được tính bằng cách sử dụng
          các phân loại trạng thái cân nặng tiêu chuẩn. Các chuẩn này giống nhau
          với nam giới và phụ nữ ở mọi thể trạng và lứa tuổi. Đối với trẻ em và
          thanh thiếu niên, BMI phân biệt theo tuổi và giới tính và thường được
          gọi là BMI theo tuổi. Ở trẻ em, lượng chất béo trong cơ thể cao có thể
          dẫn đến các bệnh liên quan đến cân nặng và các vấn đề sức khỏe khác.
          Thiếu cân cũng có thể tăng nguy cơ mắc một số tình trạng sức khỏe,
          bệnh lý. Chỉ số BMI cao thường cho thấy cơ thể thừa cân. Chỉ số này
          không trực tiếp đo lượng mỡ trong cơ thể nhưng có tương quan với các
          phép đo trực tiếp xác định lượng mỡ trong cơ thể.
        </p>
      ),
    },
    {
      label: "Công thức tính BMI là gì?",
      children: (
        <p>
          Bạn có thể kiểm tra chỉ số BMI của mình bằng cách sử dụng chiều cao và
          trọng lượng cơ thể. Để tính chỉ số BMI của một người trưởng thành, hãy
          chia trọng lượng (theo kg) cho bình phương chiều cao (theo m) hay BMI
          = (trọng lượng cơ thể)/ (chiều cao x chiều cao) Đối với người lớn, chỉ
          số BMI từ 18,5-24,9 nằm trong mức cân nặng bình thường hoặc khỏe mạnh.
          Chỉ số BMI từ 25,0 trở lên là thừa cân, trong khi chỉ số BMI dưới 18,5
          là thiếu cân.
        </p>
      ),
    },
    {
      label: "Tại sao bạn nên biết về chỉ số BMI",
      children: (
        <p>
          Biết được chỉ số BMI của bạn cho phép bạn kiểm soát tỷ lệ chất béo
          trong cơ thể tương quan với chiều cao, cũng như biết được nguy cơ hình
          thành một số vấn đề sức khỏe liên quan. Chỉ số BMI cao có thể dẫn đến
          nguy cơ thừa cân, trong đó không loại trừ khả năng mắc bệnh tiểu đường
          type 2, bệnh tim và tăng huyết áp. Hiểu về chỉ số BMI cho phép bạn và
          chuyên gia y tế chăm sóc sức khỏe của bạn tốt hơn.
        </p>
      ),
    },
    {
      label: "Chỉ số BMI cao có gây nguy hiểm nghiêm trọng đến sức khỏe không?",
      children: (
        <p>
          Đo BMI có thể là một công cụ sàng lọc nhưng không dùng chẩn đoán tình
          trạng béo phì hoặc sức khỏe cá nhân. Để xác định chỉ số BMI có tiềm ẩn
          một nguy cơ ảnh hưởng sức khỏe hay không, bác sĩ hay các chuyên gia y
          tế sẽ cần thực hiện thêm những đánh giá khác như đo độ dày nếp gấp da,
          đánh giá chế độ ăn uống, hoạt động thể chất và tiền sử gia đình.
        </p>
      ),
    },
    {
      label: "Những nguy cơ gây béo phì bạn cần nắm",
      children: (
        <p>
          Nếu bạn có chỉ số BMI từ 30,0 trở lên, kết quả này được phân loại là
          béo phì. Béo phì có ảnh hưởng đến cơ thể và những người béo phì có
          nguy cơ tử vong cao hơn bình thường do dễ mắc một số tình trạng sức
          khỏe như:
          <br />– Bệnh tiểu đường type 2
          <br />– Cholesterol LDL cao, cholesterol HDL thấp hoặc mức lipid máu
          không tốt cho sức khỏe (mỡ trong máu)
          <br />– Bệnh tim mạch vành
          <br />– Đột quỵ
          <br />– Bệnh túi mật
          <br />– Viêm xương khớp
          <br />– Ngưng thở khi ngủ và các vấn đề về hô hấp
          <br />– Tình trạng viêm mãn tính và tăng stress oxy hóa
          <br />– Ung thư
          <br />– Trầm cảm, rối loạn lo âu và các tình trạng sức khỏe tâm thần
          khác
        </p>
      ),
    },
    {
      label: "Những nguy cơ gây thiếu cân bạn cần nắm",
      children: (
        <p>
          Nếu chỉ số BMI của bạn dưới 18,5, bạn đang thiếu cân so với chiều cao
          của mình. Khi mức cân nặng thấp hơn nhiều so với trọng lượng lý tưởng,
          bạn cũng có nguy cơ mắc các bệnh khác do thiếu dinh dưỡng và hệ miễn
          dịch kém, chẳng hạn như:
          <br />– Suy dinh dưỡng
          <br />– Thiếu máu
          <br />– Loãng xương do thiếu canxi và vitamin D
          <br />– Các vấn đề về khả năng sinh sản do chu kỳ kinh nguyệt không
          đều
          <br />– Nguy cơ biến chứng hậu phẫu thuật cao hơn
          <br />– Thấp còi và các vấn đề về phát triển khác ở trẻ em và thanh
          thiếu niên
        </p>
      ),
    },
    {
      label:
        "Chỉ số BMI có phải là một chỉ số tốt để đánh giá lượng mỡ trong cơ thể?",
      children: (
        <p>
          Mặc dù chỉ số BMI và lượng mỡ có thể có mối tương quan chặt chẽ nhưng
          không có nghĩa 2 người cùng chỉ số BMI sẽ có cùng lượng mỡ trong cơ
          thể. Sự khác biệt có thể phụ thuộc vào tạng người, tuổi tác, giới tính
          và mức độ hoạt động thể chất. Ngay cả ở cùng một chỉ số BMI, các vận
          động viên sẽ có lượng mỡ cơ thể ít hơn những người không phải là vận
          động viên; người lớn tuổi sẽ có lượng mỡ nhiều hơn những người trẻ
          tuổi; phụ nữ thường có lượng mỡ nhiều hơn nam giới.
        </p>
      ),
    },
  ];
  const navigate = useNavigate();

  const currentUser = useUserStore((state) => state.currentUser);

  const AgeCalculate = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const stringToDate = (str) => {
    // date format is dd/mm/yyyy
    const parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const [currentDate, setCurrentDate] = useState(currentUser.birthday);

  useEffect(() => {
    setCurrentDate(currentUser.birthday);
  }, []);

  const [selectGoal, setSelectGoal] = useState("Maintain weight");
  const [selectActivity, setSelectActivity] = useState("Little/no exercise");

  const [currentSex, setCurrentSex] = useState("Male");
  const [currentHeight, setCurrentHeight] = useState(170);
  const [currentWeight, setCurrentWeight] = useState(65);
  const [mealsPerDay, setMealsPerDay] = useState(3);

  return (
    //<DefaultLayout>
    <>
      <section>
        <h1 className="text-xl font-bold w-full">Diet Recommediation</h1>
        <div className="flex flex-row gap-3">
          <div className="left-side pt-8 text-sm font-semilbold space-y-6 w-3/6">
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2 items-center">
                <p>Birthdate</p>
                <span className="p-2 border-[1px] text-white bg-blue-600 rounded-xl">
                  {AgeCalculate(stringToDate(currentDate))} years old
                </span>
              </div>

              <div className="w-full flex justify-center items-center">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <DatePicker
                    defaultValue={dayjs(currentUser.birthday, "DD/MM/YYYY")}
                    onChange={(value) => {
                      // Convert value to string date for mat dd/mm/yyyy
                      setCurrentDate(dayjs(value).format("DD/MM/YYYY"));
                    }}
                    style={{ width: "100%" }}
                  />
                </Space>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-start gap-4 items-center">
                <p>Sex</p>
                <RadioGroup
                  options={[
                    {
                      label: "Male",
                      value: "Male",
                    },
                    {
                      label: "Female",
                      value: "Female",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Your height (cm)</p>
              <input
                defaultValue={150}
                value={currentHeight}
                onChange={(e) => setCurrentHeight(e.target.value)}
                type="number"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Weight (kg)</p>
              <input
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                type="number"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p>Activity level</p>
              <div className="flex  flex-row">
                <Select
                  style={{
                    width: "100%",
                  }}
                  defaultValue={selectActivity}
                  onChange={(value) => {
                    setSelectActivity(value);
                  }}
                  placeholder="Give CareX your activity level"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      ></Space>
                    </>
                  )}
                  options={activities.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Meals per day</p>
              <div className="flex  flex-row">
                <CustomSlider
                  min={1}
                  max={4}
                  onChange={(value) => {
                    setMealsPerDay(value);
                  }}
                  inputValue={mealsPerDay}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Tell CareX your goal</p>
              <div className="flex  flex-row">
                <Select
                  style={{
                    width: "100%",
                  }}
                  defaultValue={selectGoal}
                  onChange={(value) => {
                    setSelectGoal(value);
                  }}
                  placeholder="What's your goal"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      ></Space>
                    </>
                  )}
                  options={plans.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>
            </div>
            <Button
              value="large"
              block
              type="primary"
              onClick={() => {
                // Collect all information
                let data = {
                  age: AgeCalculate(stringToDate(currentDate)),
                  height: currentHeight,
                  weight: currentWeight,
                  gender: currentSex,
                  activity: selectActivity,
                  meals_calories_perc: 0,
                  weight_loss: selectGoal,
                };

                // Save to store
                const setPerson = useDietStore.getState().setPerson;
                setPerson(data);
                navigate("/bmiresult");
              }}
            >
              Get recommendation
            </Button>

            <div className="pt-6">
              <p className="flex flex-row text-base font-semibold text-blue-500 items-center pb-2">
                <IoIosInformationCircleOutline
                  style={{ width: "40px", height: "20px" }}
                />
                Be awakeness!
              </p>
              <p>
                CareX is only tool for recommendation. We need more time to
                upgrade our system to meet healthcare standard in the future.
              </p>
            </div>
          </div>
          <div className="right-side pl-10 w-3/6 pt-8">
            <div>
              <p className="flex flex-row justify-center items-center text-base font-semibold text-blue-500">
                <IoIosInformationCircleOutline
                  style={{ width: "40px", height: "20px" }}
                />
                Information (sources collection from many platform by CareX
                team)
              </p>
              <div>
                <Collapse
                  defaultActiveKey={["1"]}
                  accordion
                  ghost
                  items={infoHealth}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DietPage;
1;
