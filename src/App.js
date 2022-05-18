import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import TodoApp from './components/TodoApp';


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<RequireAuth><TodoApp /></RequireAuth>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>

    </div>
  );
}

export default App;
