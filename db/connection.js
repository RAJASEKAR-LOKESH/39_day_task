const mongoose=require('mongoose')

const connection=async()=>{
    await mongoose.connect('mongodb://localhost:27017/Mentor')
    console.log("DB Connected")
}

module.exports=connection