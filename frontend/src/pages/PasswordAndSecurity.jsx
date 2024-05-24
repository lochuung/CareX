import React from 'react'
import { buttonPassS1, buttonPassS2 } from '../constants';
import DefaultLayoutProfile from "../layouts/DefaultLayoutProfile";
import { Button } from "antd";
const PasswordAndSecurity = () => {
  
  return (
    <DefaultLayoutProfile>
      <section className='flex min-h-screen flex-1 flex-col pt-6 max-md:pb-14 sm:px-14'>
        <div className='w-full space-y-8'>
          <h1 className='text-2xl font-bold'>Mật khẩu và bảo mật 🪪</h1>
          <div>
            <p className='text-lg font-semibold'>Đăng nhập & khôi phục</p>
            <span className='text-base'>Quản lý mật khẩu, tùy chọn đăng nhập và phương thức khôi phục</span>
          </div>
          <div className='flex flex-col justify-center w-full gap-2'>
            {
              buttonPassS1.map((item)=>{
                return(
                  <Button
                    key={item.name}
                    className='flex justify-between w-full bg-white text-black border-2 hover:bg-slate-100'
                  >
                    <span>{item.name}</span>
                    <image src="/Icons/right-arrow.png" width={20} height={20}/>
                  </Button>
                )
              })
            }
          </div>
          <div>
            <p className='text-lg font-semibold'>Kiểm tra bảo mật</p>
            <span className='text-base'>Xem xét các vấn đề bảo mật bằng cách chạy quy trình kiểm tra trên ứng dụng, thiết bị, và email đã gửi</span>
          </div>
          <div className='flex flex-col justify-center w-full gap-2'>
            {
              buttonPassS2.map((item)=>{
                return(
                  <Button
                    key={item.name}
                    className='flex justify-between w-full bg-white text-black border-2 hover:bg-slate-100'
                  >
                    <span>{item.name}</span>
                    <image src='/Icons/right-arrow.png' width={20} height={20}/>
                  </Button>
                )
              })
            }
          </div>
        </div>
      </section>
    </DefaultLayoutProfile>
    
  )
}

export default PasswordAndSecurity