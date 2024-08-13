import React from 'react';

import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';



const CreateWorkout = ({formData,setFormData}) => {
    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setFormData({ ...formData, type: e.target.value });
    };
    const handleDateChange = (e) => {
        setFormData({ ...formData, date: e.target.value });
    };
    const handleNumChange = (e) => {
        setFormData({ ...formData, num: e.target.value });

    };
    const goBack = () =>{
        navigate(-1);
    }
 

   
 
    return ( 
        <div className='create'>
            <h2>Add a Workout</h2>  
        
            <label> Workout Type</label>
            <br />
                <select
                    required
                    value= {formData.type}
                    onChange={handleTypeChange}>
                    <option value="Push">Push</option>
                    <option value="Pull">Pull</option>
                    <option value="Legs">Legs</option>
                </select>
            <br />
            <label>Date</label>
            <br />
                    <input 
                type="text"
                required
                value = {formData.date}
                onChange={handleDateChange}/>
                
            <br />
            <label>Number of Excersises</label>
            <br />
                <input 
                type="number"
                required
                value = {formData.num}
                onChange={handleNumChange}/>
            <br />
            <button className='addWorkout'>
                <Link to = '/addEx'  >Add Excersises</Link>
                
            </button>
            
            <br />
            <button className='back' onClick={goBack}>Back</button>   
            
            
            

        </div>
    );
}
 
export default CreateWorkout;