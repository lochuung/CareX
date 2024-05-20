
import React from 'react'
import SidebarProfile from '@/components/SidebarProfile'

const ProfileLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-1/5 bg-gray-50 h-screen overflow-x-scroll'>
          <SidebarProfile />
        </div>
        <section className='flex min-h-screen flex-1 flex-col max-md:pb-14 sm:px-14'>
                <div className='w-full'>
                    {children}
                </div>
        </section>
    </div>
  )
}

export default ProfileLayout