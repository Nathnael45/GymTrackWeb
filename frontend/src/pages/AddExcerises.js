import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const AddExercises = ({formData}) => {
    //Dyamically increase num of excersises using prop from create
    const num = formData.num;
    const type = formData.type;
    const date = formData.date;
    const {user} = useAuthContext()

    //empty Array method
    const emptyArray = (num) =>{
        let x = num;
        var list = []
        while(x > 0){
            list.push("hello");
            x--;
        }
        return list;
    }
    //setting up constants
    const {dispatch} = useWorkoutsContext()
    const [name,setName] = useState(emptyArray(num));
    const [weight,setWeight] = useState(emptyArray(num));
    const [sets,setSets] = useState(emptyArray(num));
    const [reps,setReps] = useState(emptyArray(num));
    const [excersises,setExcersises] = useState(emptyArray(num));

    const [error,setError] = useState(null)
    
    const navigate = useNavigate();
    //methods to Update Excersises correctly 
    const updateName = (index, newName) => {

        let copy = name;
        for(let i = 0; i < copy.length; i++){
            if(i === index){
                copy[i] = newName;
            }
        }
        setName(copy);
      };
    const updateSets = (index, newSet) => {
        let copy = sets;
        for(let i = 0; i < sets.length; i++){
            if(i === index){
                copy[i] = '';
                copy[i] = newSet;
            }
        }
        setSets(copy);
      };
    const updateReps = (index, newReps) => {
        let copy = reps;
        for(let i = 0; i < reps.length; i++){
            if(i === index){
                copy[i] = newReps;
            }
            }
            setReps(copy);
        };
    const updateWeight = (index, newWeight) => {
            let copy = weight;
            for(let i = 0; i < weight.length; i++){
                if(i === index){
                    copy[i] = newWeight;
                }
            }
            setWeight(copy);
        };
    
    const updateExcersises = () => {
        let copy = excersises;
        for(let i = 0; i < copy.length; i++){
            copy[i] = [name[i],weight[i],sets[i],reps[i]];
        }
        setExcersises(copy);

   };

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        updateExcersises()
        const workout = {type,num,date,excersises}
        if(!user){
            setError('You must be logged in')
            return 
        }

        const response = await fetch('/nat/workouts/',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type' : 'application/json'
                
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        } 
        if(response.ok){
           
            console.log('new workout added',json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
            navigate('/')
        }
    }   
    const goBack = () =>{
        navigate(-1);
      }
    return ( 
        
        <div className='addEx'>
            <form onSubmit={handleSubmit}>
            <h2>Add your Excersises</h2>  
            {Array.from({ length: num }, (_, index) => (
                <div key={index} className='excersise'>
                    <h4>Excersise {index +1}</h4>  

                    <label > Excersise Name</label>
                        <input type="text" 
                        required 
                        value = {name[index] && console.log('')}
                        onChange={(e) => updateName(index,e.target.value)} />
                        <br />

                    <label>Weight (lb)</label>
                        <input type="number" 
                        required 
                        value={ weight[index]&& console.log('')}
                        onChange={(e) => updateWeight(index,e.target.value)}/>
                        <br />

                    <label>Sets</label>
                        <input type="number" 
                        required value={ sets[index]&& console.log('')}
                        onChange={(e) => updateSets(index,e.target.value)}
                        />
                        <br />

                    <label>Reps per Set</label>
                        <input type="number" 
                        required value={ reps[index]&& console.log('')}
                        onChange={(e) => updateReps(index,e.target.value)}
                        />
                    
                </div>
        ))}
            <button >Add Workout</button>
        </form>
         <br />
        <button className='back' onClick={goBack}>Back</button>
        {error && <div className="error">{error}</div>}
        </div>
        
   
     );
}
 
export default AddExercises;