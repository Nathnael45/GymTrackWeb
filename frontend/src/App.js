import Home from './pages/Home';
import CreateWorkout from './pages/CreateWorkout';
import AddExcerises from './pages/AddExcerises';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import ExcersiseDetails from './pages/ExcersiseDetails';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { useAuthContext } from "./hooks/useAuthContext";
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  const [formData, setFormData] = useState({ type :'Push', num: 1, date: '7/30/2024'});
  const {user} = useAuthContext()

  return (
    <Router>
    <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route 
            path = '/'
            element = {user ? <Home/> : <Navigate to="/login"/>}>
          </Route>
          
          <Route 
            path = '/createWorkout' 
            element = {user ?  <CreateWorkout formData={formData} setFormData={setFormData}/> : <Navigate to="/login"/>}>
          </Route>

          <Route 
            path = "/workouts/:id"  
            element={user ? <ExcersiseDetails/> : <Navigate to="/login"/>}>
          </Route>

          <Route 
            path = "/addEx" 
            element= {user ? <AddExcerises formData={formData} /> : <Navigate to="/login"/>}>
          </Route>

          <Route 
              path = '/login' 
              element = { !user ? <Login/> : <Navigate to="/"/>}>
          </Route>

          <Route 
              path = '/signup' 
              element = { !user ? <Signup/> : <Navigate to="/"/> }>
          </Route>
          
        </Routes>

      </div>
      </Router>
      

  );
}

export default App;
