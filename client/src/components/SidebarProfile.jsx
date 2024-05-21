"use client";
import React from 'react'
import { sidebarProfileLinks } from '@/constants';
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
const SidebarProfile = () => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div>
            <div className="text-center flex p-3 justify-center">
                <h1 className="text-blue-500 font-bold text-3xl">CareX</h1>
            </div>

            <div className="flex flex-col gap-3 px-4 mt-4">
                {sidebarProfileLinks?.map((item) => (
                <div
                    onClick={() => router.push(`${item?.link}/`)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md  cursor-pointer  ${pathname === item.link ||
                    pathname.startsWith(`${item.route}/`)
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    }`}
                    key={item?.name}
                >
                    <Image 
                        src={item.icon}
                        alt={item.name}
                        width={20}
                        height={20}
                    />
                    
                    <span className=" font-semibold">{item?.name}</span>
                </div>
                ))}
            </div>
        </div>
    )
}

export default SidebarProfile