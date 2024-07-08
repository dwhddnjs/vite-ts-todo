import { TodoTypes } from "types/todo-types"
import { TodoItem } from "./todo-item"

interface TodoListProps {
  data: TodoTypes[] | null
  refetch: () => void
}

export const TodoList = ({ data, refetch }: TodoListProps) => {
  const items = data?.map((item) => <TodoItem item={item} refetch={refetch} />)

  return <ul>{items}</ul>
}
