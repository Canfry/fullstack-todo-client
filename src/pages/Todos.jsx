import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Todos() {
  const [todos, setTodos] = useState([]);

  const url = `${import.meta.env.VITE_BASE_URL}/api/todos`;

  const token = JSON.parse(localStorage.getItem('token' || ''));

  async function getTodos() {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <>
          <li key={todo._id}>{todo.description}</li>
          <p>{todo.status}</p>
        </>
      ))}
    </div>
  );
}
