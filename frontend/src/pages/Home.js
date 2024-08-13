import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const {workouts,dispatch} = useWorkoutsContext();
  const {user} = useAuthContext()

    useEffect(()=>{
      const fetchWorkouts = async () =>{
        const response = await fetch('/nat/workouts',{
          headers: {
            'Authorization': `Bearer ${user.token}`
        }
        })
        const json = await response.json()


        if(response.ok){
            //setWorkouts(json)
            dispatch({type: 'SET_WORKOUTS',payload: json})
        }
      }

      if(user){
        fetchWorkouts()
    }
    },[dispatch,user])
    return (
        <div className = 'home'>
            <title>
              Gym Tracker Site
            </title>
            
                <button>
                    <Link to="/createWorkout" className='link'><strong>Add a Workout</strong></Link>
                </button>
            
            
            <div>
              <h2> Previous Workouts</h2>
                {workouts && workouts.map((workout,index)=> (
                  <div className="workout-preview" key={index}>
                    <Link to = {`/workouts/${workout._id}`}>
                      
                      <p className='label'><strong>{workout.date}</strong> <br /> <span> {workout.type}</span>                 </p>
                            
                      
                    </Link>
                  </div> 
                ))}
            </div>
            
            
           
        </div>
    );
}
 
export default Home;