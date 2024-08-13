const { default: mongoose } = require('mongoose');
const Workout = require('../models/workoutsModel')

//  get all workouts 
const getWorkouts = async(req,res)=>{
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt: -1});

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout = await Workout.findById(id)
    
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    } 

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async(req,res)=>{
    const {type,num,date,excersises} = req.body

    let emptyFields = []

    if(!type){
        emptyFields.push('title')
    }
    if(!num){
        emptyFields.push('load')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(!excersises){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }
    // add doc to db
    try{
        const user_id = req.user._id
        const workout = await Workout.create({type,num,date,excersises,user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.mssg})
    }
   
}

// delete a workout
const deleteWorkout = async(req,res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    } 

    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async(req,res) =>{
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
         ...req.body
    })

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    } 

    res.status(200).json(workout)

}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}