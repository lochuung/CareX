import Image from 'next/image'
import React from 'react'

const Notifications = () => {
  return (
    <section className='flex min-h-screen flex-1 flex-col pt-6 max-md:pb-14 sm:px-14'>
      <div className='w-full space-y-8'>
        <h1 className='text-2xl font-bold'>Thông báo 🔔</h1>
        <div className='flex flex-col justify-center items-center pt-8 space-y-4'>
          <Image src="/Icons/notification-pic.png" width={150} height={150}/>
          <h1 className='text-3xl font-bold'>No notifications yet</h1>
          <p>Your notification will appear here once you're received them.</p>
        </div>
      </div>
    </section>
  )
}

export default Notifications