import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Register from './Register/register';
import Login from './Login/login';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
