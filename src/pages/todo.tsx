import { useFetch } from "@hooks/useFetch"
import { TodoInput } from "@pages/todo-input"
import { TodoList } from "@pages/todo-list"
import { TodoTypes } from "types/todo-types"

export const Todo = () => {
  const { data, refetch } = useFetch<TodoTypes[]>("/todos")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Todo List</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TodoInput refetch={refetch} />
        <TodoList data={data} refetch={refetch} />
      </div>
    </div>
  )
}
