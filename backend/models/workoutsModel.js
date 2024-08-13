const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    type:{
        type:String,
        required: true,
    },
    date:{
        type: String,
        required:true ,
    },
    num:{
        type: Number,
        required: true
    },
    excersises: {
        type: Array,
        required:true
    },
    user_id:{
        type:String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Workout',workoutSchema)

