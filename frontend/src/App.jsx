import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import "./App.css";
import LoginSignup from "./pages/LoginSignup";
import TodoList from "./pages/TodoList";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup/>}></Route>
        <Route path="/todolist" element={<ProtectedRoute><TodoList/></ProtectedRoute>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
