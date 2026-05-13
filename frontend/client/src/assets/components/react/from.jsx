import Todo from './Todo.jsx'
import { useState } from 'react'

const From = () => {
    const[todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    
    const handleClick = () => {
        if(todo.trim() === ""){
            return
        }
        setTodos([...todos, {todo}])
        setTodo("")
    }
    
    const handleChange = (e) => setTodo(e.target.value)
    
    const deletetodo = (index) => {
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>   
            <input 
                type="text" 
                name="todo" 
                value={todo}
                onChange={handleChange}
                placeholder="Escribe una tarea..."
            />
            <button onClick={handleClick}>Agregar</button>
            
            {
              todos.map((value, index)=> (
                <Todo 
                  key={index} 
                  todo={value.todo} 
                  index={index} 
                  deletetodo={deletetodo} 
                />
              ))
            }
        </form>
    );
};

export default From
       