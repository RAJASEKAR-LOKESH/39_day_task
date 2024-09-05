const mongoose=require('mongoose')
const { type } = require('os')

const studentSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mentor:{
        ID:{type:mongoose.Schema.Types.ObjectId,
        ref:"Mentor"
        },
        mentorName:{
            type:String
        }
    },
    previousMentor:{type:String}
})

const Student=mongoose.model("Student",studentSchema)
module.exports=Student