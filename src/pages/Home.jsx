import { Link } from 'react-router-dom';

export default function Home() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className='bg-zinc-900 text-yellow-50 w-[100vw] h-screen flex flex-col items-center'>
      <main className='flex-1 grid place-content-center'>
        <h1 className='text-5xl mb-4'>
          Welcome to <span className='font-bold'>FryTasks</span>
        </h1>
        <p className='text-xl text-yellow-50/80'>
          Discover a nice and easy way to manage your tasks, so you don't forgot
          anything!
        </p>
        <div className='flex items-center gap-4'>
          {/* <button className='btn glass w-[20%] mt-4'>Login</button> */}
          <Link to='/login'>
            <button
              className='border border-yellow-50 rounded-md py-2 px-8 my-8 hover:border-zinc-900 hover:bg-yellow-50 hover:text-zinc-900'
              type='submit'
            >
              Signin
            </button>
          </Link>
          <button
            className='border border-yellow-50 rounded-md py-2 px-8 my-8 hover:border-zinc-900 hover:bg-yellow-50 hover:text-zinc-900'
            type='submit'
          >
            Register
          </button>
        </div>
      </main>
      <footer className='my-4 text-yellow-50/40'>
        Copyright AnfryDev &copy; {year}
      </footer>
    </div>
  );
}
