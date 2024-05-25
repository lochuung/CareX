import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label";

const Input = React.forwardRef(({ className,placeholder,name,label, type, ...props }, ref) => {
  return (
    (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">{label}</Label>
        <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-[400px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props} />
      </div>
      )
  );
})
Input.displayName = "Input"

export { Input }
