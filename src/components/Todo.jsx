import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Todo() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [openTodo, setOpenTodo] = useState(false)
  const todoHandler = e => {
    if (
      (e.key === 'Enter' || e.keyCode === 13) &&
      newTodo !== '' &&
      !todos.includes(newTodo)
    ) {
      const newTodos = [
        ...todos,
        { id: uuidv4(), title: newTodo, completed: false },
      ]
      setTodos(newTodos)
      localStorage.setItem('todos', JSON.stringify(newTodos))
      setNewTodo('')
    }
  }
  const deleteTodo = deletedTodo => {
    const filteredTodo = [...todos].filter(todo => deletedTodo !== todo)
    localStorage.setItem('todos', JSON.stringify(filteredTodo))
    setTodos(filteredTodo)
  }

  const updateTodo = id => {
    const todoTobeUpdated = todos.find(todo => id === todo.id)
    todoTobeUpdated.completed = !todoTobeUpdated.completed
    const updatedTodos = [
      ...todos.filter(todo => todo.id !== id),
      todoTobeUpdated,
    ]
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    todos ? setTodos(todos) : setTodos([])
  }, [])

  return (
    <div>
      {openTodo && (
        <div className=" flex flex-col items-start gap-2 bg-slate-800 w-64 absolute bottom-16 right-8 p-2 rounded-md">
          <p className="cursor-pointer underline underline-offset-8">
            All Todos
          </p>
          <span></span>
          <div className="overflow-y-auto max-h-96 flex flex-col gap-2">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-2 break-all w-56 text-left"
                style={
                  todo.completed
                    ? { textDecoration: 'line-through' }
                    : { textDecoration: 'none' }
                }>
                <input
                  type="checkbox"
                  name={todo.title}
                  value={todo.title}
                  id={todo.title}
                  onClick={() => updateTodo(todo.id)}
                />
                <label htmlFor={todo.title}>{todo.title}</label>
                <div className="ml-auto pr-2">
                  <i
                    className="fa-solid fa-trash cursor-pointer"
                    onClick={() => deleteTodo(todo)}></i>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            name=""
            value={newTodo}
            placeholder="New Todo"
            className="focus:outline-none bg-transparent border-b-2 p-0"
            onChange={e => setNewTodo(e.target.value)}
            onKeyPress={e => todoHandler(e)}
          />
        </div>
      )}
      <div
        onClick={() => setOpenTodo(!openTodo)}
        className="cursor-pointer text-xl absolute bottom-4 right-24 underline underline-offset-8">
        Todo
      </div>
    </div>
  )
}
