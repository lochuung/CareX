"use client"

import React, { useState } from 'react'
import {format} from 'date-fns/format'
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from './label'

export function DatePicker({date, setDate}) {
    var value = date
    function convertDateDisplay(value) {
        if (value) {
            return format(value, 'P'); // Format using 'P' format string
        }
        else {
            return <span>Pick a date</span>; // Display placeholder when no value is available
        }
    }
    return (
        <div>
            <Label>Date of Birth</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[400px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {convertDateDisplay(value)}
                    
                    {/* <span>{value.}</span> */}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(value) => {
                        setDate(value);
                    }}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear ={2024}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
