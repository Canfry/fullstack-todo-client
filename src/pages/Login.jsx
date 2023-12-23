import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const date = new Date();
  const year = date.getFullYear();

  const { email, password } = formData;

  const userData = {
    email,
    password,
  };

  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_BASE_URL}/api/users/login`;

  const login = async () => {
    try {
      const response = await axios.post(url, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        // const token = response?.data?.token;
        setFormData(userData);
        navigate('/todos');
        // return token;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    login();
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className='bg-zinc-900 text-yellow-50 w-[100vw] h-screen flex flex-col items-center'>
      <div className='navbar bg-zinc-900 text-yellow-50 max-w-[80%] m-auto pt-8'>
        <div className='flex-1 p-0'>
          <Link to='/' className='text-2xl'>
            FRYTASKS
          </Link>
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className='flex-1 grid place-content-center w-[70%] m-auto'
      >
        <div className='text-center w-full mb-16'>
          <h1 className='text-4xl'>Please login</h1>
        </div>
        <div className='flex flex-col gap-4 w-full items-start'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Enter your email'
            value={email}
            name='email'
            onChange={handleChange}
            className='rounded-md py-1 px-4 bg-yellow-50 text-zinc-900 outline-none w-full'
          />
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            placeholder='Enter your password'
            value={password}
            name='password'
            onChange={handleChange}
            className='rounded-md py-1 px-4 bg-yellow-50 text-zinc-900 outline-none w-full'
          />
        </div>

        <button
          className='border border-yellow-50 rounded-md py-2 px-4 my-8 hover:border-zinc-900 hover:bg-yellow-50 hover:text-zinc-900'
          type='submit'
        >
          Signin
        </button>
        <p className='text-yellow-50/70'>
          Don't have an account yet?{' '}
          <Link to='/register' className='font-bold text-yellow-50'>
            Register
          </Link>
        </p>
      </form>
      <footer className='my-4 text-yellow-50/80'>
        Copyright AnfryDev &copy; {year}
      </footer>
    </div>
  );
}
