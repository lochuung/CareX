"use client";
import React from 'react'
import { sidebarProfileLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';

const SidebarProfile = () => {
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between max-sm:hidden lg:w-[264] border-2'>
        <div className='flex flex-col text-slate-500 gap-2'>
            {
                sidebarProfileLinks.map((link)=>{
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className='flex gap-4 items-center p-4 justify-start hover:bg-slate-100 '
                        >
                            <Image
                                src={link.imgUrl}
                                alt={link.label}
                                width={20}
                                height={20}
                            />
                                <p className='text-base font-semibold max-lg:hidden'>
                                    {link.label} 
                                </p>
                        </Link>
                    )
                })
            }
        </div>
    </section>
  )
}

export default SidebarProfile