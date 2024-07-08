import { Button } from "@components/button"
import { useMutation } from "@hooks/useMutation"
import { useState } from "react"

interface TodoInputProps {
  refetch: () => void
}

export const TodoInput = ({ refetch }: TodoInputProps) => {
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { trigger } = useMutation("/todos", {
    method: "POST",
  })

  const onAddTodo = async () => {
    setIsLoading(true)
    try {
      await trigger("POST", { title, done: false })
      refetch()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setTitle("")
    }
  }

  return (
    <div className="flex mb-4">
      <input
        className="flex-grow border-2 border-gray-300 p-2 rounded-l-lg focus:outline-none focus:border-orange-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        placeholder="할일을 입력하세요."
      />
      <Button
        type="button"
        bgColor="blue"
        onClick={onAddTodo}
        disabled={isLoading}
      >
        추가
      </Button>
    </div>
  )
}
