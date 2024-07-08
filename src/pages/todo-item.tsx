import { Button } from "@components/button"
import { Submit } from "@components/submit"
import { useMutation } from "@hooks/useMutation"
import { useState } from "react"
import { TodoTypes } from "types/todo-types"

interface TodoItemProps {
  item: TodoTypes
  refetch: () => void
}

export const TodoItem = ({ item, refetch }: TodoItemProps) => {
  const [isEdit, setEdit] = useState(false)
  const [title, setTitle] = useState(item.title)
  const { trigger } = useMutation(`/todos/${item.id}`)

  const onEditTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEdit(true)
  }

  const onUpdateTodo = async (data: Partial<TodoTypes>) => {
    try {
      await trigger("PATCH", { ...data })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  //   const onSaveTodo = async () => {
  //     try {
  //       await trigger("PATCH", { title })
  //       refetch()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  const onDeleteTodo = async () => {
    try {
      await trigger("DELETE")
    } catch (error) {
      console.log(error)
    }
  }

  const onCancel = () => {
    setTitle(item.title)
    setEdit(false)
  }

  return (
    <li className="flex justify-between p-2 border-b-2 border-gray-200">
      <form className="flex-grow flex items-center">
        {!isEdit ? (
          <span
            className={`cursor-pointer ${
              item.done ? "line-through text-gray-400" : ""
            }`}
            onClick={() => onUpdateTodo({ done: !item.done })}
          >
            {item.title}
          </span>
        ) : (
          <input
            className="flex-grow mr-4 border-2 border-gray-300 p-1"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            name="title"
            placeholder="내용을 입력하세요."
          />
        )}
        <div className="flex ml-auto">
          {!isEdit ? (
            <>
              <Button size="sm" onClick={onEditTodo}>
                수정
              </Button>
              <Submit bgColor="red" size="sm" onClick={onDeleteTodo}>
                삭제
              </Submit>
            </>
          ) : (
            <>
              <Submit
                size="sm"
                bgColor="blue"
                onClick={() => onUpdateTodo({ title })}
              >
                저장
              </Submit>
              <Button size="sm" onClick={onCancel}>
                취소
              </Button>
            </>
          )}
        </div>
      </form>
    </li>
  )
}
