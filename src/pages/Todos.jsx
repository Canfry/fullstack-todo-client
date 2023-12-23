import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import TodosList from '../components/TodosList';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [formData, setFormData] = useState({
    description: '',
    status: '',
  });

  const { description, status } = formData;

  const url = `${import.meta.env.VITE_BASE_URL}/api/todos`;

  const userData = JSON.parse(localStorage.getItem('user'));

  // Add useCallback here
  async function getTodos() {
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      setIsError(error);
    }
    setIsLoading(false);
  }

  async function createTodo() {
    const newTodo = {
      description,
      status,
    };
    try {
      if (userData.token) {
        const response = await axios.post(url, newTodo, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });

        if (response.data) {
          setTodos([...todos, newTodo]);
          setFormData({
            description: '',
            status: '',
          });
          getTodos();
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateTodo(todoId, data) {
    setIsLoading(true);
    try {
      const response = await axios.put(`${url}/${todoId}`, data, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        method: 'PUT',
      });
      if (response.data) {
        setTodos((prevState) =>
          prevState.map((t) => {
            if (t._id === todoId) {
              return data;
            }
            return t;
          })
        );
      }
    } catch (error) {
      setIsError(error);
    }
    setIsLoading(false);
  }

  async function deleteTodo(todoId) {
    try {
      const response = await axios.delete(`${url}/${todoId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      if (response.data) {
        setTodos((prevState) => prevState.filter((t) => t._id !== todoId));

        getTodos();
      }
    } catch (error) {
      setIsError(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []);

  function formSubmit(e) {
    e.preventDefault();
    createTodo();
    // getTodos();
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Something went wrong...</h1>;

  return (
    <>
      <Header />
      <div className='h-screen w-full bg-zinc-900 text-yellow-50 pt-10'>
        <div className='h-full max-w-[80%] lg:max-w-[60%] m-auto'>
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
              <option value='Status'>Status</option>
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
            todos.map((todo) => (
              <TodosList
                key={todo._id}
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
