const mongoose=require('mongoose')

const mentorSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    student:[
        {
            studentId:{type:mongoose.Schema.Types.ObjectId,
                ref:"Student"
            },
            studentName:{type:String}
        }
    ]
})

const Mentor=mongoose.model("Mentor",mentorSchema)
module.exports=Mentor