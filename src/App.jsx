import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Todos from './pages/Todos';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/todos' element={<Todos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
