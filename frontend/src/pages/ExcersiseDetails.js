import { useNavigate,useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ExcersiseDetails = () => {
    const {id } = useParams();
    const navigate = useNavigate();
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext()

    const [workout,setWorkout] = useState();
    useEffect(()=>{
      const fetchWorkouts = async () =>{
        if(!user){  
            return
        }
        const response = await fetch('/nat/workouts/' + id, {
            headers: {
              'Authorization': `Bearer ${user.token}`
          }
          })
        const json = await response.json()


        if(response.ok){
            setWorkout(json);
            //dispatch({type: 'SET_WORKOUTS',payload: json})
        }
      }

    fetchWorkouts()
    },[id,user])
    const handleClick = async () =>{
        const response = await fetch('/nat/workouts/' + workout._id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT',payload: json})
            navigate('/');
        }
    }
    const goBack = () =>{
        navigate(-1);
      }
    
    return ( <div className="Excersises">
        
            
           
            {workout && (
                
                <article>
                    <h2>{workout.date}</h2>
                    <h4> Workout type: {workout.type}</h4>
                    
                 
                    {workout.excersises.map((excersise,index) =>(
                        <div className={'excersise'+(index+1)} key={index}>
                            
                            <p> <strong>{index+1} </strong><br />
                            Excersise: {excersise[0]} <br />
                            Weight (lbs): {excersise[1]} <br />
                            Sets: {excersise[2]} <br />
                            Reps per Set: {excersise[3]}</p>
                            
                        </div>
                    ))}
                        
                    
                    
                    
                    <button onClick={handleClick}>Delete</button>
                </article>
        )}
    <button className='back' onClick={goBack}>Back</button>
    </div>);
}
 
export default ExcersiseDetails;