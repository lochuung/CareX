import Image from 'next/image'
import React from 'react'
import { myPlan } from '@/constants';
import { CalendarDays } from "lucide-react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const ChoosePlan = () => {
  return (
    <section className='flex min-h-screen flex-1 flex-col pt-6 max-md:pb-14 sm:px-14'>
      <div className='w-full space-y-8'>
        <h1 className='text-2xl font-bold'>Kế hoạch 🧾</h1>
        <div className='flex flex-col justify-center items-center space-y-4'>
          <h1 className='text-xl font-semibold italic'><span className='text-blue-600'>Plan</span> your life, <span className='text-blue-600'>Plan</span> your future</h1>
          <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {
              myPlan.map((item)=>{
                return (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                    <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 hover:bg-slate-100 ">
                      <div class="relative">
                        <div className='flex flex-row gap-2 items-center justify-between'>
                          <div className='flex flex-row gap-2 items-center'>
                            <Image src={item.imagePlan} width={40} height={40} alt={item.name} className='rounded-full border-2'/>
                            <div className='flex-col flex text-sm'>
                              <p className='font-semibold'>{item.name}</p>
                              <span className='text-slate-400'>@{item.username}</span>
                            </div>
                          </div>
                          <div className='text-xs flex flex-col justify-center items-center gap-2'>
                            <Image src={item.socialImage} alt='' width={15} height={15}/>
                            <span>{item.dateSend}</span>
                          </div>
                        </div>

                        <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <p class="text-gray-700 dark:text-gray-300">{item.content}</p>
                        </div>
                      </div>
                    </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@{item.username}</h4>
                          <p className="text-sm">
                            {item.content}
                          </p>
                          <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                              {item.dateSend}
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChoosePlan