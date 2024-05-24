import React, {useState} from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { DatePicker, Space, Button, Select, Divider, Collapse } from 'antd';
const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
const Calories = () => {
    const [items, setItems] = useState(['Ít hoặc không tập thể dục', 'Tập thể dục nhẹ nhàng 1-3 ngày/tuần','Tập thể dục trung bình 3-5 ngày mỗi tuần','Tập thể dục nặng 6-7 ngày mỗi tuần', 'Chế độ tập thể dục thách thức']);
    const infoHealth = [
        {
            label: 'Chỉ số BMI là gì? - Định nghĩa chỉ số cơ thể BMI',
            children: <p>Chỉ số khối cơ thể (BMI) là phép đo trọng lượng của một người tương ứng với chiều cao của người đó. Chỉ số BMI có thể cho thấy bạn đang có mức cân nặng bình thường so với chiều cao hay béo phì, thừa cân, thiếu cân hay suy dinh dưỡng.</p>,
        },
        {
            label: 'Giải thích chỉ số BMI',
            children: <p>Đối với người lớn từ 20 tuổi trở lên, BMI được tính bằng cách sử dụng các phân loại trạng thái cân nặng tiêu chuẩn. Các chuẩn này giống nhau với nam giới và phụ nữ ở mọi thể trạng và lứa tuổi.


            Đối với trẻ em và thanh thiếu niên, BMI phân biệt theo tuổi và giới tính và thường được gọi là BMI theo tuổi. Ở trẻ em, lượng chất béo trong cơ thể cao có thể dẫn đến các bệnh liên quan đến cân nặng và các vấn đề sức khỏe khác. Thiếu cân cũng có thể tăng nguy cơ mắc một số tình trạng sức khỏe, bệnh lý.
            
            
            Chỉ số BMI cao thường cho thấy cơ thể thừa cân. Chỉ số này không trực tiếp đo lượng mỡ trong cơ thể nhưng có tương quan với các phép đo trực tiếp xác định lượng mỡ trong cơ thể.</p>,
        },
        {
            label: 'Công thức tính BMI là gì?',
            children: <p>Bạn có thể kiểm tra chỉ số BMI của mình bằng cách sử dụng chiều cao và trọng lượng cơ thể. Để tính chỉ số BMI của một người trưởng thành, hãy chia trọng lượng (theo kg) cho bình phương chiều cao (theo m) hay BMI = (trọng lượng cơ thể)/ (chiều cao x chiều cao)


            Đối với người lớn, chỉ số BMI từ 18,5-24,9 nằm trong mức cân nặng bình thường hoặc khỏe mạnh. Chỉ số BMI từ 25,0 trở lên là thừa cân, trong khi chỉ số BMI dưới 18,5 là thiếu cân.</p>,
        },
        {
            label: 'Tại sao bạn nên biết về chỉ số BMI',
            children: <p>Biết được chỉ số BMI của bạn cho phép bạn kiểm soát tỷ lệ chất béo trong cơ thể tương quan với chiều cao, cũng như biết được nguy cơ hình thành một số vấn đề sức khỏe liên quan. Chỉ số BMI cao có thể dẫn đến nguy cơ thừa cân, trong đó không loại trừ khả năng mắc bệnh tiểu đường type 2, bệnh tim và tăng huyết áp.


            Hiểu về chỉ số BMI cho phép bạn và chuyên gia y tế chăm sóc sức khỏe của bạn tốt hơn.</p>,
        },
        {
            label: 'Chỉ số BMI cao có gây nguy hiểm nghiêm trọng đến sức khỏe không?',
            children: <p>Đo BMI có thể là một công cụ sàng lọc nhưng không dùng chẩn đoán tình trạng béo phì hoặc sức khỏe cá nhân. Để xác định chỉ số BMI có tiềm ẩn một nguy cơ ảnh hưởng sức khỏe hay không, bác sĩ hay các chuyên gia y tế sẽ cần thực hiện thêm những đánh giá khác như đo độ dày nếp gấp da, đánh giá chế độ ăn uống, hoạt động thể chất và tiền sử gia đình.</p>,
        },
        {
            label: 'Những nguy cơ gây béo phì bạn cần nắm',
            children: <p>Nếu bạn có chỉ số BMI từ 30,0 trở lên, kết quả này được phân loại là béo phì.


            Béo phì có ảnh hưởng đến cơ thể và những người béo phì có nguy cơ tử vong cao hơn bình thường do dễ mắc một số tình trạng sức khỏe như:
            
            <br/>– Bệnh tiểu đường type 2
            
            <br/>– Cholesterol LDL cao, cholesterol HDL thấp hoặc mức lipid máu không tốt cho sức khỏe (mỡ trong máu)
            
            <br/>– Bệnh tim mạch vành
            
            <br/>– Đột quỵ
            
            <br/>– Bệnh túi mật
            
            <br/>– Viêm xương khớp
            
            <br/>– Ngưng thở khi ngủ và các vấn đề về hô hấp
            
            <br/>– Tình trạng viêm mãn tính và tăng stress oxy hóa
            
            <br/>– Ung thư
            
            <br/>– Trầm cảm, rối loạn lo âu và các tình trạng sức khỏe tâm thần khác</p>,
        },
        {
            label: 'Những nguy cơ gây thiếu cân bạn cần nắm',
            children: <p>Nếu chỉ số BMI của bạn dưới 18,5, bạn đang thiếu cân so với chiều cao của mình.


            Khi mức cân nặng thấp hơn nhiều so với trọng lượng lý tưởng, bạn cũng có nguy cơ mắc các bệnh khác do thiếu dinh dưỡng và hệ miễn dịch kém, chẳng hạn như:
            
            <br/>– Suy dinh dưỡng
            
            <br/>– Thiếu máu
            
            <br/>– Loãng xương do thiếu canxi và vitamin D
            
            <br/>– Các vấn đề về khả năng sinh sản do chu kỳ kinh nguyệt không đều
            
            <br/>– Nguy cơ biến chứng hậu phẫu thuật cao hơn
            
            <br/>– Thấp còi và các vấn đề về phát triển khác ở trẻ em và thanh thiếu niên</p>,
        },
        {
            label: 'Chỉ số BMI có phải là một chỉ số tốt để đánh giá lượng mỡ trong cơ thể?',
            children: <p>Mặc dù chỉ số BMI và lượng mỡ có thể có mối tương quan chặt chẽ nhưng không có nghĩa 2 người cùng chỉ số BMI sẽ có cùng lượng mỡ trong cơ thể.

            Sự khác biệt có thể phụ thuộc vào tạng người, tuổi tác, giới tính và mức độ hoạt động thể chất. Ngay cả ở cùng một chỉ số BMI, các vận động viên sẽ có lượng mỡ cơ thể ít hơn những người không phải là vận động viên; người lớn tuổi sẽ có lượng mỡ nhiều hơn những người trẻ tuổi; phụ nữ thường có lượng mỡ nhiều hơn nam giới.</p>,
        },
    ]
    return (
        <DefaultLayout>
            <section >
                <h1 className='text-xl font-bold w-full'>Tính chỉ số BMI - Chỉ số khối cơ thể</h1>
                <div className='flex flex-row gap-3'>
                    <div className='left-side pt-8 text-sm font-semilbold space-y-6 w-3/6'>
                        <div className='flex flex-col gap-2'>
                            <p>Ngày sinh của bạn</p>
                            <div className='w-full flex justify-center items-center'>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <DatePicker onChange={onChange} style={{ width: '100%'}}/>
                                </Space>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Giới tính của bạn</p>
                            <div className='flex justify-center items-center flex flex-row'>
                                <Button value="large" block className='flex flex-row justify-center items-center'>
                                    <FcBusinessman style={{width: '50px', height: '20px'}}/>
                                    <span className='text-sm font-semibold'>Nam</span>
                                </Button>
                                <Button value="large" block className='flex flex-row justify-center items-center'>
                                    <FcBusinesswoman style={{width: '50px', height: '20px'}}/>
                                    <span className='text-sm font-semibold'>Nữ</span>
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Chiều cao của bạn (cm)</p>
                            <input type='number' className='border border-gray-300 p-2 rounded-md'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Cân nặng của bạn (kg)</p>
                            <input type='number' className='border border-gray-300 p-2 rounded-md'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Chọn cường độ hoạt động thể chất của bạn</p>
                            <div className='flex flex flex-row'>
                            <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Cường độ tập thể dục của bạn"
                                    dropdownRender={(menu) => (
                                        <>
                                        {menu}
                                        <Divider
                                            style={{
                                            margin: '8px 0',
                                            }}
                                        />
                                        <Space
                                            style={{
                                            padding: '0 8px 4px',
                                            }}
                                        >
                                        </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({
                                        label: item,
                                        value: item,
                                    }))}
                                    />
                            </div>
                        </div>
                        <Button value="large" block type='primary'>Tính ngay</Button>
                    </div>
                    <div className='right-side pl-10 w-3/6 pt-8'>
                        <div>
                            <p className='flex flex-row justify-center items-center text-base font-semibold text-blue-500 static'><IoIosInformationCircleOutline style={{width: '40px', height: '20px'}}/> Thông tin</p>
                            <div>
                                <Collapse defaultActiveKey={['1']} accordion ghost items={infoHealth} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </DefaultLayout>
    )
}

export default Calories