import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import TodosList from '../components/TodosList';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    status: '',
  });

  const { description, status } = formData;

  const url = `${import.meta.env.VITE_BASE_URL}/api/todos`;

  const userData = JSON.parse(localStorage.getItem('user'));
  console.log(userData);

  async function getTodos() {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response.data);
      setTodos(response.data);
      setIsLoading(false);

      return todos;
    } catch (error) {
      console.error(error);
    }
  }

  async function createTodo() {
    try {
      const taskData = {
        description,
        status,
        user: userData._id,
      };

      const response = await axios.post(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        data: {
          taskData,
        },
      });
      if (userData._id === todos.user) {
        setTodos([...todos, taskData]);
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTodos();
    setIsLoading(true);
  }, []);

  function formSubmit(e) {
    e.preventDefault();
    createTodo();
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <Header />
      <div className='h-screen w-full bg-zinc-900 text-yellow-50 pt-10'>
        <div className='h-full max-w-[80%] m-auto'>
          <form className='flex items-center gap-8' onSubmit={formSubmit}>
            <input
              type='text'
              placeholder='Type here...'
              className='bg-yellow-50 flex-1 py-2 px-1 rounded-md text-zinc-900'
              name='description'
              value={description}
              onChange={handleChange}
            />
            <select
              name='status'
              value={status}
              id='status'
              className='bg-yellow-50 py-1 px-2 text-zinc-900 rounded-md'
              onChange={handleChange}
            >
              <option value='Status' selected>
                Status
              </option>
              <option value='---' disabled>
                -----
              </option>
              <option value='New'>New</option>
              <option value='In Progress'>In Progress</option>
              <option value='Completed'>Completed</option>
            </select>
            <button type='submit' className='btn btn-active  bg-zinc-800'>
              Add task
            </button>
          </form>
          <hr className=' bg-yellow-50 my-8' />
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            todos.map((todo) => <TodosList key={todo._id} todo={todo} />)
          )}
        </div>
      </div>
    </>
  );
}
