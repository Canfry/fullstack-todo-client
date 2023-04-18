import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
        const token = response.data.token;
        return token;
      }
    } catch (error) {
      console.error(error);
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    login();
    setIsLoading(true);
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    setIsLoading(false);
    navigate('/todos');
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className='bg-zinc-900 text-yellow-50 w-full h-screen'>
      <form onSubmit={onSubmit}>
        <label htmlFor='email'>
          Email
          <input
            type='text'
            placeholder='Enter your email'
            value={email}
            name='email'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='text'
            placeholder='Enter your password'
            value={password}
            name='password'
            onChange={handleChange}
          />
        </label>
        <button className='text-blue-500' type='submit'>
          Signin
        </button>
      </form>
    </div>
  );
}
