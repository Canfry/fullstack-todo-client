import { useState } from 'react';

export default function TodosList({ todo, deleteTodo, updateTodo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    description: todo.description,
    status: todo.status,
  });

  const { description, status } = formData;

  function onChange(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex-1'>
        {isEdit ? (
          <form onSubmit={() => updateTodo(formData)}>
            <input
              onChange={onChange}
              type='text'
              id='description'
              name='description'
              value={description}
              className='w-full bg-yellow-50 py-1 px-2 text-zinc-900 rounded-md'
            />
          </form>
        ) : (
          <p className=''>{todo.description}</p>
        )}
      </div>
      <div>
        {isEdit ? (
          <select
            id='status'
            name='status'
            value={status}
            onChange={onChange}
            className='bg-yellow-50 py-1 px-2 text-zinc-900 rounded-md w-full'
          >
            <option value='New'>New</option>
            <option value='In Progress'>In Progress</option>
            <option value='Completed'>Completed</option>
          </select>
        ) : (
          <p className='text-center'>{todo.status}</p>
        )}
      </div>
      <div className='flex'>
        <button
          onClick={() => setIsEdit((prevState) => !prevState)}
          className='flex px-3 h-full items-center justify-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
            />
          </svg>
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className='flex px-3 h-full items-center justify-center'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
