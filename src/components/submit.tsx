import { Button, ButtonProps } from "./button"

export const Submit = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  )
}
