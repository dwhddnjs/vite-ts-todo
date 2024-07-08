import React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  bgColor?: "gray" | "blue" | "red"
  size?: "sm" | "md" | "lg"
}

export const Button = ({
  children,
  bgColor = "gray",
  size = "md",
  className,
  ...rest
}: ButtonProps) => {
  const btnColor = {
    gray: `bg-gray-500 hover:bg-gray-600`,
    blue: `bg-blue-500 hover:bg-blue-600`,
    red: `bg-red-500 hover:bg-red-600`,
  }

  const btnSize = {
    sm: `py-1 px-2 text-sm`,
    md: `py-2 px-4 text-base`,
    lg: `py-2 px-6 text-lg`,
  }
  console.log("rest: ", { ...rest })

  return (
    <button
      className={`${btnColor[bgColor]} ${btnSize[size]} ml-2 text-white rounded ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
