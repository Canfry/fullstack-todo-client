import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Todos from './pages/Todos';
import Home from './pages/Home';

function App() {
  return (
    <div className='w-full h-screen bg-zinc-900'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/todos' element={<Todos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
